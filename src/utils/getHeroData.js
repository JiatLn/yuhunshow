import axios from 'axios';
import { HeroList } from '../data/hero';

const fs = require('fs'); // 引入fs模块

let heroIdList = HeroList.map(item => item.id);

let url = 'https://g37simulator.webapp.163.com/get_hero_attr';

let resList = [];
(async function() {
  for (const id of heroIdList) {
    console.log('loading:', id);
    let res = await axios.get(url, {
      params: {
        heroid: Number(id),
        awake: 0,
        level: 40,
        star: 6,
      },
    });
    resList.push(res.data);
  }
  fs.writeFile('heroData.json', JSON.stringify(resList), { flag: 'a' }, () => {});
})();
