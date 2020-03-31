<template>
  <div id="limit">
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">暴击</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baoji: [0, 100],
    };
  },
};
</script>

<style lang="less" scoped>
.custom-button {
  width: 26px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>
