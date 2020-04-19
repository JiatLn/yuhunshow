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
    <YuhunBox :combo="combo || []"></YuhunBox>
  </div>
</template>

<script>
import axios from 'axios';

import { mapState, mapMutations } from 'vuex';

import YuhunBox from '@/components/YuhunBox';

export default {
  props: ['obj'],
  components: {
    YuhunBox,
  },
  data() {
    return {
      showCb: false,
      combo: [],
    };
  },
  computed: {
    ...mapState(['yuhunList', 'loading']),
    showItem() {
      let speedMin = this.obj?.limit_props?.速度?.min || 0;
      let speedMax = this.obj?.limit_props?.速度?.max || Infinity;
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
      let critMin = this.obj?.limit_props?.暴击?.min || 0;
      let critMax = this.obj?.limit_props?.暴击?.max || Infinity;
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

      let planTxt = '';
      for (const key in this.obj.plan) {
        if (this.obj.plan[key] != undefined) {
          planTxt += this.obj.plan[key] + 'x' + (key == '4' ? key : '2') + ' ';
        }
      }

      let posTxt = '';
      posTxt = `
        ${this.obj.l2_prop_limit.join(' ')} |
        ${this.obj.l4_prop_limit.join(' ')} |
        ${this.obj.l6_prop_limit.join(' ')}
        `;

      return {
        式神: this.obj.shishen,
        套装: planTxt,
        位置: posTxt,
        速度: speedTxt,
        暴击: critTxt,
      };
    },
  },
  methods: {
    ...mapMutations(['updateLoading']),
    calc() {
      this.$store.commit('updateLoading');
      this.$emit('updateCalcObj', 'yuhun_list', this.yuhunList);
      console.log('this.obj :', this.obj);
      axios
        .post('http://127.0.0.1:5000/calc', { ...this.obj })
        .then(({ data }) => {
          console.log(data);
          this.combo = data.res.info;
          this.$notify({ type: 'success', message: '计算完毕.' });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.$store.commit('updateLoading');
        });
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
