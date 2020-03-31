<template>
  <div id="app">
    <van-nav-bar title="御魂show" :fixed="true" left-arrow @click-left="goBack" />
    <div class="main">
      <router-view />
    </div>
    <tabbar-com></tabbar-com>
  </div>
</template>

<script>
import TabbarCom from '@/components/TabbarCom';

import { mapMutations } from 'vuex';
export default {
  components: {
    TabbarCom,
  },
  data() {
    return {};
  },
  mounted() {
    let yuhun = localStorage.getItem('yuhun');
    let username = localStorage.getItem('username');
    if (yuhun != null && username != null && yuhun.length > 0 && username.length > 0) {
      console.log('loaded yuhun data :', username);
      this.$store.commit('updateYhList', { username, yuhun: JSON.parse(yuhun) });
    }
  },

  methods: {
    ...mapMutations(['updateYhList']),
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
#app {
  .van-nav-bar {
    z-index: 999;
  }
  .main {
    margin: 46px 0 50px 0;
  }
}
</style>
