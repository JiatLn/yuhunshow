<template>
  <div class="">
    <div class="asset-list">
      <div class="asset-item" v-for="(item, index) in assetsList" :key="index">
        <div class="desc">
          <img :src="item.icon" alt="" />
          <span>{{ item.text }}</span>
        </div>
        <span>{{ getAssetItem(item.name) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { assetsList } from '@/data/asset';

export default {
  data() {
    return {
      assetsList,
    };
  },
  mounted() {
    console.log('this.yyx.data.currency :', this.yyx.data.currency);
  },
  computed: {
    ...mapState(['yyx']),
    asset() {
      return this.yyx.data.currency;
    },
  },
  methods: {
    getAssetItem(name) {
      return this.asset[name] || '0';
    },
  },
};
</script>

<style lang="less" scoped>
.asset-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  .asset-item {
    background-color: #eee;
    margin: 6px 10px;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    padding: 4px 10px 4px 8px;
    color: #1e1e1e;
    font-size: 0.8rem;
    .desc {
      display: flex;
      align-items: center;
      span {
        margin-left: 6px;
      }
      img {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
