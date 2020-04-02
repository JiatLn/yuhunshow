<template>
  <div id="calc">
    <van-steps :active="active">
      <van-step>目标式神</van-step>
      <van-step>御魂套装</van-step>
      <van-step>位置指定</van-step>
      <van-step>属性限制</van-step>
      <van-step>计算指标</van-step>
    </van-steps>
    <div class="calc-content">
      <pick-com v-show="active === 0" @updateCalcObj="updateCalcObj"></pick-com>
      <choose-com v-show="active === 1" @updateCalcObj="updateCalcObj"></choose-com>
      <select-tree v-show="active === 2" @updateCalcObj="updateCalcObj"></select-tree>
      <limit-com v-show="active === 3" @updateCalcObj="updateCalcObj"></limit-com>
      <target-com v-show="active === 4" @updateCalcObj="updateCalcObj" :obj="calcObj"></target-com>
    </div>
    <div class="btn-group">
      <van-button @click="lastStep" size="small" hairline color="#7232dd" :disabled="active <= 0">
        上一步
      </van-button>
      <van-button @click="nextStep" size="small" hairline color="#7232dd" :disabled="active >= 4">
        下一步
      </van-button>
    </div>
  </div>
</template>

<script>
import PickCom from '@/components/PickCom';
import ChooseCom from '@/components/ChooseCom';
import SelectTree from '@/components/SelectTree';
import LimitCom from '@/components/LimitCom';
import TargetCom from '@/components/TargetCom';

export default {
  data() {
    return {
      active: 0,
      calcObj: {},
    };
  },
  components: {
    PickCom,
    ChooseCom,
    SelectTree,
    LimitCom,
    TargetCom,
  },
  methods: {
    nextStep() {
      // if (
      //   (this.calcObj['式神'] === undefined || this.calcObj['式神'] === '请选择') &&
      //   this.active === 0
      // ) {
      //   this.$notify('请先选择目标式神.');
      //   return;
      // } else if (
      //   (this.calcObj['御魂'] === undefined || this.calcObj['御魂'] === '请选择') &&
      //   this.active === 1
      // ) {
      //   this.$notify('请先选择目标御魂.');
      //   return;
      // } else if (
      //   (this.calcObj['主属性'] === undefined || Object.keys(this.calcObj['主属性']).length < 3) &&
      //   this.active === 2
      // ) {
      //   this.$notify('请先选择二四六号位的主属性.');
      //   return;
      // }
      this.active += 1;
      this.active = Math.min(this.active, 4);
    },
    lastStep() {
      this.active -= 1;
      this.active = Math.max(this.active, 0);
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
