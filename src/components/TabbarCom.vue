<template>
  <van-tabbar v-model="activeTab">
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/yuhun">御魂</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="/calc">计算</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="me">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
    };
  },
};
</script>

<style></style>
