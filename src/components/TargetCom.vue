<template>
  <div id="target">
    <van-radio-group v-model="targetRadio">
      <van-cell-group v-for="(item, index) in radioList" :key="index">
        <van-cell :title="item.name" clickable @click="getTarget(index)">
          <template #right-icon>
            <van-radio :name="item.id" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <p style="text-align: center">{{ radioList[targetRadio - 1].desc }}</p>
    <div class="calc">
      <van-button type="primary" @click="calc" size="small">开始计算</van-button>
    </div>
  </div>
</template>

<script>
// import MitamaComb from '@/utils/calc';

let radioList = [
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
];

export default {
  data() {
    return {
      radioList,
      targetRadio: 1,
      target: '输出伤害',
    };
  },

  methods: {
    getTarget(index) {
      this.targetRadio = this.radioList[index].id;
      this.target = this.radioList[index].name;
    },
    calc() {
      this.$emit('updateCalcObj', '目标', this.target);
    },
  },
};
</script>

<style lang="less" scoped>
.calc {
  display: flex;
  justify-content: center;
}
</style>
