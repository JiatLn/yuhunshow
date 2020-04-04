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
        式神指定：
        <span style="color: red">{{ picker }}</span>
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
  .pick-pane {
    padding: 14px 0;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 40%;
        font-size: 14px;
        margin: 0 5%;
      }
    }
  }
}
</style>
