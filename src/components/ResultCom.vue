<template>
  <div class="result">
    <van-panel title="已选条件" desc="描述信息">
      <div class="pane">
        <ul>
          <li v-for="(item, index) in showItem" :key="index" v-show="item.length">
            {{ item }}
          </li>
        </ul>
      </div>
    </van-panel>
    <div class="btn">
      <van-button
        @click="calc"
        size="small"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        block
        loading-text="计算中..."
        :loading="loading"
      >
        计算
      </van-button>
    </div>
    <van-divider>计算结果将显示在下面</van-divider>
    <YuhunBox :combo="combo.info || []" v-if="showCb"></YuhunBox>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import MitamaComb from '@/utils/calc';

import YuhunBox from '@/components/YuhunBox';

export default {
  props: ['obj'],
  components: {
    YuhunBox,
  },
  data() {
    return {
      combo: undefined,
      showCb: false,
    };
  },
  computed: {
    ...mapState(['yuhunList', 'loading']),
    showItem() {
      let speedMin = this.obj?.属性限制?.速度?.min || 0;
      let speedMax = this.obj?.属性限制?.速度?.max || Infinity;
      let speedTxt = '';
      if (speedMin == 128 && speedMax == Infinity) {
        speedTxt = '超星';
      } else if (speedMin == 0 && speedMax == 128) {
        speedTxt = '不超星';
      } else if (speedMin > 0 && speedMax == Infinity) {
        speedTxt = `速度至少${speedMin}`;
      } else if (speedMin > 0 && speedMax != Infinity) {
        speedTxt = `速度${speedMin}-${speedMax}`;
      } else if (speedMin == 0 && speedMax != Infinity) {
        speedTxt = `速度最大${speedMax}`;
      }
      let critMin = this.obj?.属性限制?.暴击?.min || 0;
      let critMax = this.obj?.属性限制?.暴击?.max || Infinity;
      let critTxt = '';
      if (critMin == 1 && critMax == Infinity) {
        critTxt = '满暴';
      } else if (critMin > 0 && critMax == Infinity) {
        critTxt = `暴击至少${critMin * 100}%`;
      } else if (critMin > 0 && critMax != Infinity) {
        critTxt = `暴击${critMin * 100}-${critMax * 100}`;
      } else if (critMin == 0 && critMax != Infinity) {
        critTxt = `暴击最大${critMax * 100}%`;
      }

      let taozTxt = '';
      for (const key in this.obj.套装) {
        if (this.obj.套装[key] != undefined) {
          taozTxt += this.obj.套装[key] + 'x' + (key == 4 ? key : 2) + ' ';
        }
      }

      let posTxt = '';
      posTxt = `
        ${this.obj.主属性[2].join(' ')} |
        ${this.obj.主属性[4].join(' ')} |
        ${this.obj.主属性[6].join(' ')}
        `;

      return {
        式神: this.obj.式神,
        套装: taozTxt,
        位置: posTxt,
        速度: speedTxt,
        暴击: critTxt,
      };
    },
  },
  watch: {
    combo(val) {
      this.showCb = (val?.info || []).length == 6;
    },
  },
  methods: {
    ...mapMutations(['isLoading']),
    calc() {
      this.$store.commit('isLoading');
      this.$emit('updateCalcObj', 'yuhunList', this.yuhunList);
      let calc = new MitamaComb(this.obj);
      calc.sayHello();
      let combo = calc.testOutput();
      this.combo = combo;
      this.$store.commit('isLoading');
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin: 20px 40px;
}
.pane {
  padding: 14px 0;
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 100%;
      font-size: 14px;
      margin: 2px 4%;
      span {
        margin-right: 10px;
      }
    }
  }
}
</style>
