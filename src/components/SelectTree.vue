<template>
  <div class="">
    <van-divider>位置指定</van-divider>
    <van-tree-select
      height="240"
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="activeIndex"
      @click-item="getMainAttrsList"
    />
  </div>
</template>

<script>
import { mainAttrsList, mapAttrs } from '@/data/dataFormat';
export default {
  data() {
    return {
      items: mainAttrsList,
      activeIds: [],
      activeIndex: 0,
    };
  },
  methods: {
    getMainAttrsList() {
      let mainAttrs = { 2: [], 4: [], 6: [] };
      this.activeIds.forEach(item => {
        let posid = parseInt((item % 100) / 10);
        mainAttrs[posid].push(mapAttrs[item]);
      });
      this.$emit('updateCalcObj', '主属性', mainAttrs);
    },
  },
};
</script>

<style></style>
