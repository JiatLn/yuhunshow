<template>
  <div id="box" v-if="combo.length">
    <div>
      <ul class="yuhun-box">
        <li
          :class="'yuhun-pos-' + (index + 1)"
          v-for="(item, index) in combo"
          :key="index"
          @click="show(index)"
        >
          <img :src="getIcon(item.name)" alt />
        </li>
      </ul>
    </div>

    <!-- 遮罩 -->
    <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
      <ul class="show-pop">
        <li>
          <span>{{ showItem.name }}</span>
          <span style="color: red">{{ showItem.pos }}号位 · {{ showItem.mainAttr }}</span>
        </li>
        <li v-for="(v, k, i) in showItem.attrs" :key="i">
          <span>{{ k }}</span>
          <span>+{{ v | ff(k, 0) }}</span>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import _ from 'lodash';
import yuhunMap from '@/data/yuhunMap';
import { ff } from '@/filters';

export default {
  props: ['combo'],
  data() {
    return {
      showPop: false,
      showItem: {},
      activeName: ['1'],
    };
  },
  filters: {
    ff,
  },
  methods: {
    getIcon(name) {
      return _.find(yuhunMap, o => o.name == name).icon;
    },
    show(index) {
      this.showPop = !this.showPop;
      this.showItem = this.combo[index];
    },
  },
};
</script>

<style lang="less" scoped>
.max-speed-list {
  li {
    display: flex;
    justify-content: space-around;
    padding: 4px 5%;
    span {
      width: 30%;
    }
  }
}
.yuhun-box {
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  position: relative;
  li {
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 72%;
      height: 72%;
    }
  }
  li::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../assets/img/yuhun-border.png) no-repeat 50%;
    background-size: 100% 100%;
  }
  .yuhun-pos-1 {
    position: absolute;
    top: 0.2rem;
    left: 7.6rem;
  }
  .yuhun-pos-2 {
    position: absolute;
    top: 4.2rem;
    left: 4.6rem;
    &::before {
      transform: rotate(-45deg);
    }
  }
  .yuhun-pos-3 {
    position: absolute;
    top: 8.2rem;
    left: 7.6rem;
    &::before {
      transform: rotate(-90deg);
    }
  }
  .yuhun-pos-4 {
    position: absolute;
    top: 8.2rem;
    left: 13.6rem;
    &::before {
      transform: rotate(-180deg);
    }
  }
  .yuhun-pos-5 {
    position: absolute;
    top: 4.2rem;
    left: 16.6rem;
    &::before {
      transform: rotate(135deg);
    }
  }
  .yuhun-pos-6 {
    position: absolute;
    top: 0.2rem;
    left: 13.6rem;
    &::before {
      transform: rotate(90deg);
    }
  }
}
.show-pop {
  li {
    display: flex;
    justify-content: space-between;
    margin: 10px 20px;
    span {
      display: block;
    }
  }
}
</style>
