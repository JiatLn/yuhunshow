let ff = (val, key, num = 2) => {
  let popsList1 = ['暴击', '攻击加成', '暴击伤害', '生命加成', '防御加成', '效果命中', '效果抵抗'];
  let popsList2 = ['攻击', '防御', '速度', '生命'];
  if (popsList1.includes(key)) {
    return `${(val * 100).toFixed(num)}%`;
  } else if (popsList2.includes(key)) {
    return `${val.toFixed(num)}`;
  } else {
    return val;
  }
};

let paneFilter = (val, key) => {
  if (['暴击', '暴击伤害', '效果命中', '效果抵抗'].includes(key)) {
    return `${val * 100}%`;
  } else if (val == 0 || key == '速度') {
    return val;
  } else {
    return `${val.toFixed(2)}`;
  }
};

export { ff, paneFilter };
