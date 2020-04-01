<template>
  <van-tree-select
    :items="items"
    :active-id.sync="activeIds"
    :main-active-index.sync="activeIndex"
    @click-item="getMainAttrsList"
  />
</template>

<script>
import { mainAttrsList, mataList, mapAttrs } from '@/data/dataFormat';
export default {
  props: ['type'],
  data() {
    return {
      items: this.type === '御魂' ? mataList : mainAttrsList,
      activeIds: [],
      activeIndex: 0,
    };
  },
  methods: {
    getMainAttrsList() {
      let mainAttrs = {};
      this.activeIds.forEach(item => {
        let posid = parseInt((item % 100) / 10);
        if (mainAttrs[posid] == undefined) {
          mainAttrs[posid] = [mapAttrs[item]];
        } else {
          mainAttrs[posid].push(mapAttrs[item]);
        }
      });
      if (this.type == '主属性') this.$emit('updateCalcObj', '主属性', mainAttrs);
    },
  },
};
</script>

<style></style>
