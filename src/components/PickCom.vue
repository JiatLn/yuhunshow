<template>
  <van-picker
    ref="picker"
    show-toolbar
    :columns="columns"
    visible-item-count="5"
    @change="getPicker"
  >
    <div slot="default">
      式神指定：
      <span style="color: red">{{ picker }}</span>
    </div>
  </van-picker>
</template>

<script>
import { shishenTree } from '@/data/dataFormat';
export default {
  data() {
    return {
      columns: shishenTree,
      picker: '请选择',
    };
  },
  methods: {
    getPicker() {
      this.picker = this.$refs.picker.getValues()[1];
      this.$emit('updateCalcObj', '式神', this.picker);
    },
  },
};
</script>

<style></style>
