import { MITAMA_ENHANCE, MITAMA_TYPES, MITAMA_PROPS, MITAMA_PROPS_EFFECT } from '@/data/dataFormat';
import Permutation from '@/utils/permutation';
// import cartesian from '@/utils/math';
import { product } from 'cartesian-product-generator';
import chain from '@iterables/chain';
import _ from 'lodash';

class MitamaComb {
  constructor(calcObj) {
    // let calcObj = {
    //   yuhunList: [],
    //   式神: '',
    //   套装: {}, // {2: '', 4: ''} or {1: '', 2: '', 3: ''}
    //   mode: '4+2',
    //   主属性: {
    //     2: [],
    //     4: [],
    //     6: [],
    //   },
    //   属性限制: {
    //     速度: {
    //       min: 128,
    //       max: Infinity,
    //     },
    //   },
    //   目标: '',
    //   mode: '4+2', // 套装模式
    // };
    console.log('计算对象 :', calcObj);
    this.yuhunList = this.init(calcObj.yuhunList);
    this.target = calcObj.目标;
    this.l2PropLimit = calcObj.主属性[2];
    this.l4PropLimit = calcObj.主属性[4];
    this.l6PropLimit = calcObj.主属性[6];
    this.套装 = calcObj.套装;
    this.属性限制 = calcObj.属性限制;
    this.mode = calcObj.mode;
    this.totalComb = 0;
    this.baseAttack = calcObj.基础面板.攻击;
    this.baseHp = calcObj.基础面板.生命;
    this.baseDef = calcObj.基础面板.防御;
    this.baseSpeed = calcObj.基础面板.速度;
    this.baseCritRate = calcObj.基础面板.暴击;
    this.baseCritPower = calcObj.基础面板.暴击伤害;
    this.baseDebuffEnhance = calcObj.基础面板.效果命中;
    this.baseDebuffResist = calcObj.基础面板.效果抵抗;
    // 并集
    this.effectProps = _.union(MITAMA_PROPS_EFFECT[calcObj.目标], Object.keys(calcObj.属性限制));
  }

  init(yhList) {
    let yuhunList = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    for (const yuhun of yhList) {
      yuhunList[yuhun.pos].push(yuhun);
    }
    return yuhunList;
  }

  sayHello() {
    console.log('hello');
  }

  filterLocProp(data_list, prop_limit) {
    return data_list.filter(item => {
      return prop_limit.includes(item.mainAttr);
    });
  }

  filterLocAndType() {
    console.log(
      '过滤前组合数:',
      _.reduce(
        _.map(this.yuhunList, item => item.length),
        (a, b) => a * b,
        1,
      ),
    );
    // 过滤246主属性
    if (this.l2PropLimit.length) {
      this.yuhunList[2] = this.filterLocProp(this.yuhunList[2], this.l2PropLimit);
    }
    if (this.l4PropLimit.length) {
      this.yuhunList[4] = this.filterLocProp(this.yuhunList[4], this.l4PropLimit);
    }
    if (this.l6PropLimit.length) {
      this.yuhunList[6] = this.filterLocProp(this.yuhunList[6], this.l6PropLimit);
    }
    // 过滤不包含有效属性的御魂
    for (let i = 0; i < 6; i++) {
      this.yuhunList[i + 1] = this.yuhunList[i + 1].filter(item => {
        // 交集
        let intersection = _.intersection(Object.keys(item.attrs), this.effectProps);
        return intersection.length > 0;
      });
    }
    console.log(
      '过滤后剩余组合数:',
      _.reduce(
        _.map(this.yuhunList, item => item.length),
        (a, b) => a * b,
        1,
      ),
    );
    // 组合个数
  }

  // 寻找候选御魂
  findMtypeCandidates(mitamaType = '_') {
    let candidates = [];
    if (mitamaType == '_' || mitamaType == 0) {
      candidates = MITAMA_TYPES;
    } else if (MITAMA_TYPES.includes(mitamaType)) {
      candidates.push(mitamaType);
    } else if ([...MITAMA_PROPS, '首领御魂'].includes(mitamaType)) {
      for (const mitama of MITAMA_TYPES) {
        if (MITAMA_ENHANCE[mitama]['加成类型'] == mitamaType) {
          candidates.push(mitama);
        }
      }
    }
    return candidates;
  }

  // 获取御魂组合
  *getMitamaCombos() {
    let tzkey = Object.keys(this.套装);
    let mainCandidates = [];
    let secondCandidates = [];
    if (tzkey.length == 2) {
      // 先考虑 4 + 2 的情况
      mainCandidates = this.findMtypeCandidates(this.套装[4]);
      secondCandidates = this.findMtypeCandidates(this.套装[2]);
      for (const four of mainCandidates) {
        for (const two of secondCandidates) {
          yield [four, four, four, four, two, two];
        }
      }
    }
  }

  // 生成御魂排列
  *genMitamaPermutations() {
    let comboList = this.getMitamaCombos();
    for (let cb of comboList) {
      let p = new Permutation(cb);
      yield _.uniqWith(p.result, _.isEqual);
    }
  }

