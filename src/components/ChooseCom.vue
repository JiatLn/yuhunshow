<template>
  <div id="choose">
    <van-divider>御魂套装</van-divider>
    <van-grid square :column-num="4" :gutter="10">
      <van-grid-item
        v-for="(item, index) in typeList"
        :key="index"
        :text="item"
        @click="show(index)"
      />
    </van-grid>
    <div class="current-selected">
      当前选择: [
      <van-tag v-show="radio4 != ''" closeable size="large" type="primary" @close="close(4)">
        {{ radio4 }}
      </van-tag>
      <van-tag
        v-show="!!item.length"
        v-for="(item, index) in radio2"
        :key="index"
        closeable
        size="large"
        type="success"
        @close="close(index)"
      >
        {{ item }}
      </van-tag>
      ]
    </div>
    <!-- 弹出 -->
    <van-action-sheet v-model="showPop" :title="typeList[index]" :round="false">
      <div class="content">
        <van-divider v-show="typeList[index] != '首领御魂'">四件套</van-divider>
        <van-radio-group
          v-model="radio4"
          direction="horizontal"
          v-show="typeList[index] != '首领御魂'"
        >
          <p v-for="(item, index) in filterYhType(typeList[index])" :key="index">
            <van-radio :name="item + ' 4'" @click="radioClick">{{ item }}</van-radio>
          </p>
        </van-radio-group>
        <van-divider>二件套</van-divider>
        <van-radio-group v-model="radio2" direction="horizontal">
          <p v-for="(item, index) in filterYhType(typeList[index])" :key="index">
            <van-checkbox-group v-model="radio2" :max="3 - Number(radio4 != '') * 2">
              <van-checkbox :name="item + ' 2'" @click="radioClick" checked-color="#07c160">
                {{ item }}
              </van-checkbox>
            </van-checkbox-group>
          </p>
        </van-radio-group>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import yuhunMap from '@/data/yuhunMap';
import { typeList } from '@/data/dataFormat';
export default {
  data() {
    return {
      typeList,
      activeName: 0,
      yuhun: yuhunMap.map(item => {
        return { name: item.name, type: item.type };
      }),
      showPop: false,
      index: 0,
      radio4: '',
      radio2: [],
      four: '',
    };
  },
  methods: {
    show(index) {
      this.index = index;
      this.showPop = !this.showPop;
    },
    filterYhType(type) {
      return this.yuhun
        .filter(item => {
          return item.type == type;
        })
        .map(item => item.name);
    },
    radioClick() {
      // setTimeout(() => {
      //   this.showPop = !this.showPop;
      // }, 300);
    },
    close(index) {
      if (index == 4) {
        this.radio4 = '';
      } else {
        this.radio2.splice(index, 1);
      }
    },
  },
};
</script>

<style lang="less" scoped>
#choose {
  .content {
    min-height: 200px;
    padding-bottom: 30px;
    .van-radio-group {
      margin: 0 20px;
      & > p {
        width: 25%;
      }
    }
  }
  .current-selected {
    display: flex;
    justify-content: center;
    align-items: baseline;
    // flex-direction: column;
    padding: 40px 0;
    & > * {
      margin: 0 12px;
    }
  }
}
</style>
