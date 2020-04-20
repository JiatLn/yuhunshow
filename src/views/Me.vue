<template>
  <div id="me">
    <van-panel :title="player.name" :desc="getServerName()" :status="'等级 ' + player.level" />
    <asset-com></asset-com>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AssetCom from '@/components/Me/AssetCom';

import { serverList } from '@/data/server';

export default {
  components: {
    AssetCom,
  },
  computed: {
    ...mapState(['yyx']),
    player() {
      return this.yyx.data.player;
    },
  },
  methods: {
    getServerName() {
      let server = serverList.filter(item => item.id == this.player.server_id);
      return server[0].name + ' #' + this.player.id;
    },
  },
};
</script>

<style lang="less" scoped>
#me {
  span {
    // margin: 20px 10px;
    text-align: center;
  }
}
</style>
