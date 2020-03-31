<template>
  <div id="limit">
    <van-tabs swipeable>
      <van-tab v-for="(item, index) in limit" :title="item.name" :key="index">
        <div class="panel">
          <span>{{ item.name }}下限</span>
          <van-stepper v-model="item.minMax[0]" :min="0" input-width="70px" button-size="32px" />
        </div>
        <div class="panel">
          <span>{{ item.name }}上限</span>
          <van-stepper
            v-model="item.minMax[1]"
            :default-value="999999"
            :min="0"
            input-width="70px"
            button-size="32px"
          />
        </div>
        <p style="padding-left: 30px; color:#999">*上限默认999999，不进行设置则忽略</p>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baoji: [0, 100],
      limit: [
        { name: '速度', minMax: [0, null] },
        { name: '暴击', minMax: [0, null] },
        { name: '暴击伤害', minMax: [0, null] },
        { name: '攻击', minMax: [0, null] },
        { name: '生命', minMax: [0, null] },
        { name: '防御', minMax: [0, null] },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
#limit {
  .panel {
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px;
    &:first-child {
      margin-top: 20px;
    }
  }
}
</style>