  makeCombination() {
    let pers = this.genMitamaPermutations();
    let cartList = [];
    for (const per of pers) {
      for (const p of per) {
        let foo = [[], [], [], [], [], []];
        for (let i = 0; i < 6; i++) {
          let posIList = this.yuhunList[i + 1];
          for (const item of posIList) {
            if (item.name == p[i]) {
              foo[i].push(item);
            }
          }
        }
        // 组合个数
        this.totalComb += _.reduce(
          _.map(foo, item => item.length),
          (a, b) => a * b,
          1,
        );
        cartList.push(product(...foo));
      }
    }
    console.log('totalComb :', this.totalComb);
    return chain(...cartList);
  }

  testOutput() {
    // 按御魂限制条件筛选剪枝
    this.filterLocAndType();
    // 生成全组合
    let mitamaCombList = this.makeCombination();
    // 按组合属性上下限过滤
    mitamaCombList = this.filterMitama(mitamaCombList);
    // 按输出伤害过滤

    // let maxDamage = 0;
    for (const cb of mitamaCombList) {
      console.log('cb :', cb);
      break;
    }
    console.log('over');
  }

  // 六个位置及套装属性求和
  sumProp(mitamaComb, mitamaTypeCount) {
    let mitamaPane = _.zipObject(this.effectProps, _.fill(Array(this.effectProps.length), 0));
    for (const mitama of mitamaComb) {
      // 遍历六个位置的御魂
      for (const attr in mitama.attrs) {
        if (this.effectProps.includes(attr)) {
          mitamaPane[attr] += mitama.attrs[attr];
        }
      }
    }
    // 算上御魂效果的加成 有效属性
    for (let mitamaType in mitamaTypeCount) {
      if (mitamaTypeCount[mitamaType] < 2) continue;
      let p_type = MITAMA_ENHANCE[mitamaType]['加成类型'];
      if (this.effectProps.includes(p_type)) {
        mitamaPane[p_type] += MITAMA_ENHANCE[mitamaType]['加成数值'];
      }
    }
    return mitamaPane;
  }

  // 计算输出伤害
  calcTotalDamage(mitamaComb) {
    let mitamaPane = mitamaComb.summary;
    let baseAttack = this.baseAttack;
    let baseCritPower = this.baseCritPower;
    let attackBuff = mitamaPane['攻击加成'] == undefined ? 0 : mitamaPane['攻击加成'];
    let mAttack = mitamaPane['攻击'] == undefined ? 0 : mitamaPane['攻击'];
    let critPowerBuff = mitamaPane['暴击伤害'] == undefined ? 0 : mitamaPane['暴击伤害'];
    // 总输出 = ((式神基础攻击 * (1 + 攻击加成)) + 小攻击)  * (基础暴伤 + 御魂暴伤)
    let totalDamage = (baseAttack * (1 + attackBuff) + mAttack) * (baseCritPower + critPowerBuff);
    return totalDamage;
  }

  *fitMitamaType(mitamaCombList) {
    for (const mitamaComb of mitamaCombList) {
      let mitamaTypeCount = {};
      for (const mitama of mitamaComb) {
        let mitamaType = mitama.name;
        if (mitamaTypeCount[mitamaType] == undefined) {
          mitamaTypeCount[mitamaType] = 1;
        } else {
          mitamaTypeCount[mitamaType] += 1;
        }
      }
      let combData = {
        summary: { 御魂计数: mitamaTypeCount },
        info: mitamaComb,
      };
      yield combData;
    }
  }

  *fitPropValue(mitamaSumData, propType, minValue, maxValue) {
    for (const mitamaData of mitamaSumData) {
      let mitamaTypeCount = mitamaData.summary.御魂计数;
      let mitamaComb = mitamaData.info;
      let propValue = 0;
      for (let mitama of mitamaComb) {
        propValue += mitama.attrs[propType] || 0;
      }
      // 算上御魂效果的加成
      for (let mitamaType in mitamaTypeCount) {
        if (mitamaTypeCount[mitamaType] < 2) continue;
        let p_type = MITAMA_ENHANCE[mitamaType]['加成类型'];
        if (p_type == propType) {
          let multiTimes = mitamaTypeCount[mitamaType] == 6 ? 2 : 1;
          propValue += multiTimes * MITAMA_ENHANCE[mitamaType]['加成数值'];
        }
      }

      if (propValue >= minValue && propValue <= maxValue) {
        yield mitamaData;
      }
    }
  }

  filterMitama(mitamaCombList) {
    let mitamaSumData = this.fitMitamaType(mitamaCombList);
    for (const limit in this.属性限制) {
      console.log('limit :', limit, this.属性限制[limit]['min'], this.属性限制[limit]['max']);
      mitamaSumData = this.fitPropValue(
        mitamaSumData,
        limit,
        this.属性限制[limit]['min'],
        this.属性限制[limit]['max'],
      );
    }
    let combDataList = this.calMitamaCombProp(mitamaSumData);
    return combDataList;
  }

  *calMitamaCombProp(mitamaSumData) {
    for (const mitamaData of mitamaSumData) {
      let mitamaTypeCount = mitamaData.summary.御魂计数;
      let mitamaComb = mitamaData.info;
      let combSummary = this.sumProp(mitamaComb, mitamaTypeCount);
      let combData = { summary: combSummary, info: mitamaComb };
      yield combData;
    }
  }

  *fitDamageLimit(mitamaCombList) {
    let damageLimit = [0, Infinity];
    for (const mitamaComb of mitamaCombList) {
      let totalDamage = this.calcTotalDamage(mitamaComb);
      if (totalDamage >= damageLimit[0] && totalDamage <= damageLimit[1]) {
        yield mitamaComb;
      }
    }
  }
}

export default MitamaComb;
