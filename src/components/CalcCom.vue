<template>
  <div id="calc">
    <van-steps :active="curStep">
      <van-step>目标式神</van-step>
      <van-step>套装组合</van-step>
      <van-step>属性限制</van-step>
      <van-step>计算指标</van-step>
      <van-step>开始计算</van-step>
    </van-steps>
    <div class="calc-content">
      <pick-com v-show="curStep === 0" @updateCalcObj="updateCalcObj"></pick-com>
      <choose-com-new v-show="curStep === 1" @updateCalcObj="updateCalcObj"></choose-com-new>
      <!-- <choose-com v-show="curStep === 1" @updateCalcObj="updateCalcObj"></choose-com> -->
      <select-tree v-show="curStep === 1" @updateCalcObj="updateCalcObj"></select-tree>
      <limit-com v-show="curStep === 2" @updateCalcObj="updateCalcObj"></limit-com>
      <target-com v-show="curStep === 3" @updateCalcObj="updateCalcObj"></target-com>
      <result-com v-show="curStep === 4" @updateCalcObj="updateCalcObj" :obj="calcObj"></result-com>
    </div>
    <div class="btn-group">
      <van-button @click="lastStep" size="small" hairline color="#7232dd" :disabled="curStep <= 0">
        上一步
      </van-button>
      <van-button @click="nextStep" size="small" hairline color="#7232dd" :disabled="curStep >= 4">
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import PickCom from '@/components/PickCom';
import ChooseComNew from '@/components/ChooseComNew';
import SelectTree from '@/components/SelectTree';
import LimitCom from '@/components/LimitCom';
import TargetCom from '@/components/TargetCom';
import ResultCom from '@/components/ResultCom';

export default {
  data() {
    return {
      curStep: 0,
      calcObj: {
        yuhunList: [],
        式神: '请选择',
        套装: {},
        主属性: {
          2: [],
          4: [],
          6: [],
        },
        属性限制: {},
        目标: '输出伤害',
        mode: '4+2',
        基础面板: {},
      },
    };
  },
  components: {
    PickCom,
    ChooseComNew,
    SelectTree,
    LimitCom,
    TargetCom,
    ResultCom,
  },
  methods: {
    nextStep() {
      // if (this.curStep == 0) {
      //   if (this.calcObj.式神 == '请选择') {
      //     this.$notify('请先选择目标式神.');
      //     return;
      //   }
      // }
      switch (this.curStep) {
        case 0:
          if (this.calcObj.式神 == '请选择') {
            this.$notify('请先选择目标式神.');
            return;
          }
          break;
        case 1:
          console.log('this.calcObj.套装 :', this.calcObj.套装);
          if (
            (this.calcObj.mode == '4+2' &&
              (this.calcObj.套装[4] == undefined || this.calcObj.套装[2] == undefined)) ||
            (this.calcObj.mode == '2+2+2' &&
              (this.calcObj.套装[1] == undefined ||
                this.calcObj.套装[2] == undefined ||
                this.calcObj.套装[3] == undefined))
          ) {
            this.$notify('请先选择御魂组合.');
            return;
          }
          if (
            !this.calcObj.主属性[2].length ||
            !this.calcObj.主属性[4].length ||
            !this.calcObj.主属性[6].length
          ) {
            this.$notify('请先选择二四六号位的主属性.');
            return;
          }
          console.log('this.calcObj.主属性 :', this.calcObj.主属性);
          break;

        default:
          break;
      }
      this.curStep += 1;
      this.curStep = Math.min(this.curStep, 4);
    },
    lastStep() {
      this.curStep -= 1;
      this.curStep = Math.max(this.curStep, 0);
    },
    updateCalcObj(name, value) {
      this.calcObj[name] = value;
    },
  },
};
</script>

<style lang="less" scoped>
.calc-content {
  min-height: calc(100vh - 222px);
}
.btn-group {
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>
