let ff = (val, key, num = 2, symbol = '%') => {
  let popsList1 = ['暴击', '攻击加成', '暴击伤害', '生命加成', '防御加成', '效果命中', '效果抵抗'];
  let popsList2 = ['攻击', '防御', '速度', '生命'];
  if (popsList1.includes(key)) {
    return `${(val * 100).toFixed(num)}${symbol}`;
  } else if (popsList2.includes(key)) {
    return `${val.toFixed(num)}`;
  } else {
    return val;
  }
};

export { ff };
