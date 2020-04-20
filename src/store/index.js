import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: 'default',
    yuhunList: [],
    yuhunCount: [],
    loading: false,
    yyx: {},
  },
  mutations: {
    updateYhList(state, data) {
      state.yuhunList = data.yuhun;
      state.username = data.username;
    },
    updateYhCount(state, data) {
      state.yuhunCount = data;
    },
    updateYYX(state, data) {
      state.yyx = data;
    },
    updateLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {},
  modules: {},
});
