<template>
  <div class="nav-bar">
    导航栏
    <div class="district-btns">
      <button class="district-btn" @click="resetView">深圳视角</button>
      <button v-for="district in districtList" :key="district" class="district-btn" @click="() => focusDistrict(district)">{{ district }}</button>
      <button class="district-btn" @click="toggleMapTheme">{{ mapTheme === 'dark' ? '切换白色' : '切换黑色' }}</button>
      <button class="district-btn" @click="toggleCards">{{ showCards ? '隐藏卡片' : '显示卡片' }}</button>
    </div>
  </div>
  <div class="content-area">
    <div v-if="showCards" class="indicator-cards">
      <div class="indicator-card">
        <div class="indicator-title">今日警情</div>
        <div class="indicator-value">{{ todayAlarms }}</div>
      </div>
    </div>
    <div id="mapContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

let map = null
const SZ_CENTER = [114.113322, 22.648867]
const SZ_ZOOM = 11

const todayAlarms = ref(12) // 示例数据，可替换为实际接口
const showIndicators = ref(false)
const showCards = ref(true) // 卡片显示状态
let allMarkers = [] // 保存所有marker
let allStores = [] // 保存所有门店数据
let districtCenters = {} // 保存各区中心点
let districtPolygons = {} // 保存各区边界多边形
const mapTheme = ref('dark') // 当前主题

// 手动设置的区中心点（如有）
const manualDistrictCenters = {
  '南山区': [113.9305, 22.5332],
  '福田区': [114.055, 22.522],
  '罗湖区': [114.123, 22.555],
  '宝安区': [113.883, 22.555],
  '龙岗区': [114.246, 22.721],
  '龙华区': [114.029, 22.609],
  '盐田区': [114.236, 22.557],
  '光明区': [113.935, 22.748],
  '坪山区': [114.346, 22.690],
  '大鹏新区': [114.480, 22.590]
}

const districtList = [
  '南山区', '福田区', '罗湖区', '宝安区', '龙岗区', '龙华区', '盐田区', '光明区', '坪山区', '大鹏新区'
]

// 区名与高对比度颜色映射
const DISTRICT_COLORS = {
  '南山区': '#e6194b', // 鲜红
  '福田区': '#3cb44b', // 鲜绿
  '罗湖区': '#ffe119', // 鲜黄
  '宝安区': '#4363d8', // 鲜蓝
  '龙岗区': '#f58231', // 橙色
  '龙华区': '#911eb4', // 紫色
  '盐田区': '#46f0f0', // 青色
  '光明区': '#f032e6', // 粉紫
  '坪山区': '#bcf60c', // 黄绿
  '大鹏新区': '#fabebe'  // 粉红
}
function getDistrictColorByDistrict(district) {
  return DISTRICT_COLORS[district] || '#888888'
}

function resetView() {
  if (map) {
    map.setCenter(SZ_CENTER)
    map.setZoom(SZ_ZOOM)
    // 恢复显示全部门店
    allMarkers.forEach(marker => marker.setMap(map))
  }
}

function focusDistrict(district) {
  if (map) {
    // 只显示对应区门店
    allMarkers.forEach((marker, idx) => {
      const store = allStores[idx]
      if (store.district === district) {
        marker.setMap(map)
      } else {
        marker.setMap(null)
      }
    })
  }
}

function toggleMapTheme() {
  if (mapTheme.value === 'dark') {
    mapTheme.value = 'light'
    map.setMapStyle('amap://styles/whitesmoke') // 高德官方白色主题
  } else {
    mapTheme.value = 'dark'
    map.setMapStyle('amap://styles/dark')
  }
}

function toggleCards() {
  showCards.value = !showCards.value
}

