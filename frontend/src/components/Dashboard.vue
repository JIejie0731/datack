<template>
  <div class="dashboard-grid" :style="{ backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="grid-topbar" card-id="1" card-name="顶部栏">
      <span class="topbar-title">物流中心运营监控大屏</span>
      <span class="topbar-time">
        {{ nowTime }}
        <span class="db-icon-wrapper">
          <span class="db-icon"
            @mouseenter="showTooltip = true"
            @mouseleave="showTooltip = false"
          >
            <DatabaseSuccess
              v-if="dbConnected"
              theme="multi-color"
              size="24"
              :fill="['#3a5153' ,'#62b1a9' ,'#FFF' ,'#62b1a9']"
            />
            <DatabaseAlert
              v-else
              theme="multi-color"
              size="24"
              :fill="['#3a5153' ,'#62b1a9' ,'#FFF' ,'#62b1a9']"
            />
          </span>
          <span v-if="showTooltip" class="db-tooltip">
            {{ dbConnected ? '数据库连接成功' : '数据库连接失败' }}
          </span>
        </span>
        <img
          :src="exitIcon"
          alt="退出"
          class="exit-icon"
          @click="handleExit"
          @mouseenter="showExitTooltip = true"
          @mouseleave="showExitTooltip = false"
        />
        <span v-if="showExitTooltip" class="exit-tooltip">退出</span>
      </span>
    </div>
    <div class="grid-left" card-id="2" card-name="左侧业务监控">
      <div class="frosted-card card1">
        <div class="metrics-row">
          <div class="metric-item">
            <div class="metric-title">库区出租率</div>
            <div class="metric-value"><span class="main-num">0.5</span><span class="metric-unit">%</span></div>
          </div>
          <div class="metric-item">
            <div class="metric-title">托位使用率</div>
            <div class="metric-value"><span class="main-num">1</span><span class="metric-unit">%</span></div>
          </div>
          <div class="metric-item">
            <div class="metric-title">入库箱数</div>
            <div class="metric-value"><span class="main-num">56</span><span class="metric-unit">万</span></div>
          </div>
          <div class="metric-item">
            <div class="metric-title">出库箱数</div>
            <div class="metric-value"><span class="main-num">18</span><span class="metric-unit">万</span></div>
          </div>
        </div>
      </div>
      <div class="frosted-card card2">
        <div class="card2-section">
          <div class="card2-title">
            <span class="card2-title-bar"></span>
            仓储业务运营监控
          </div>
          <div class="card2-metrics-row">
            <div class="card2-metric-title">运输单量</div>
            <div class="card2-metric-title">车辆数</div>
            <div class="card2-metric-title">客户数</div>
            <div class="card2-metric-title">运输公里</div>
          </div>
          <div class="card2-metrics-row">
            <div class="card2-metric-value">{{ metrics[0].value }}</div>
            <div class="card2-metric-value">{{ metrics[1].value }}</div>
            <div class="card2-metric-value">{{ metrics[2].value }}</div>
            <div class="card2-metric-value">{{ metrics[3].value }}</div>
          </div>
          <div class="card2-metrics-row">
            <div class="card2-metric-sub">
              环比上月
              <span :class="metrics[0].trend > 0 ? 'trend-up' : 'trend-down'">
                {{ metrics[0].trend > 0 ? '+' : '' }}{{ metrics[0].trend }}%
                <span v-if="metrics[0].trend > 0" class="arrow-up">▲</span>
                <span v-else class="arrow-down">▼</span>
              </span>
            </div>
            <div class="card2-metric-sub">
              环比上月
              <span :class="metrics[1].trend > 0 ? 'trend-up' : 'trend-down'">
                {{ metrics[1].trend > 0 ? '+' : '' }}{{ metrics[1].trend }}%
                <span v-if="metrics[1].trend > 0" class="arrow-up">▲</span>
                <span v-else class="arrow-down">▼</span>
              </span>
            </div>
            <div class="card2-metric-sub">
              环比上月
              <span :class="metrics[2].trend > 0 ? 'trend-up' : 'trend-down'">
                {{ metrics[2].trend > 0 ? '+' : '' }}{{ metrics[2].trend }}%
                <span v-if="metrics[2].trend > 0" class="arrow-up">▲</span>
                <span v-else class="arrow-down">▼</span>
              </span>
            </div>
            <div class="card2-metric-sub">
              环比上月
              <span :class="metrics[3].trend > 0 ? 'trend-up' : 'trend-down'">
                {{ metrics[3].trend > 0 ? '+' : '' }}{{ metrics[3].trend }}%
                <span v-if="metrics[3].trend > 0" class="arrow-up">▲</span>
                <span v-else class="arrow-down">▼</span>
              </span>
            </div>
          </div>
          <div class="ranking-section">
            <div class="ranking-title-row">
              <span class="ranking-title">发货地排行榜</span>
              <span class="ranking-unit">运输单量</span>
            </div>
            <div class="ranking-list">
              <!-- 固定前三名 -->
              <div class="ranking-item" v-for="(item, idx) in fixedList" :key="item.name">
                <span class="ranking-medal" :class="'medal-' + (idx+1)">
                  <span v-if="idx === 0">🏆</span>
                  <span v-else-if="idx === 1">🥈</span>
                  <span v-else-if="idx === 2">🥉</span>
                  <span v-else>{{ item.rank }}</span>
                </span>
                <span class="ranking-name">{{ item.name }}</span>
                <div class="ranking-bar-bg">
                  <div class="ranking-bar" :style="{ width: item.percent + '%' }"></div>
                </div>
                <span class="ranking-value">{{ item.value }}</span>
              </div>
              <!-- 滚动部分 -->
              <transition-group name="scroll" tag="div">
                <div class="ranking-item" v-for="item in scrollList" :key="item.name">
                  <span class="ranking-medal">{{ item.rank }}</span>
                  <span class="ranking-name">{{ item.name }}</span>
                  <div class="ranking-bar-bg">
                    <div class="ranking-bar" :style="{ width: item.percent + '%' }"></div>
                  </div>
                  <span class="ranking-value">{{ item.value }}</span>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-center" card-id="3" card-name="中间园区图"></div>
    <div class="grid-bottom-left" card-id="4" card-name="仓储库存监控">
      <div class="frosted-card card3">
        <div class="card3-section">
          <div class="card3-title">
            <span class="card3-title-bar"></span>
            仓储库存监控
          </div>
          <div class="card3-metrics-row">
            <div class="card3-metric-col">
              <div class="card3-metric-title">入库作业量</div>
              <div class="card3-metric-value">{{ stockMetrics[0].value }}</div>
              <div class="card3-metric-sub">
                环比上月
                <span class="card3-metric-sub-row" :class="stockMetrics[0].trend > 0 ? 'trend-up-red' : 'trend-down'">
                  {{ stockMetrics[0].trend }}% <span class="arrow-up">▲</span>
                </span>
              </div>
            </div>
            <div class="card3-metric-col">
              <div class="card3-metric-title">出库作业量</div>
              <div class="card3-metric-value">{{ stockMetrics[1].value }}</div>
              <div class="card3-metric-sub">
                环比上月
                <span class="card3-metric-sub-row" :class="stockMetrics[1].trend > 0 ? 'trend-up-red' : 'trend-down'">
                  {{ stockMetrics[1].trend }}% <span class="arrow-up">▲</span>
                </span>
              </div>
            </div>
            <div class="card3-metric-col">
              <div class="card3-metric-title">库存箱数</div>
              <div class="card3-metric-value">{{ stockMetrics[2].value }}</div>
              <div class="card3-metric-sub">
                环比上月
                <span class="card3-metric-sub-row" :class="stockMetrics[2].trend > 0 ? 'trend-up-red' : 'trend-down'">
                  {{ stockMetrics[2].trend }}% <span class="arrow-up">▲</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-bottom-center" card-id="5" card-name="视频监控">
      <div class="frosted-card card4">
        <div class="card4-section">
          <div class="card4-title">
            <span class="card4-title-bar"></span>
            物流园区视频监控
          </div>
          <div class="card4-metrics-row">
            <div class="card4-metric-title">总面积m²</div>
            <div class="card4-metric-title">出租面积m²</div>
            <div class="card4-metric-title">出租率</div>
          </div>
          <div class="card4-metrics-row">
            <div class="card4-metric-value">{{ parkMetrics[0].value }}</div>
            <div class="card4-metric-value">{{ parkMetrics[1].value }}</div>
            <div class="card4-metric-value">{{ parkMetrics[2].value }}</div>
          </div>
          <div class="card4-metrics-row">
            <div class="card4-metric-title">总客户数</div>
            <div class="card4-metric-title">总园区数</div>
            <div class="card4-metric-title">填仓率</div>
          </div>
          <div class="card4-metrics-row">
            <div class="card4-metric-value">{{ parkMetrics[3].value }}</div>
            <div class="card4-metric-value">{{ parkMetrics[4].value }}</div>
            <div class="card4-metric-value">{{ parkMetrics[5].value }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-bottom-right" card-id="6" card-name="自动化立库监控">
      <div class="frosted-card card5">
        <div class="card5-section">
          <div class="card5-title">
            <span class="card5-title-bar"></span>
            自动化立库运营监控
          </div>
          <div class="card5-table">
            <div class="card5-table-header">
              <div class="card5-th">堆垛机名称</div>
              <div class="card5-th">托盘号</div>
              <div class="card5-th">作业状态</div>
            </div>
            <div class="card5-table-body">
              <div class="card5-tr" v-for="row in pagedData" :key="row.name + row.tray">
                <div class="card5-td">
                  <span :class="flipState">{{ row.name }}</span>
                </div>
                <div class="card5-td">
                  <span :class="flipState">{{ row.tray }}</span>
                </div>
                <div class="card5-td">
                  <span :class="flipState">{{ row.status }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { DatabaseSuccess, DatabaseAlert } from '@icon-park/vue-next'
import axios from 'axios'
import bgImg from '@/assets/背景图.png'
import { useRouter } from 'vue-router'
import exitIcon from '@/assets/退出.png'

const nowTime = ref('')
const dbConnected = ref(false)
const showTooltip = ref(false)
const showExitTooltip = ref(false)
let timer = null
let dbTimer = null
const router = useRouter()

function updateTime() {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const s = String(now.getSeconds()).padStart(2, '0')
  nowTime.value = `${y}-${m}-${d} ${h}:${min}:${s}`
}

async function fetchDbStatus() {
  try {
    const res = await axios.get('/api/db-status')
    dbConnected.value = res.data.status === 'connected'
  } catch (e) {
    dbConnected.value = false
  }
}

const metrics = [
  { value: '24391', trend: -12.2 },
  { value: '3460', trend: -1.2 },
  { value: '628', trend: -4.3 },
  { value: '234671', trend: -2.3 }
]

const allList = ref([
  { rank: 1, name: 'SHHMHT01', value: '4.503万', percent: 100 },
  { rank: 2, name: 'HMNBSH01', value: '3.393万', percent: 75 },
  { rank: 3, name: 'SZHMJGZX', value: '1.821万', percent: 50 },
  { rank: 4, name: 'SHHMMD01', value: '6247', percent: 30 },
  { rank: 5, name: 'HFQDM', value: '5176', percent: 25 },
  { rank: 6, name: 'XHMJGZX001', value: '3431', percent: 18 },
  { rank: 7, name: 'SHHMXHY02', value: '2106', percent: 10 }
])
const fixedList = ref(allList.value.slice(0, 3))
const scrollList = ref(allList.value.slice(3, 7))
let scrollTimer = null

const stockMetrics = [
  { value: '24747', trend: 29.3 },
  { value: '8396', trend: 12.6 },
  { value: '2323021', trend: 2.9 }
]

const parkMetrics = [
  { value: '163,058,696' },
  { value: '-' },
  { value: '52.4%' },
  { value: '48' },
  { value: '10' },
  { value: '62.0%' }
]

const stackerTableData = ref([
  { name: 'CRN2-1', tray: 'MS003IJN20241221IR175', status: '出库中' },
  { name: 'CRN2-2', tray: 'LE001IJN20250110IR326', status: '入库中' },
  { name: 'CRN2-3', tray: '-', status: '闲置中' },
  { name: 'CRN2-4', tray: '-', status: '闲置中' },
  { name: 'CRN2-5', tray: 'MS003IJN20240101IR001', status: '出库中' },
  { name: 'CRN2-6', tray: 'LE001IJN20240102IR002', status: '入库中' },
  { name: 'CRN2-7', tray: '-', status: '闲置中' },
  { name: 'CRN2-8', tray: '-', status: '闲置中' },
  { name: 'CRN2-9', tray: 'MS003IJN20240103IR003', status: '出库中' },
  { name: 'CRN2-10', tray: 'LE001IJN20240104IR004', status: '入库中' }
])
const pageSize = 4
const currentPage = ref(0)
const pagedData = ref([])
const flipState = ref('') // '', 'flip-out', 'flip-in'
let tableTimer = null
function updatePagedData() {
  pagedData.value = stackerTableData.value.slice(currentPage.value * pageSize, currentPage.value * pageSize + pageSize)
}
function flipToNextPage() {
  flipState.value = 'flip-out'
  setTimeout(() => {
    currentPage.value = (currentPage.value + 1) % Math.ceil(stackerTableData.value.length / pageSize)
    updatePagedData()
    flipState.value = 'flip-in'
    setTimeout(() => {
      flipState.value = ''
    }, 400)
  }, 400)
}

function handleExit() {
  router.push('/portfolio')
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  fetchDbStatus()
  dbTimer = setInterval(fetchDbStatus, 5000) // 每5秒轮询一次
  scrollTimer = setInterval(() => {
    const first = scrollList.value.shift()
    scrollList.value.push(first)
  }, 2000)
  updatePagedData()
  tableTimer = setInterval(flipToNextPage, 3000)
})
onUnmounted(() => {
  clearInterval(timer)
  clearInterval(dbTimer)
  clearInterval(scrollTimer)
  clearInterval(tableTimer)
})
</script>

<style scoped>
/* 大屏主布局区域 */
.dashboard-grid {
  width: 100vw; /* 占满整个视口宽度 */
  height: 100vh; /* 占满整个视口高度 */
  display: grid; /* 使用CSS Grid布局 */
  grid-template-rows: 80px 1fr 240px; /* 顶部栏、内容区、底部卡片区的高度 */
  grid-template-columns: 420px 1fr 1fr; /* 左侧、中心、右侧的宽度比例 */
  grid-template-areas:
    "topbar topbar topbar"
    "left center center"
    "bottom-left bottom-center bottom-right";
  color: #fff;
  box-sizing: border-box;
  overflow: hidden;
  gap: 0;
}

/* 顶部栏样式 */
.grid-topbar {
  grid-area: topbar;
  /* border: 2px solid #3b5cff; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 1.4rem;
  font-weight: bold;
  background: rgba(21,37,53,0.12); /* 半透明深色背景 */
  box-sizing: border-box;
  backdrop-filter: blur(12px); /* 毛玻璃效果 */
  -webkit-backdrop-filter: blur(12px);
}
.topbar-title {
  flex: 1;
  text-align: left;
}
.topbar-time {
  font-size: 1.2rem;
  font-weight: normal;
  opacity: 0.85;
  text-align: right;
}

/* 左侧业务监控区块 */
.grid-left {
  grid-area: left;
  /* background: #23272e; */
  display: flex;
  flex-direction: column; /* 垂直排列子元素 */
  justify-content: flex-start;
  align-items: stretch;
  padding: 10px 5px 10px 5px; /* 上右下左内边距 */
  box-sizing: border-box;
  gap: 0;
}

/* 中间园区图区块 */
.grid-center {
  grid-area: center;
  /* background: #23272e; */
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

/* 底部三个卡片区块 */
.grid-bottom-left,
.grid-bottom-center,
.grid-bottom-right {
  display: flex;
  align-items: stretch;
  padding: 0px 5px 5px 5px; /* 上右下左内边距 */

  justify-content: stretch;
}
.grid-bottom-left {
  grid-area: bottom-left;
  /* background: #23272e; */
  box-sizing: border-box;
}
.grid-bottom-center {
  grid-area: bottom-center;
  /* background: #23272e; */
  box-sizing: border-box;
}
.grid-bottom-right {
  grid-area: bottom-right;
  /* background: #23272e; */
  box-sizing: border-box;
}

/* 毛玻璃卡片通用样式 */
.frosted-card {
  height: 100%;
  width: 100%;
  min-height: unset;
  border-radius: 8px;
  padding: 24px;
  box-sizing: border-box;
  background: rgba(30,32,38,0.35);
  box-shadow: 0 4px 24px #0002;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

/* 左侧两个卡片自定义高度 */
.card1 {
  height: 100px;
}
.card2 {
  height: 380px;
  margin-top: 10px;
}

/* 数据库状态图标及提示 */
.db-icon-wrapper {
  position: relative;
  display: inline-block;
}
.db-icon {
  margin-left: 16px;
  vertical-align: middle;
  cursor: pointer;
}
.db-tooltip {
  position: absolute;
  left: 50%;
  top: 120%;
  transform: translateX(-50%);
  background: #222;
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
  z-index: 100;
  box-shadow: 0 2px 8px #0003;
  pointer-events: none;
}

.metrics-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
  margin: 0 8px;
}
.metric-title {
  font-size: 0.85rem;
  color: #cfd8dc;
  margin-bottom: 1px;
  letter-spacing: 1px;
}
.metric-value {
  display: flex;
  align-items: flex-end;
}
.main-num {
  font-size: 2.2rem;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  margin-right: 2px;
  letter-spacing: 2px;
}
.metric-unit {
  font-size: 1.1rem;
  color: #cfd8dc;
  margin-bottom: 2px;
}

.section-title {
  font-size: 1.15rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.section-bar {
  width: 6px;
  height: 22px;
  background: linear-gradient(180deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 3px;
  margin-right: 10px;
}
.section-metrics-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.section-metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  margin: 0 8px;
}
.metric-title {
  font-size: 0.85rem;
  color: #cfd8dc;
  margin-bottom: 1px;
  letter-spacing: 1px;
}
.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 2px;
}
.metric-sub {
  font-size: 0.9rem;
  color: #b0bec5;
}
.trend-up {
  color: #00eaff;
  margin-left: 4px;
}
.trend-down {
  color: #4caf50;
  margin-left: 4px;
}
.arrow-up {
  color: #00eaff;
  font-size: 0.8em;
  margin-left: 2px;
}
.arrow-down {
  color: #4caf50;
  font-size: 0.8em;
  margin-left: 2px;
}
.ranking-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 4px 0;
}
.ranking-title {
  font-size: 1.05rem;
  color: #fff;
  font-weight: bold;
}
.ranking-unit {
  font-size: 0.95rem;
  color: #b0bec5;
}
.ranking-list {
  margin-top: 2px;
}
.ranking-item {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.ranking-medal {
  width: 28px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
}
.medal-1 { color: gold; }
.medal-2 { color: silver; }
.medal-3 { color: #cd7f32; }
.ranking-name {
  width: 90px;
  color: #fff;
  font-size: 1rem;
  margin-right: 8px;
  margin-left: 2px;
}
.ranking-bar-bg {
  flex: 1;
  height: 4px;
  background: #2e3540;
  border-radius: 2px;
  margin: 0 8px;
  position: relative;
}
.ranking-bar {
  height: 100%;
  background: linear-gradient(90deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 2px;
}
.ranking-value {
  width: 60px;
  text-align: right;
  color: #fff;
  font-size: 1rem;
  margin-left: 8px;
}
.card2-content {
  display: flex;
  height: 100%;
}
.card2-metrics {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 2px solid #ffb300;
  padding-right: 24px;
}
.card2-ranking {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
}
.card2-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.card2-title {
  font-size: 1.08rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
}
.card2-title-bar {
  width: 8px;
  height: 28px;
  background: linear-gradient(180deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 3px;
  margin-right: 12px;
}
.card2-metrics-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}
.card2-metric-title, .card2-metric-value, .card2-metric-sub {
  flex: 1;
  text-align: center;
}
.card2-metric-title {
  font-size: 0.85rem;
  color: #b0bec5;
  margin-bottom: 2px;
  letter-spacing: 1px;
}
.card2-metric-value {
  font-size: 1.35rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.card2-metric-sub {
  font-size: 0.82rem;
  color: #b0bec5;
}
.ranking-section {
  margin-top: 8px;
}
.ranking-title {
  font-size: 0.92rem;
}
.ranking-unit {
  font-size: 0.82rem;
}
.ranking-name, .ranking-value {
  font-size: 0.85rem;
}
.ranking-medal {
  font-size: 1.05rem;
}
.scroll-enter-active, .scroll-leave-active {
  transition: all 0.5s;
}
.scroll-enter-from, .scroll-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.card3-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.card3-title {
  font-size: 1.08rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
}
.card3-title-bar {
  width: 8px;
  height: 28px;
  background: linear-gradient(180deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 3px;
  margin-right: 12px;
}
.card3-metrics-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  gap: 0;
}
.card3-metric-col {
  flex: 1 1 0;
  min-width: 0;
  max-width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.card3-metric-title,
.card3-metric-value,
.card3-metric-sub {
  width: 100%;
  text-align: center;
  word-break: break-all;
}
.card3-metric-title {
  font-size: 0.85rem;
  color: #b0bec5;
  margin-bottom: 2px;
  letter-spacing: 1px;
}
.card3-metric-value {
  font-size: 1.35rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.card3-metric-sub {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.82rem;
  color: #b0bec5;
}
.card3-metric-sub-row {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-top: 2px;
}
.trend-up-red {
  color: #ff4d4f;
  margin-left: 4px;
}
.arrow-up {
  color: #ff4d4f;
  font-size: 0.9em;
  margin-left: 2px;
}
.card4-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.card4-title {
  font-size: 1.08rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
}
.card4-title-bar {
  width: 8px;
  height: 28px;
  background: linear-gradient(180deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 3px;
  margin-right: 12px;
}
.card4-metrics-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
}
.card4-metric-title, .card4-metric-value {
  flex: 1;
  text-align: center;
}
.card4-metric-title {
  font-size: 0.85rem;
  color: #b0bec5;
  margin-bottom: 2px;
  letter-spacing: 1px;
}
.card4-metric-value {
  font-size: 1.35rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.card5-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.card5-title {
  font-size: 1.08rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 2px;
}
.card5-title-bar {
  width: 8px;
  height: 28px;
  background: linear-gradient(180deg, #00eaff 0%, #62b1a9 100%);
  border-radius: 3px;
  margin-right: 12px;
}
.card5-table { width: 100%; }
.card5-table-header, .card5-tr { display: flex; justify-content: center; align-items: center; }
.card5-th, .card5-td { flex: 1; color: #fff; padding: 4px 0; }
.card5-th { font-size: 0.82rem; font-weight: 500; text-align: center; }
.card5-td { font-size: 0.92rem; font-weight: 500; }
.card5-td:first-child { text-align: left; padding-left: 12px; }
.card5-td:last-child { text-align: right; padding-right: 12px; }
.card5-td:nth-child(2) { text-align: center; }
.table-fade-enter-active, .table-fade-leave-active { transition: all 0.5s; }
.table-fade-enter-from, .table-fade-leave-to { opacity: 0; transform: translateY(20px); }

.flip-out {
  display: inline-block;
  animation: flipOut 0.4s forwards;
  transform-origin: center bottom;
}
.flip-in {
  display: inline-block;
  animation: flipIn 0.4s forwards;
  transform-origin: center top;
}
@keyframes flipOut {
  0% { transform: rotateX(0); opacity: 1; }
  100% { transform: rotateX(90deg); opacity: 0; }
}
@keyframes flipIn {
  0% { transform: rotateX(-90deg); opacity: 0; }
  100% { transform: rotateX(0); opacity: 1; }
}

.exit-icon {
  width: 28px;
  height: 28px;
  margin-left: 18px;
  cursor: pointer;
  vertical-align: middle;
  transition: filter 0.2s;
  filter: brightness(0.95) grayscale(0.2);
}
.exit-icon:hover {
  filter: brightness(1.2) grayscale(0);
}
.exit-tooltip {
  position: absolute;
  right: 0;
  top: 120%;
  background: #222;
  color: #fff;
  padding: 4px 14px;
  border-radius: 6px;
  font-size: 0.95rem;
  white-space: nowrap;
  z-index: 100;
  box-shadow: 0 2px 8px #0003;
  pointer-events: none;
  margin-right: 8px;
}
</style>
