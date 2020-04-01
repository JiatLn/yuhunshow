<template>
  <van-picker ref="picker" show-toolbar :columns="columns" @change="getPicker">
    <div slot="default">
      {{ type }}指定：
      <span style="color: red">{{ picker }}</span>
    </div>
    <van-dropdown-menu v-if="type === '御魂'">
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
  </van-picker>
</template>

<script>
import { yuhunTree, shishenTree } from '@/data/dataFormat';
export default {
  props: ['type'],
  data() {
    return {
      columns: this.type === '式神' ? shishenTree : yuhunTree,
      picker: '请选择',
      option1: [
        { text: '选择二件套', value: 0 },
        { text: '攻击加成', value: 1 },
        { text: '生命加成', value: 2 },
        { text: '荒骷髅', value: 2 },
      ],
      value1: 0,
    };
  },
  methods: {
    getPicker() {
      this.picker = this.$refs.picker.getValues()[1];
      this.$emit('updateCalcObj', this.type, this.picker);
    },
  },
};
</script>

<style></style>
