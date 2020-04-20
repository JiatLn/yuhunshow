<template>
  <div class="yuhun">
    <load-json-com></load-json-com>
    <van-divider>御魂列表</van-divider>
    <van-cell-group>
      <van-cell title="御魂总数" :value="yuhunList.length + '/6000'"></van-cell>
    </van-cell-group>
    <filter-box-com :yuhunByLoc="yuhunByLoc" />
  </div>
</template>

<script>
import LoadJsonCom from '@/components/LoadJsonCom';
import FilterBoxCom from '@/components/YuhunView/FilterBoxCom';

import { mapState } from 'vuex';

export default {
  components: {
    LoadJsonCom,
    FilterBoxCom,
  },
  data() {
    return {};
  },
  mounted() {
    console.log('this.yuhunList :', this.yuhunList);
  },
  computed: {
    ...mapState(['yyx']),
    yuhunList() {
      return this.yyx?.data?.hero_equips || [];
    },
    yuhunByLoc() {
      let yuhunByLoc = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
      for (let yuhun of this.yuhunList) {
        yuhunByLoc[yuhun.pos + 1].push(yuhun);
      }
      return yuhunByLoc;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
