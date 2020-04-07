<template>
  <div id="calc">
    <calc-com></calc-com>
  </div>
</template>

<script>
import CalcCom from '@/components/CalcCom';

export default {
  data() {
    return {
      maxSpeedList: [],
      maxSpeed: 0,
      showPop: false,
      showItem: {},
      activeName: ['1'],
    };
  },
  components: {
    CalcCom,
  },
};
</script>

<style lang="less" scoped>
#calc {
  margin: 50px 5px;
}
</style>
