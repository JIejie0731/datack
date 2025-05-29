<template>
  <div style="padding: 40px; text-align: center;">
    <h2>数据库连接测试</h2>
    <div style="margin-top: 32px;">
      <span :style="{
        display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', marginRight: '8px',
        background: dbStatus === 'connected' ? '#00d26a' : (dbStatus === 'checking' ? '#ffb300' : '#ff3b3b')
      }"></span>
      <span>
        {{ dbStatus === 'connected' ? '连接成功' : (dbStatus === 'checking' ? '检测中...' : '连接失败') }}
      </span>
    </div>
    <button @click="checkDb" style="margin-top: 24px; padding: 8px 24px;">重新检测</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const dbStatus = ref('checking');

async function checkDb() {
  dbStatus.value = 'checking';
  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/db-status`);
    const data = await res.json();
    dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
  } catch (e) {
    dbStatus.value = 'error';
  }
}

checkDb();

// 动态加载地图geoJSON（本地化中国地图）
async function loadMap(mapName, provinceName = '') {
  if (!echarts.getMap(mapName)) {
    let url = '';
    if (mapName === 'china') {
      url = '/china.json'; // 本地geojson
    } else {
      // 省份依然用阿里云（如需本地化可继续扩展）
      const provinceCodeMap = {
        '北京市': '110000', '天津市': '120000', '河北省': '130000', '山西省': '140000', '内蒙古自治区': '150000',
        '辽宁省': '210000', '吉林省': '220000', '黑龙江省': '230000',
        '上海市': '310000', '江苏省': '320000', '浙江省': '330000', '安徽省': '340000', '福建省': '350000', '江西省': '360000', '山东省': '370000',
        '河南省': '410000', '湖北省': '420000', '湖南省': '430000', '广东省': '440000', '广西壮族自治区': '450000', '海南省': '460000',
        '重庆市': '500000', '四川省': '510000', '贵州省': '520000', '云南省': '530000', '西藏自治区': '540000',
        '陕西省': '610000', '甘肃省': '620000', '青海省': '630000', '宁夏回族自治区': '640000', '新疆维吾尔自治区': '650000',
        '香港特别行政区': '810000', '澳门特别行政区': '820000', '台湾省': '710000'
      };
      const code = provinceCodeMap[provinceName];
      if (!code) {
        alert('暂不支持该省下钻');
        return;
      }
      url = `https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${code}_full`;
    }
    const res = await fetch(url);
    const geoJson = await res.json();
    echarts.registerMap(mapName, geoJson);
  }
}
</script>

<style scoped>
button {
  background: #2257f4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #1a3fa0;
}
</style>