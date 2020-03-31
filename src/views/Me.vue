<template>
  <div id="me">
    <van-panel title="个人中心" :desc="$store.state.username" status="已保存"> </van-panel>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#me {
  span {
    margin: 20px 10px;
    text-align: center;
  }
}
</style>
