<template>
  <div class="filter-box">
    <div class="loc-group">
      <div
        class="loc-item"
        :class="{ selected: selected == index + 1 }"
        v-for="(item, index) in locList"
        :key="index"
        @click="switchLoc(index + 1)"
      >
        {{ item }}
      </div>
    </div>
    <van-divider>{{ locList[selected - 1] }}号位</van-divider>
    <van-grid square :column-num="6">
      <van-grid-item
        v-for="(item, index) in showList"
        :key="index"
        :text="item.name"
        :icon="item.icon"
        @click="show(item)"
      >
      </van-grid-item>
    </van-grid>
    <p class="tips">仅展示：全部+15的御魂以及式神已装备的御魂</p>
    <van-popup v-model="active" position="bottom" :style="{ height: '30%' }" class="popup">
      <div class="yuhun-desc" v-if="Object.keys(showItem).length">
        <div class="title">
          <img :src="showItem.icon" alt="" />
          <span>{{ showItem.name }}</span>
          <span>+{{ showItem.level }}</span>
        </div>
        <ul>
          <li>
            <span>{{ showItem.base_attr.type }}</span>
            <span>+{{ showItem.base_attr.value }}</span>
          </li>
          <li v-for="(item, index) in showItem.attrs" :key="index">
            <span>{{ item.type }}</span>
            <span>+{{ item.value }}</span>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import yuhunMap from '@/data/yuhunMap';

export default {
  props: ['yuhunByLoc'],
  data() {
    return {
      locList: ['壹', '贰', '叁', '肆', '伍', '陆'],
      selected: 1,
      showItem: {},
      active: true,
    };
  },
  computed: {
    showList() {
      let yuhunList = this.yuhunByLoc[this.selected].filter(item => {
        return item.level == 15;
      });
      let res = yuhunList.map(item => {
        let name = this.getYuhunName(item.suit_id);
        return { ...item, ...name };
      });
      res = res.sort((a, b) => {
        return a.id - b.id;
      });
      return res;
    },
  },
  methods: {
    switchLoc(loc) {
      this.selected = loc;
    },
    getYuhunName(suit_id) {
      return yuhunMap.filter(item => {
        return item.id == suit_id;
      })[0];
    },
    show(item) {
      console.log('item :', item);
      this.showItem = item;
      this.active = true;
    },
  },
};
</script>

<style lang="less" scoped>
.filter-box {
  .loc-group {
    display: flex;
    justify-content: center;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #f3f3f3;
    .selected.loc-item {
      color: #e74e4b;
      &:before {
        background: #fef3f3;
      }
    }
    .loc-item {
      display: inline-block;
      width: 12%;
      text-align: center;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        width: 1.6rem;
        height: 1.6rem;
        margin: -0.8rem 0 0 -0.8rem;
        border-radius: 100%;
        border-top-left-radius: 0;
        background: #f3f3f3;
        transform-origin: center;
      }
      &:nth-child(2)::before {
        transform: rotate(-45deg);
      }
      &:nth-child(3)::before {
        transform: rotate(-90deg);
      }
      &:nth-child(4)::before {
        transform: rotate(180deg);
      }
      &:nth-child(5)::before {
        transform: rotate(135deg);
      }
      &:nth-child(6)::before {
        transform: rotate(90deg);
      }
    }
  }
}

.tips {
  text-align: center;
  color: #aaa;
  font-size: 12px;
  padding-bottom: 10px;
}

.popup {
  background-color: rgb(214, 201, 185);
  box-shadow: inset 0 0 0 1px #3a200d, inset 0 0 0 2px #aa8559, inset 0 0 2px 3px #261a0d;
  .yuhun-desc {
    display: flex;
    flex-direction: column;
    align-content: space-around;
    margin: 16px 18px;
    font-size: 14px;
    ul li:first-child {
      color: #d96932;
    }
    li {
      display: flex;
      justify-content: space-between;
      margin: 5px 0;
    }
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        margin-right: 12px;
        width: 38px;
      }
    }
  }
}
</style>
