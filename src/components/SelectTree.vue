<template>
  <van-tree-select
    :items="items"
    :active-id.sync="activeIds"
    :main-active-index.sync="activeIndex"
    @click-item="getMainAttrsList"
  />
</template>

<script>
import { mainAttrsList, mapAttrs } from '@/data/dataFormat';
export default {
  data() {
    return {
      items: mainAttrsList,
      activeIds: [],
      activeIndex: 0,
      chooseMainAttr: {},
    };
  },
  methods: {
    getMainAttrsList() {
      let chooseMainAttr = {};
      this.activeIds.forEach(item => {
        let posid = parseInt((item % 100) / 10);
        if (chooseMainAttr[posid] == undefined) {
          chooseMainAttr[posid] = [mapAttrs[item]];
        } else {
          chooseMainAttr[posid].push(mapAttrs[item]);
        }
      });
      this.chooseMainAttr = chooseMainAttr;
    },
  },
};
</script>

<style></style>
