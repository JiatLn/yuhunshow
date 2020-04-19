<template>
  <div id="optimize-pane">
    <van-radio-group v-model="optimizePaneRadio" @change="onChange">
      <van-cell-group v-for="(item, index) in radioList" :key="index">
        <van-cell :title="item.name" clickable @click="getOptimizePane(index)">
          <template #right-icon>
            <van-radio :name="item.id" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <p style="text-align: center">{{ radioList[optimizePaneRadio - 1].desc }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { optimizePaneList } from '@/data/dataFormat';

export default {
  props: ['obj'],

  data() {
    return {
      radioList: optimizePaneList,
      optimizePaneRadio: 1,
      optimizePane: '输出伤害',
    };
  },
  computed: {
    ...mapState(['yuhunList']),
  },
  methods: {
    getOptimizePane(index) {
      this.optimizePaneRadio = this.radioList[index].id;
      this.optimizePane = this.radioList[index].name;
    },
    onChange() {
      this.$emit('updateCalcObj', 'optimize_pane', this.optimizePane);
    },
  },
};
</script>

<style lang="less" scoped></style>
