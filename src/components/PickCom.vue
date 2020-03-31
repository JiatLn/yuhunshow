<template>
  <van-picker
    ref="picker"
    show-toolbar
    title="选择四件套"
    :default-index="1"
    :columns="columns"
    @change="getPicker"
  >
    <div slot="default">
      四件套指定：
      <span style="color: red">{{ picker }}</span>
    </div>
  </van-picker>
</template>

<script>
import { attrsTree } from '@/data/dataFormat';
export default {
  data() {
    return {
      columns: attrsTree,
      picker: '狰',
    };
  },
  methods: {
    getPicker() {
      this.picker = this.$refs.picker.getValues()[1];
    },
  },
};
</script>

<style></style>
