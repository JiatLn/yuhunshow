<template>
  <div id="calc">
    <van-panel title="散件一速" desc="描述信息" :status="'' + maxSpeed">
      <ul class="yuhun-box">
        <li
          :class="'yuhun-pos-' + (index + 1)"
          v-for="(item, index) in maxSpeedList"
          :key="index"
          @click="show(index)"
        >
          <img :src="item.icon" alt="" />
        </li>
      </ul>
      <!-- <ul class="max-speed-list">
        <li v-for="(item, index) in maxSpeedList" :key="index">
          <span>{{ item.pos }}号位</span>
          <span> {{ item.name }}</span>
          <span>
            {{ item.attrs.速度.toFixed(4) }}
          </span>
        </li>
      </ul> -->
    </van-panel>
    <div>
      <!-- 遮罩 -->
      <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
        <ul class="show-pop">
          <li>
            <span>{{ showItem.name }}</span>
            <span style="color: red">{{ showItem.pos }}号位 · {{ showItem.mainAttr }}</span>
          </li>
          <li v-for="(v, k, i) in showItem.attrs" :key="i">
            <span>{{ k }}</span>
            <span>+{{ v | ff(k, 2, '%') }}</span>
          </li>
        </ul>
      </van-popup>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';
import yuhunMap from '@/data/yuhunMap';
import { ff } from '@/filters';

export default {
  data() {
    return {
      maxSpeedList: [],
      maxSpeed: 0,
      showPop: false,
      showItem: {},
    };
  },
  filters: {
    ff,
  },
  computed: {
    ...mapState(['yuhunList']),
  },
  mounted() {
    this.getMaxSpeed();
    console.log('calc max speed :', this.maxSpeed);
  },
  methods: {
    show(index) {
      this.showPop = !this.showPop;
      this.showItem = this.maxSpeedList[index];
    },
    getPosMaxSpeed(pos) {
      let yuhun = [];
      if (pos === 2) {
        yuhun = this.yuhunList.filter(item => {
          return item.pos === pos && '速度' in item.attrs && item.mainAttr == '速度';
        });
      } else {
        yuhun = this.yuhunList.filter(item => {
          return item.pos === pos && '速度' in item.attrs;
        });
      }
      yuhun = yuhun.sort((a, b) => {
        return b.attrs.速度 - a.attrs.速度;
      });
      yuhun[0].icon = _.find(yuhunMap, o => o.name == yuhun[0].name).icon;
      return yuhun[0];
    },
    getMaxSpeed() {
      let maxSpeedList = [];
      let maxSpeed = 57;
      for (let i = 0; i < 6; i++) {
        let maxPos = this.getPosMaxSpeed(i + 1);
        maxSpeedList.push(maxPos);
        maxSpeed += maxPos.attrs.速度;
      }
      this.maxSpeedList = maxSpeedList;
      this.maxSpeed = maxSpeed.toFixed(4);
    },
  },
};
</script>

<style lang="less" scoped>
#calc {
  p {
    padding: 5px 0;
    text-align: center;
  }
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
    height: 280px;
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
      top: 2.2rem;
      left: 5.6rem;
    }
    .yuhun-pos-2 {
      position: absolute;
      top: 7.2rem;
      left: 2.6rem;
      &::before {
        transform: rotate(-45deg);
      }
    }
    .yuhun-pos-3 {
      position: absolute;
      top: 12.2rem;
      left: 5.6rem;
      &::before {
        transform: rotate(-90deg);
      }
    }
    .yuhun-pos-4 {
      position: absolute;
      top: 12.2rem;
      left: 13.6rem;
      &::before {
        transform: rotate(-180deg);
      }
    }
    .yuhun-pos-5 {
      position: absolute;
      top: 7.2rem;
      left: 16.6rem;
      &::before {
        transform: rotate(135deg);
      }
    }
    .yuhun-pos-6 {
      position: absolute;
      top: 2.2rem;
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
}
</style>
