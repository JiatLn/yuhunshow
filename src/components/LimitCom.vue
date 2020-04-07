<template>
  <div id="limit">
    <van-divider>属性限制</van-divider>
    <div
      v-for="item in propLimit"
      :title="item.name"
      :key="item.name"
      :name="item.name"
      class="pane"
    >
      <van-cell-group class="pane-child">
        <van-field
          v-model.lazy="item.minMax[0]"
          type="number"
          :label="item.name"
          placeholder="下限"
          @change="onChangePropLimit"
        />
        <van-field
          v-model.lazy="item.minMax[1]"
          type="number"
          :label="item.name"
          placeholder="上限"
          @change="onChangePropLimit"
        />
      </van-cell-group>
    </div>
    <br />
    <van-divider>面板限制</van-divider>
    <div
      v-for="item in paneLimit"
      :title="item.name"
      :key="item.name"
      :name="item.name"
      class="pane"
    >
      <van-cell-group class="pane-child">
        <van-field
          v-model.lazy="item.minMax[0]"
          type="number"
          :label="item.name"
          placeholder="下限"
          @change="onChangePaneLimit"
        />
        <van-field
          v-model.lazy="item.minMax[1]"
          type="number"
          :label="item.name"
          placeholder="上限"
          @change="onChangePaneLimit"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      propLimit: [
        { name: '速度', minMax: [undefined, undefined] },
        { name: '暴击', minMax: [undefined, undefined] },
        { name: '暴击伤害', minMax: [undefined, undefined] },
        // { name: '攻击', minMax: [undefined, undefined] },
        // { name: '生命', minMax: [undefined, undefined] },
        // { name: '防御', minMax: [undefined, undefined] },
        // { name: '效果命中', minMax: [undefined, undefined] },
        // { name: '效果抵抗', minMax: [undefined, undefined] },
      ],
      paneLimit: [{ name: '输出', minMax: [undefined, undefined] }],
    };
  },
  methods: {
    onChangePropLimit() {
      let limit = {};
      this.propLimit.map(item => {
        if (item.minMax[0] != undefined || item.minMax[1] != undefined) {
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
    onChangePaneLimit() {
      let limit = {};
      this.paneLimit.map(item => {
        if (item.minMax[0] != undefined || item.minMax[1] != undefined) {
          limit[item.name] = {
            min: Number(item.minMax[0]) || 0,
            max: Number(item.minMax[1]) || Infinity,
          };
        }
      });
      this.$emit('updateCalcObj', '面板限制', limit);
    },
  },
};
</script>

<style lang="less" scoped>
.pane {
  display: flex;
  .pane-child {
    display: flex;
    // width: 50%;
  }
}

.van-divider {
  margin: 0 0 16px 0 !important;
}
</style>
