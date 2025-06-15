<template>
  <div class="nav-bar">导航栏</div>
  <div class="content-area">
    <div class="indicator-cards">
      <div class="indicator-card">
        <div class="indicator-title">今日警情</div>
        <div class="indicator-value">{{ todayAlarms }}</div>
      </div>
    </div>
    <button class="reset-btn" @click="resetView">深圳视角</button>
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

function resetView() {
  if (map) {
    map.setCenter(SZ_CENTER)
    map.setZoom(SZ_ZOOM)
  }
}

onMounted(() => {
  showIndicators.value = true
  // 初始化高德地图
  map = new window.AMap.Map('mapContainer', {
    center: SZ_CENTER, // 深圳中心
    zoom: SZ_ZOOM,
    mapStyle: 'amap://styles/dark' // 科技感黑色底图
  })

  // 集成深圳市高亮边界线
  fetch('/shenzhen_streets.json').then(res => res.json()).then(geojson => {
    geojson.features.forEach(feature => {
      const coords = feature.geometry.coordinates
      // 兼容MultiPolygon结构
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

  // 初始化Loca
  // const loca = new window.Loca.Container({
  //   map
  // })

  // // 深圳主要地铁站点（部分示例）
  // const stations = [
  //   [114.029, 22.609], // 深圳北站
  //   [114.055, 22.541], // 福田
  //   [114.117, 22.556], // 罗湖
  //   [113.930, 22.533], // 南山
  //   [113.883, 22.555], // 宝安中心
  //   [113.811, 22.639], // 机场东
  //   [114.246, 22.721], // 龙岗
  //   [114.236, 22.557]  // 盐田港
  // ]

  // // 自动生成流线数据（模拟地铁站点间流动）
  // const paths = []
  // for (let i = 0; i < stations.length; i++) {
  //   for (let j = 0; j < stations.length; j++) {
  //     if (i !== j) {
  //       paths.push([stations[i], stations[j]])
  //     }
  //   }
  // }
  // const data = paths.map(path => ({ coordinates: path }))

  // // 创建流动线图层
  // const lines = new window.Loca.PolylineLayer({
  //   loca,
  //   zIndex: 10
  // })
  // lines.setData(data, {
  //   lnglat: 'coordinates'
  // })
  // lines.setStyle({
  //   color: '#00eaff',
  //   borderWidth: 2,
  //   opacity: 0.7,
  //   lineType: 'solid',
  //   altitude: 0,
  //   dashArray: [10, 10],
  //   flowLength: 100,
  //   flowColor: '#ff9800',
  //   flowSpeed: 2
  // })
  // loca.add(lines)
  // loca.animate.start()

  // 加载并标记XX奶茶门店（SVG圆点icon方案）
  const iconSvg = 'data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="7" fill="%238d4fff" stroke="white" stroke-width="2"/></svg>';
  fetch('/xx_milktea.json').then(res => res.json()).then(stores => {
    stores.forEach(store => {
      const marker = new window.AMap.Marker({
        position: [store.lng, store.lat],
        icon: iconSvg,
        anchor: 'center',
        offset: new window.AMap.Pixel(0, 0)
      });
      marker.on('mouseover', function () {
        marker.setLabel({
          direction: 'top',
          offset: new window.AMap.Pixel(0, -28),
          content: store.name
        });
      });
      marker.on('mouseout', function () {
        marker.setLabel({ content: '' });
      });
      map.add(marker);
    });
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
