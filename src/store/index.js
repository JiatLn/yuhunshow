import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: 'default',
    yuhunList: [],
    yuhunCount: [],
    loading: false,
  },
  mutations: {
    updateYhList(state, data) {
      state.yuhunList = data.yuhun;
      state.username = data.username;
    },
    updateYhCount(state, data) {
      state.yuhunCount = data;
    },
    isLoading(state) {
      state.loading = !state.loading;
      console.log('isLoading :', state.loading);
    },
  },
  actions: {},
  modules: {},
});
