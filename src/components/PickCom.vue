<template>
  <div id="pick">
    <van-picker
      ref="picker"
      show-toolbar
      :columns="columns"
      visible-item-count="5"
      @change="getPicker"
    >
      <div slot="default">
        <span>目标式神：</span>
        <span>{{ picker }}</span>
      </div>
    </van-picker>
    <van-panel :title="picker" v-show="picker != '请选择'">
      <div class="pick-pane">
        <ul>
          <li v-for="(value, key, index) in pickPane" :key="index">
            {{ key }}：{{ value | paneFilter(key) }}
          </li>
        </ul>
      </div>
    </van-panel>
  </div>
</template>

<script>
import { paneFilter } from '@/filters/index';
import { HeroTree } from '@/data/dataFormat';
import { HeroPane } from '@/data/heroData';

export default {
  filters: {
    paneFilter,
  },
  data() {
    return {
      columns: HeroTree,
      picker: '请选择',
    };
  },
  methods: {
    getPicker() {
      this.picker = this.$refs.picker.getValues()[1];
      this.$emit('updateCalcObj', '式神', this.picker);
      this.$emit('updateCalcObj', '基础面板', this.pickPane);
    },
  },
  computed: {
    pickPane() {
      return HeroPane[this.picker];
    },
  },
};
</script>

<style lang="less" scoped>
#pick {
  span {
    font-size: 14px;
    color: red;
    &:first-child {
      margin-left: 15px;
      color: black;
    }
  }
  .pick-pane {
    padding: 14px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 33%;
        font-size: 14px;
        margin: 2px 8%;
      }
    }
  }
}
</style>
