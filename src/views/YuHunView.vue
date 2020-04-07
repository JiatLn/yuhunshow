<template>
  <div class="yuhun">
    <div class="upload">
      <van-panel title="上传御魂文件" desc="file like yuhun.json">
        <div @change="uploadFile" class="upload-input">
          <input type="file" accept=".json" />
        </div>
      </van-panel>
    </div>

    <van-divider>御魂列表</van-divider>
    <van-cell-group>
      <van-cell title="御魂总量" :value="yuhunList.length"></van-cell>
      <van-grid square>
        <van-grid-item
          v-for="(item, index) in yuhunCount"
          :key="index"
          :icon="item.icon"
          :text="`${item.name} ${item.count}`"
          :to="`/detail/${item.name}`"
        >
        </van-grid-item>
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import _ from 'lodash';
// import FileReader from 'file-saver';
// import { Base64 } from 'js-base64';

import { mapState, mapMutations } from 'vuex';

import yuhunMap from '@/data/yuhunMap';

export default {
  data() {
    return {
      yuhunMap,
    };
  },
  mounted() {
    this.updateYhCount();
  },
  computed: {
    ...mapState(['yuhunCount', 'yuhunList']),
  },
  methods: {
    ...mapMutations(['updateYhList', 'updateYhCount']),
    uploadFile(event) {
      console.log('file :', event.target.files[0]);
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        // this.result为读取到的json字符串，需转成json对象
        let yuhunJson = JSON.parse(reader.result).slice(1);
        if (yuhunJson.length > 0) {
          let username = file.name.split('.')[0];
          console.log('loaded yuhun data :', username);
          let yuhun = yuhunJson.map(item => this.fixItem(item));
          yuhun = yuhun.filter(item => item.info.level == 15 && item.info.star == 6);
          localStorage.setItem('yuhun', JSON.stringify(yuhun));
          localStorage.setItem('username', username);
          this.$store.commit('updateYhList', { yuhun, username });
          this.updateYhCount();
        }
      };

      // let username = file.file.name.split('.')[0];
      // let yuhun = file.content.replace('data:application/json;base64,', '');
      // yuhun = JSON.parse(Base64.decode(yuhun)).slice(1);
      // if (yuhun.length > 0) {
      //   console.log('loaded yuhun data :', username);
      //   yuhun = yuhun.map(item => this.fixItem(item));
      //   yuhun = yuhun.filter(item => item.info.level == 15 && item.info.star == 6);
      //   localStorage.setItem('yuhun', JSON.stringify(yuhun));
      //   localStorage.setItem('username', username);
      //   this.$store.commit('updateYhList', { yuhun, username });
      //   this.updateYhCount();
      // }
    },
    updateYhCount() {
      let yuhunCount = [];
      this.yuhunList.map(item => {
        let yuhunItem = _.find(yuhunCount, o => o.name == item.name);
        if (yuhunItem === undefined) {
          yuhunCount.push({
            name: item.name,
            count: 1,
            icon: _.find(yuhunMap, o => o.name == item.name).icon,
          });
        } else {
          yuhunItem.count += 1;
        }
      });
      this.$store.commit('updateYhCount', yuhunCount);
    },
    fixItem(item) {
      let newItem = {};
      let { 御魂类型, 位置, 御魂ID, 御魂等级: level, 御魂星级: star, ...attrs } = item;
      newItem.pos = 位置;
      newItem.name = 御魂类型;
      newItem.attrs = attrs;
      newItem.info = { 御魂ID, level, star };
      switch (newItem.pos) {
        case 1:
          newItem.mainAttr = '攻击';
          // newItem.attrs.攻击 -= 486;
          break;
        case 3:
          newItem.mainAttr = '防御';
          // newItem.attrs.防御 -= 104;
          break;
        case 5:
          newItem.mainAttr = '生命';
          // newItem.attrs.生命 -= 2052;
          break;
        default:
          if (newItem.attrs.速度 >= 57) {
            newItem.mainAttr = '速度';
            // newItem.attrs.速度 -= 57;
          }
          if (newItem.attrs.暴击伤害 >= 0.89) {
            newItem.mainAttr = '暴击伤害';
            // newItem.attrs.暴击伤害 -= 0.89;
          }
          if (newItem.attrs.暴击 >= 0.55) {
            newItem.mainAttr = '暴击';
            // newItem.attrs.暴击 -= 0.55;
          }
          if (newItem.attrs.攻击加成 >= 0.55) {
            newItem.mainAttr = '攻击加成';
            // newItem.attrs.攻击加成 -= 0.55;
          }
          if (newItem.attrs.生命加成 >= 0.55) {
            newItem.mainAttr = '生命加成';
            // newItem.attrs.生命加成 -= 0.55;
          }
          if (newItem.attrs.防御加成 >= 0.55) {
            newItem.mainAttr = '防御加成';
            // newItem.attrs.防御加成 -= 0.55;
          }
          if (newItem.attrs.效果命中 >= 0.55) {
            newItem.mainAttr = '效果命中';
            // newItem.attrs.效果命中 -= 0.55;
          }
          if (newItem.attrs.效果抵抗 >= 0.55) {
            newItem.mainAttr = '效果抵抗';
            // newItem.attrs.效果抵抗 -= 0.55;
          }
          break;
      }
      newItem.attrs = _.pickBy(newItem.attrs, item => item > 0);
      return newItem;
    },
  },
};
</script>

<style lang="less" scoped>
.yuhun {
  .upload .van-uploader {
    display: flex;
    justify-content: center;
    margin: 10px;
  }
  .upload-input {
    margin: 0 20px;
    padding: 16px 8px;
  }
}
</style>
