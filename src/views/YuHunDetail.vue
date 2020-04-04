<template>
  <div class="yuhun-detail">
    <!-- <h1>{{ yuhunName }}</h1> -->
    <van-panel
      v-for="(item, index) in chooseList"
      :key="index"
      :title="item.name + ' +' + item.info.level"
      :status="item.pos + '号位 · ' + item.mainAttr"
    >
      <div class="yh-box">
        <ul>
          <li v-for="(v, k, i) in item.attrs" :key="i">{{ k }}: {{ v | ff(k, 2) }}</li>
        </ul>
      </div>
    </van-panel>
  </div>
</template>

<script>
// import _ from 'lodash';
import { mapState } from 'vuex';

import { ff } from '@/filters';

export default {
  props: ['yuhunName'],
  data() {
    return {};
  },
  filters: {
    ff,
  },
  computed: {
    ...mapState(['yuhunList']),
    chooseList() {
      let list = this.yuhunList.filter(item => {
        return item.name == this.yuhunName;
      });
      list.sort((a, b) => {
        return a.pos - b.pos;
      });
      return list;
    },
  },
};
</script>

<style lang="less" scoped>
.yh-box {
  padding: 20px;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 40%;
      font-size: 14px;
    }
  }
}
</style>
