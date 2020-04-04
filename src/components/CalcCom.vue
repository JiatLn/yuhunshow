<template>
  <div id="calc">
    <van-steps :active="curStep">
      <van-step>目标式神</van-step>
      <van-step>套装组合</van-step>
      <van-step>属性限制</van-step>
      <van-step>计算指标</van-step>
    </van-steps>
    <div class="calc-content">
      <pick-com v-show="curStep === 0" @updateCalcObj="updateCalcObj"></pick-com>
      <choose-com-new v-show="curStep === 1" @updateCalcObj="updateCalcObj"></choose-com-new>
      <!-- <choose-com v-show="curStep === 1" @updateCalcObj="updateCalcObj"></choose-com> -->
      <select-tree v-show="curStep === 1" @updateCalcObj="updateCalcObj"></select-tree>
      <limit-com v-show="curStep === 2" @updateCalcObj="updateCalcObj"></limit-com>
      <target-com v-show="curStep === 3" @updateCalcObj="updateCalcObj" :obj="calcObj"></target-com>
    </div>
    <div class="btn-group">
      <van-button @click="lastStep" size="small" hairline color="#7232dd" :disabled="curStep <= 0">
        上一步
      </van-button>
      <van-button @click="nextStep" size="small" hairline color="#7232dd" :disabled="curStep >= 3">
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

export default {
  data() {
    return {
      curStep: 0,
      calcObj: {
        yuhunList: [],
        式神: '鬼切',
        套装: {},
        主属性: {
          2: ['攻击加成'],
          4: ['攻击加成'],
          6: ['暴击', '暴击伤害'],
        },
        限制属性: {},
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
  },
  methods: {
    nextStep() {
      this.curStep += 1;
      this.curStep = Math.min(this.curStep, 3);
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
#calc {
  .calc-content {
    min-height: calc(100vh - 280px);
  }
  .btn-group {
    margin: 0 auto;
    width: 80%;
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }
}
</style>
