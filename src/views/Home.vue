<template>
  <div class="home">
    <van-panel title="首页" desc="这是首页"></van-panel>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Home',
  computed: {
    ...mapState(['username']),
  },
  mounted() {
    console.log('current user :', this.username);
  },
  components: {},
};
</script>
