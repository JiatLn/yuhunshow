<template>
  <div class="">
    <van-divider>位置指定</van-divider>
    <van-tree-select
      height="240"
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="activeIndex"
      @click-item="getPropLimitList"
    />
  </div>
</template>

<script>
import { mainPropList, mapProp } from '@/data/dataFormat';
export default {
  data() {
    return {
      items: mainPropList,
      activeIds: [],
      activeIndex: 0,
    };
  },
  methods: {
    getPropLimitList() {
      let propLimit = { '2': [], '4': [], '6': [] };
      this.activeIds.forEach(item => {
        let posid = parseInt((item % 100) / 10);
        propLimit[posid].push(mapProp[item]);
      });
      this.$emit('updateCalcObj', 'l2_prop_limit', propLimit['2']);
      this.$emit('updateCalcObj', 'l4_prop_limit', propLimit['4']);
      this.$emit('updateCalcObj', 'l6_prop_limit', propLimit['6']);
    },
  },
};
</script>

<style></style>
