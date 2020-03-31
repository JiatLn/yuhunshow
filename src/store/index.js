import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: 'default',
    yuhunList: [],
    yuhunCount: [],
  },
  mutations: {
    updateYhList(state, data) {
      state.yuhunList = data.yuhun;
      state.username = data.username;
    },
    updateYhCount(state, data) {
      state.yuhunCount = data;
    },
  },
  actions: {},
  modules: {},
});