onMounted(() => {
  showIndicators.value = true
  // 初始化高德地图
  map = new window.AMap.Map('mapContainer', {
    center: SZ_CENTER, // 深圳中心
    zoom: SZ_ZOOM,
    mapStyle: 'amap://styles/dark'
  })

  // 集成深圳市高亮边界线，并提取各区中心点和边界
  fetch('/shenzhen_streets.json').then(res => res.json()).then(geojson => {
    geojson.features.forEach(feature => {
      const name = feature.properties.name
      const center = manualDistrictCenters[name] || feature.properties.center || feature.properties.centroid
      if (name && center) {
        districtCenters[name] = center
      }
      // 保存边界多边形
      const coords = feature.geometry.coordinates
      let path = []
      coords.forEach(polygon => {
        polygon.forEach(ring => {
          path.push(ring.map(([lng, lat]) => [lng, lat]))
        })
      })
      districtPolygons[name] = path
      // 画边界
      coords.forEach(polygon => {
        polygon.forEach(ring => {
          const path = ring.map(([lng, lat]) => [lng, lat])
          const border = new window.AMap.Polygon({
            path,
            strokeColor: '#ff9800', // 高亮橙色
            strokeWeight: 4,
            fillOpacity: 0,
            strokeOpacity: 1,
            zIndex: 20
          })
          map.add(border)
        })
      })
    })
  })

  // 加载并标记小米之家门店（紫色圆点icon方案）
  fetch('/xiaomi_shops_sz.json').then(res => res.json()).then(stores => {
    const storesArr = Array.isArray(stores) ? stores : (stores.data && stores.data.stores) || [];
    allStores = storesArr
    allMarkers = storesArr.map(store => {
      const lat = parseFloat(store.position.lat);
      const lng = parseFloat(store.position.lng);
      if (!isNaN(lat) && !isNaN(lng)) {
        const color = getDistrictColorByDistrict(store.district)
        const iconSvg = `data:image/svg+xml;utf8,<svg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"10\" cy=\"10\" r=\"7\" fill=\"${color.replace('#','%23')}\" stroke=\"white\" stroke-width=\"2\"/></svg>`;
        const marker = new window.AMap.Marker({
          position: [lng, lat],
          icon: iconSvg,
          anchor: 'center',
          offset: new window.AMap.Pixel(0, 0)
        });
        marker.on('mouseover', function () {
          marker.setLabel({
            direction: 'top',
            offset: new window.AMap.Pixel(0, -28),
            content: store.store_name
          });
        });
        marker.on('mouseout', function () {
          marker.setLabel({ content: '' });
        });
        map.add(marker);
        return marker;
      }
      return null;
    }).filter(Boolean);
  });
})
</script>

<style scoped>
.nav-bar {
  width: 100vw;
  height: 64px;
  border: 2px dashed #00eaff;
  background: #f8fbff;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  color: #232b3a;
  font-weight: bold;
  box-sizing: border-box;
  position: relative;
}
.district-btns {
  display: flex;
  gap: 12px;
  margin-left: 32px;
}
.district-btn {
  background: #232b3a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: background 0.2s;
}
.district-btn:hover {
  background: #00eaff;
  color: #232b3a;
}
.content-area {
  width: 100vw;
  height: calc(100vh - 64px);
  border: 2px dashed #ff9800;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 0;
  margin: 0;
  position: relative;
}
#mapContainer {
  width: 100%;
  height: 100%;
}
.reset-btn {
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 1000;
  background: #232b3a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: background 0.2s;
}
.reset-btn:hover {
  background: #00eaff;
  color: #232b3a;
}
.nanshan-btn {
  position: absolute;
  top: 16px;
  right: 140px;
  z-index: 1000;
  background: #232b3a;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: background 0.2s;
}
.nanshan-btn:hover {
  background: #00eaff;
  color: #232b3a;
}
.indicator-cards {
  position: absolute;
  top: 8px;
  left: 24px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: indicatorFadeIn 2s cubic-bezier(.55,0,.1,1) 1;
}
.indicator-card {
  min-width: 350px;
  height: 300px;
  padding: 5px 20px 5px 20px;

  background: rgba(34, 40, 49, 0.85);
  color: #fff;

  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.indicator-title {
  font-size: 14px;
  color: #00eaff;
  margin-bottom: 6px;
}
.indicator-value {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 1px;
}
.indicator-fade-slide-enter-active {
  transition: all 0.7s cubic-bezier(.55,0,.1,1);
}
.indicator-fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-40px) scale(0.95);
}
.indicator-fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}
@keyframes indicatorFadeIn {
  0% {
    opacity: 0;
    transform: translateX(-40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
.milktea-dot {
  width: 14px;
  height: 14px;
  background: #8d4fff;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px #8d4fff99;
  cursor: pointer;
}
.milktea-label {
  color: #fff;
  background: #8d4fff;
  border-radius: 6px;
  padding: 4px 14px;
  font-size: 15px;
  font-weight: bold;
  border: 1.5px solid #fff;
  box-shadow: 0 2px 8px #8d4fff44;
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.98;
}
</style>
