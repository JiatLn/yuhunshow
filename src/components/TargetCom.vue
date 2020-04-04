<template>
  <div id="target">
    <van-radio-group v-model="targetRadio" @change="onChange">
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
      <van-button @click="calc" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)">
        开始计算
      </van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import MitamaComb from '@/utils/calc';
import { targetList } from '@/data/dataFormat';

export default {
  props: ['obj'],

  data() {
    return {
      radioList: targetList,
      targetRadio: 1,
      target: '输出伤害',
    };
  },
  computed: {
    ...mapState(['yuhunList']),
  },
  methods: {
    getTarget(index) {
      this.targetRadio = this.radioList[index].id;
      this.target = this.radioList[index].name;
    },
    onChange() {
      this.$emit('updateCalcObj', '目标', this.target);
    },
    calc() {
      this.$emit('updateCalcObj', 'yuhunList', this.yuhunList);
      let calc = new MitamaComb(this.obj);
      console.log(calc);
      calc.sayHello();
      calc.testOutput();
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
