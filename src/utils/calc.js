import { MITAMA_ENHANCE, MITAMA_TYPES, MITAMA_PROPS, MITAMA_PROPS_EFFECT } from '@/data/dataFormat';
import Permutation from '@/utils/permutation';
// import cartesian from '@/utils/math';
import { product } from 'cartesian-product-generator';
import chain from '@iterables/chain';
import _ from 'lodash';

class MitamaComb {
  constructor(calcObj) {
    // calcObj: {
    //   yuhunList: [],
    //   式神: '',
    //   套装: {}, // {2: '', 4: ''} or {1: '', 2: '', 3: ''}
    //   mode: '4+2',
    //   主属性: {
    //     2: [],
    //     4: [],
    //     6: [],
    //   },
    //   限制属性: {},
    //   目标: '',
    //   mode: '', 套装模式 如 4+2
    // },
    console.log('计算对象 :', calcObj);
    this.yuhunList = this.init(calcObj.yuhunList);
    this.target = calcObj.目标;
    this.l2PropLimit = calcObj.主属性[2];
    this.l4PropLimit = calcObj.主属性[4];
    this.l6PropLimit = calcObj.主属性[6];
    this.套装 = calcObj.套装;
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
    this.effectProps = _.union(MITAMA_PROPS_EFFECT[calcObj.目标], Object.keys(calcObj.限制属性));
  }
  init(yhList) {
    let yuhunList = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
    yhList.map(data => {
      yuhunList[data.pos].push(data);
    });
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
    this.filterLocAndType();
    let comboList = this.makeCombination();
    let maxDamage = 0;
    for (const cb of comboList) {
      let mitamaPane = this.sumProp(cb);
      let damage = this.calTotalDamage(mitamaPane);
      maxDamage = Math.max(damage, maxDamage);
      console.log('maxDamage :', maxDamage);
      break;
    }
  }
  // 六个位置及套装属性求和
  sumProp(mitamaComb) {
    let mitamaPane = _.zipObject(this.effectProps, _.fill(Array(this.effectProps.length), 0));
    // console.log('taoz :', taoz);
    mitamaComb.map(mitama => {
      // 遍历六个位置的御魂
      for (const attr in mitama.attrs) {
        if (this.effectProps.includes(attr)) {
          mitamaPane[attr] += mitama.attrs[attr];
        }
      }
    });
    return mitamaPane;
  }
  // 计算输出伤害
  calTotalDamage(mitamaPane) {
    let baseAttack = this.baseAttack;
    let baseCritPower = this.baseCritPower;
    let attackBuff = mitamaPane['攻击加成'] === undefined ? 0 : mitamaPane['攻击加成'];
    let mAttack = mitamaPane['攻击'] === undefined ? 0 : mitamaPane['攻击'];
    let critPowerBuff = mitamaPane['暴击伤害'] === undefined ? 0 : mitamaPane['暴击伤害'];
    // 总输出 = ((式神基础攻击 * (1 + 攻击加成)) + 小攻击)  * (基础暴伤 + 御魂暴伤)
    let totalDamage = (baseAttack * (1 + attackBuff) + mAttack) * (baseCritPower + critPowerBuff);
    return totalDamage;
  }
}

export default MitamaComb;
