class MitamaComb {
  constructor(calcObj) {
    // calcObj: {
    //   yuhunList: [],
    //   式神: '',
    //   套装: {}, // {2: '', 4: ''} or {1: '', 2: '', 3: ''}
    //   主属性: {
    //     2: [],
    //     4: [],
    //     6: [],
    //   },
    //   限制属性: [],
    //   目标: '',
    // },
    console.log('calcObj :', calcObj);
    this.yuhunList = this.init(calcObj.yuhunList);
    this.target = calcObj.目标;
    this.l2PropLimit = calcObj.主属性[2];
    this.l4PropLimit = calcObj.主属性[4];
    this.l6PropLimit = calcObj.主属性[6];
    this.套装 = calcObj.套装;
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
  // 过滤246主属性
  filterLocProp(data_list, prop_limit) {
    return data_list.filter(item => {
      return prop_limit.includes(item.mainAttr);
    });
  }
  filterLocAndType() {
    console.log(
      '过滤前组合数:',
      this.yuhunList[1].length *
        this.yuhunList[2].length *
        this.yuhunList[3].length *
        this.yuhunList[4].length *
        this.yuhunList[5].length *
        this.yuhunList[6].length,
    );
    if (this.l2PropLimit.length) {
      this.yuhunList[2] = this.filterLocProp(this.yuhunList[2], this.l2PropLimit);
    }
    if (this.l4PropLimit.length) {
      this.yuhunList[4] = this.filterLocProp(this.yuhunList[4], this.l4PropLimit);
    }
    if (this.l6PropLimit.length) {
      this.yuhunList[6] = this.filterLocProp(this.yuhunList[6], this.l6PropLimit);
    }
    console.log(
      '过滤后剩余组合数:',
      this.yuhunList[1].length *
        this.yuhunList[2].length *
        this.yuhunList[3].length *
        this.yuhunList[4].length *
        this.yuhunList[5].length *
        this.yuhunList[6].length,
    );
  }
  getMitamaCombos() {
    // 组合列表
    let combos = [];
    let fixedPos = 0;
    let tzkey = Object.keys(this.套装);
    if (tzkey.length == 2) {
      // 先考虑 4 + 2 的情况

      // 四件套, 这里限制四件套不能为空且只能为具体的御魂 不能为XX加成/效果命中/效果抵抗/首领御魂
      fixedPos += 4;
      combos = combos.concat(Array(4).fill(this.套装[4]));
      // 二件套
      // 先判断二件套是否为空, 这里有三种情况
      // 1. 二件套为 具体御魂, 如 破势
      // 2. 二件套为 加成类, 如 暴击加成二件套
      // 3. 二件套为 空, 任意御魂都行 '_' 也考虑4+1+1的情况
      if (this.套装[2] != 0) {
        // 二件套确定
        fixedPos += 2;
        combos = combos.concat([this.套装[2], this.套装[2]]);
      } else {
        // 二件套为空
        fixedPos += 2;
        combos = combos.concat(['_', '_']);
      }
    }

    if (fixedPos === 6) {
      return combos;
    } else {
      return Array(6).fill('_');
    }
  }
}

export default MitamaComb;
