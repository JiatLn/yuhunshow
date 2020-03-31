import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Me from '@/views/Me.vue';
import YuHunView from '@/views/YuHunView';
import YuHunDetail from '@/views/YuHunDetail';
import YuHunCalc from '@/views/YuHunCalc';

import Router from 'vue-router';

Vue.use(VueRouter);
Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/me',
    name: 'me',
    component: Me,
  },
  {
    path: '/yuhun',
    name: 'yuhun',
    component: YuHunView,
  },
  {
    path: '/detail/:yuhunName',
    name: 'detail',
    component: YuHunDetail,
    props: true,
  },
  {
    path: '/calc',
    name: 'calc',
    component: YuHunCalc,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  // 滚动行为 对于所有路由导航，简单地让页面滚动到顶部。
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
