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
      <pick-com v-show="active === 1"></pick-com>
      <select-tree v-show="active === 2"></select-tree>
      <limit-com v-show="active === 3"></limit-com>
      <target-com v-show="active === 4"></target-com>
    </div>
    <div class="btn-group">
      <van-button @click="lastStep" type="primary" mini hairline plain>上一步</van-button>
      <van-button @click="nextStep" type="info" mini hairline plain>下一步</van-button>
    </div>
  </div>
</template>

<script>
import SelectTree from '@/components/SelectTree';
import PickCom from '@/components/PickCom';
import LimitCom from '@/components/LimitCom';
import TargetCom from '@/components/TargetCom';
export default {
  data() {
    return {
      active: 2,
    };
  },
  components: {
    PickCom,
    SelectTree,
    LimitCom,
    TargetCom,
  },
  methods: {
    nextStep() {
      this.active += 1;
      this.active = Math.min(this.active, 4);
    },
    lastStep() {
      this.active -= 1;
      this.active = Math.max(this.active, 0);
    },
  },
};
</script>

<style lang="less" scoped>
#calc {
  .calc-content {
    height: 300px;
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
