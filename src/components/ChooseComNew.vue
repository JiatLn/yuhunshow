<template>
  <div id="choose">
    <van-divider>御魂组合</van-divider>
    <van-radio-group v-model="taoz" direction="horizontal" class="radio-group" @change="onChange">
      <van-radio name="4+2">4 + 2</van-radio>
      <van-radio name="2+2+2">2 + 2 + 2</van-radio>
    </van-radio-group>
    <br />
    <van-dropdown-menu v-show="taoz == '4+2'">
      <van-dropdown-item
        :title="combo1[4] != 0 ? combo1[4] + '×4' : '选择四件套'"
        v-model="combo1[4]"
        :options="yuhunOpt"
        @change="onChange"
      />
      <van-dropdown-item
        :title="combo1[2] != 0 ? combo1[2] + '×2' : '选择二件套'"
        v-model="combo1[2]"
        :options="yuhunOpt"
        @change="onChange"
      />
    </van-dropdown-menu>
    <van-dropdown-menu v-show="taoz == '2+2+2'">
      <van-dropdown-item
        v-for="(value, key, index) in combo2"
        :key="index"
        :title="value != 0 ? value + '×2' : '选择二件套'"
        v-model="combo2[key]"
        :options="yuhunOpt"
        @change="onChange"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
import yuhunMap from '@/data/yuhunMap';
import { typeList } from '@/data/dataFormat';

let yuhunOpt = [];
yuhunMap.map(item => {
  if (typeList.includes(item.name)) {
    yuhunOpt.push({ text: item.name, value: item.name, icon: 'arrow-down' });
  } else {
    yuhunOpt.push({ text: item.name, value: item.name });
  }
});

export default {
  data() {
    return {
      yuhun: yuhunMap.map(item => {
        return { name: item.name, type: item.type };
      }),
      taoz: '4+2',
      four: 0,
      two: 0,
      yuhunOpt,
      typeList,
      combo1: {
        4: 0,
        2: 0,
      },
      combo2: {
        1: 0,
        2: 0,
        3: 0,
      },
    };
  },
  methods: {
    onChange() {
      if (this.taoz == '4+2') {
        this.$emit('updateCalcObj', '套装', this.combo1);
      } else {
        this.$emit('updateCalcObj', '套装', this.combo2);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#choose {
  .van-divider {
    margin: 0 0 16px 0 !important;
  }
  .radio-group {
    display: flex;
    justify-content: center;
    & > * {
      margin: 0 50px;
    }
  }
}
</style>
