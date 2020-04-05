<template>
  <div id="limit">
    <div
      v-for="(item, index) in limit"
      :title="item.name"
      :key="index"
      :name="item.name"
      class="pane"
    >
      <van-cell-group class="pane-child">
        <van-field
          v-model.lazy="item.minMax[0]"
          type="number"
          :label="item.name"
          placeholder="下限"
          @change="onChange"
        />
        <van-field
          v-model.lazy="item.minMax[1]"
          type="number"
          :label="item.name"
          placeholder="上限"
          @change="onChange"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baoji: [0, 100],
      limit: [
        { name: '速度', minMax: [undefined, undefined] },
        { name: '暴击', minMax: [undefined, undefined] },
        // { name: '暴击伤害', minMax: [undefined, undefined] },
        // { name: '攻击', minMax: [undefined, undefined] },
        // { name: '生命', minMax: [undefined, undefined] },
        // { name: '防御', minMax: [undefined, undefined] },
        // { name: '效果命中', minMax: [undefined, undefined] },
        // { name: '效果抵抗', minMax: [undefined, undefined] },
        { name: '输出伤害', minMax: [undefined, undefined] },
      ],
      activeName: '速度',
    };
  },
  methods: {
    onChange() {
      let limit = {};
      this.limit.map(item => {
        if (!(item.minMax[0] == undefined && item.minMax[1] == undefined)) {
          if (['暴击', '暴击伤害', '攻击加成'].includes(item.name)) {
            limit[item.name] = {
              min: Number(item.minMax[0]) / 100 || 0,
              max: Number(item.minMax[1]) / 100 || Infinity,
            };
          } else {
            limit[item.name] = {
              min: Number(item.minMax[0]) || 0,
              max: Number(item.minMax[1]) || Infinity,
            };
          }
        }
      });
      this.$emit('updateCalcObj', '属性限制', limit);
    },
  },
};
</script>

<style lang="less" scoped>
#calc {
  .pane {
    display: flex;
    .pane-child {
      display: flex;
      // width: 50%;
    }
  }
}
</style>
