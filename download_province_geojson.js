const fs = require('fs');
const https = require('https');
const path = require('path');

const provinceCodeMap = {
  '北京市': '110000', '天津市': '120000', '河北省': '130000', '山西省': '140000', '内蒙古自治区': '150000',
  '辽宁省': '210000', '吉林省': '220000', '黑龙江省': '230000',
  '上海市': '310000', '江苏省': '320000', '浙江省': '330000', '安徽省': '340000', '福建省': '350000', '江西省': '360000', '山东省': '370000',
  '河南省': '410000', '湖北省': '420000', '湖南省': '430000', '广东省': '440000', '广西壮族自治区': '450000', '海南省': '460000',
  '重庆市': '500000', '四川省': '510000', '贵州省': '520000', '云南省': '530000', '西藏自治区': '540000',
  '陕西省': '610000', '甘肃省': '620000', '青海省': '630000', '宁夏回族自治区': '640000', '新疆维吾尔自治区': '650000',
  '香港特别行政区': '810000', '澳门特别行政区': '820000', '台湾省': '710000'
};

const saveDir = path.join(__dirname, 'frontend/public/province');
if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

const download = (url, dest) => new Promise((resolve, reject) => {
  https.get(url, res => {
    if (res.statusCode !== 200) return reject(res.statusCode);
    const file = fs.createWriteStream(dest);
    res.pipe(file);
    file.on('finish', () => file.close(resolve));
  }).on('error', reject);
});

(async () => {
  for (const [name, code] of Object.entries(provinceCodeMap)) {
    const url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`;
    const dest = path.join(saveDir, `${code}.json`);
    console.log(`下载 ${name} -> ${dest}`);
    try {
      await download(url, dest);
      console.log(`完成: ${name}`);
    } catch (e) {
      console.error(`失败: ${name}`, e);
    }
  }
})();