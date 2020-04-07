<template>
  <div id="app">
    <div id="content">
      <van-nav-bar title="御魂show" :fixed="true" left-arrow @click-left="goBack" />
      <div class="main">
        <router-view />
      </div>
      <tabbar-com></tabbar-com>
    </div>
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
      this.$store.commit('updateYhList', {
        username,
        yuhun: JSON.parse(yuhun),
      });
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
  box-sizing: border-box;

  @media only screen and (min-width: 500px) {
    #content {
      @margin: 60px;
      // border: 1px solid red;
      box-shadow: 2px 2px 5px #333333;
      margin: @margin auto;
      width: 414px;
      height: 736px;
      overflow: scroll;
      // 隐藏滚动条但是可以滚动
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;
      .van-nav-bar {
        z-index: 999;
        width: 414px;
        top: 0 + @margin;
        left: auto;
      }
      .van-tabbar {
        width: 414px;
        top: 736px - 50px + @margin;
        left: auto;
      }
    }
  }
  .main {
    margin: 46px 0 50px 0;
  }
}
</style>
