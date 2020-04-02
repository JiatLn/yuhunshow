import heroTree from '@/data/hero';
import yuhunMap from '@/data/yuhunMap';

let typeList = ['暴击加成', '攻击加成', '首领御魂', '效果命中', '效果抵抗', '生命加成', '防御加成'];

let yuhunTree = [
  {
    text: '暴击',
    children: [
      { text: '请选择', id: 0 },
      { text: '破势', id: 1 },
      { text: '针女' },
      { text: '网切' },
      { text: '三味' },
      { text: '伤魂鸟' },
      { text: '镇墓兽' },
      { text: '青女房' },
    ],
  },
  {
    text: '攻击加成',
    children: [
      { text: '心眼' },
      { text: '狰' },
      { text: '轮入道' },
      { text: '狂骨' },
      { text: '鸣屋' },
      { text: '蝠翼' },
      { text: '阴摩罗' },
      { text: '兵主部' },
    ],
  },
  {
    text: '首领御魂',
    children: [
      { text: '荒骷髅' },
      { text: '蜃气楼' },
      { text: '土蜘蛛' },
      { text: '地震鲶' },
      { text: '胧车' },
      { text: '鬼灵歌伎' },
    ],
  },
  {
    text: '效果命中',
    children: [{ text: '火灵' }, { text: '蚌精' }, { text: '飞缘魔' }],
  },
  {
    text: '效果抵抗',
    children: [{ text: '返魂香' }, { text: '魍魉之匣' }, { text: '幽谷响' }, { text: '骰子鬼' }],
  },
  {
    text: '生命加成',
    children: [
      { text: '地藏像' },
      { text: '薙魂' },
      { text: '钟灵' },
      { text: '镜姬' },
      { text: '树妖' },
      { text: '被服' },
      { text: '涅槃之火' },
      { text: '涂佛' },
    ],
  },
  {
    text: '防御加成',
    children: [
      { text: '招财猫' },
      { text: '木魅' },
      { text: '珍珠' },
      { text: '魅妖' },
      { text: '雪幽魂' },
      { text: '反枕' },
      { text: '日女巳时' },
    ],
  },
];

let mainAttrsList = [
  {
    text: '二号位',
    id: 2,
    children: [
      {
        text: '攻击加成',
        id: 21,
      },
      {
        text: '生命加成',
        id: 22,
      },
      {
        text: '防御加成',
        id: 23,
      },
      {
        text: '速度',
        id: 24,
      },
    ],
  },
  {
    text: '四号位',
    id: 4,
    children: [
      {
        text: '攻击加成',
        id: 41,
      },
      {
        text: '生命加成',
        id: 42,
      },
      {
        text: '防御加成',
        id: 43,
      },
      {
        text: '效果命中',
        id: 44,
      },
      {
        text: '效果抵抗',
        id: 45,
      },
    ],
  },
  {
    text: '六号位',
    id: 6,
    children: [
      {
        text: '攻击加成',
        id: 61,
      },
      {
        text: '生命加成',
        id: 62,
      },
      {
        text: '防御加成',
        id: 63,
      },
      {
        text: '暴击',
        id: 64,
      },
      {
        text: '暴击伤害',
        id: 65,
      },
    ],
  },
];

let targetList = [
  {
    name: '输出伤害',
    id: 1,
    desc: '输出伤害 = 攻击 × 暴击伤害',
  },
  {
    name: '双重暴击',
    id: 2,
    desc: '双重暴击 = 攻击 × 暴击伤害 × 暴击伤害',
  },
  {
    name: '生命治疗',
    id: 3,
    desc: '生命治疗 = 生命 × 暴击伤害',
  },
  {
    name: '命抗双修',
    id: 4,
    desc: '命抗双修 = 效果命中 + 效果抵抗',
  },
  {
    name: '攻击',
    id: 5,
    desc: '-',
  },
  {
    name: '生命',
    id: 6,
    desc: '-',
  },
  {
    name: '暴击',
    id: 7,
    desc: '-',
  },
  {
    name: '暴击伤害',
    id: 8,
    desc: '-',
  },
];

let childrenOf4 = [];
yuhunMap.map(item => {
  childrenOf4.push({
    text: item.name,
    id: item.id,
  });
});
let mataList = [
  {
    text: '四件套',
    id: 4,
    children: childrenOf4,
  },
  {
    text: '二件套',
    id: 2,
    children: [
      {
        text: '攻击加成',
        id: 41,
      },
      {
        text: '生命加成',
        id: 42,
      },
      {
        text: '防御加成',
        id: 43,
      },
      {
        text: '效果命中',
        id: 44,
      },
      {
        text: '效果抵抗',
        id: 45,
      },
    ],
  },
];

let mapAttrs = {
  21: '攻击加成',
  22: '生命加成',
  23: '防御加成',
  24: '速度',
  41: '攻击加成',
  42: '生命加成',
  43: '防御加成',
  44: '效果命中',
  45: '效果抵抗',
  61: '攻击加成',
  62: '生命加成',
  63: '防御加成',
  64: '暴击',
  65: '暴击伤害',
};

let shishenTree = [];
for (let o in heroTree) {
  shishenTree.push({ text: o, children: heroTree[o] });
}

export { mainAttrsList, mapAttrs, yuhunTree, shishenTree, mataList, typeList, targetList };
