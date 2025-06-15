<template>
    <div class="wuliu-dashboard" :style="{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}">
      <div class="navbar">
        <div class="navbar-left">
          <div class="navbar-title">物流中心运营监控大屏</div>
          <div class="navbar-subtitle">Large screen for logistics operation monitoring</div>
        </div>
        <div class="navbar-time">{{ nowTime }}</div>
        <a class="btn" href="#" @click.prevent="goBack">← Go Back</a>
      </div>
      <div class="section section1">
        <div class="card-a">
          <div class="card-a1">
            <div class="a1-metrics-title-row">
              <div class="a1-metric-title">库区出租率</div>
              <div class="a1-metric-title">托位使用率</div>
              <div class="a1-metric-title">入库箱数</div>
              <div class="a1-metric-title">出库箱数</div>
            </div>
            <div class="a1-metrics-value-row">
              <div class="a1-metric-value"><span class="a1-main-num">0.5</span><span class="a1-metric-unit">%</span></div>
              <div class="a1-metric-value"><span class="a1-main-num">1</span><span class="a1-metric-unit">%</span></div>
              <div class="a1-metric-value"><span class="a1-main-num">56</span><span class="a1-metric-unit">万</span></div>
              <div class="a1-metric-value"><span class="a1-main-num">18</span><span class="a1-metric-unit">万</span></div>
            </div>
          </div>
          <div class="card-a2">
            <div class="a2-title-row">
              <IconTitleBar />
              仓储业务运营监控
            </div>
            <div class="a2-metrics-title-row">
              <div class="a2-metric-title">运输单量</div>
              <div class="a2-metric-title">车辆数</div>
              <div class="a2-metric-title">客户数</div>
              <div class="a2-metric-title">运输公里</div>
            </div>
            <div class="a2-metrics-value-row">
              <div class="a2-metric-value">24,391</div>
              <div class="a2-metric-value">3,460</div>
              <div class="a2-metric-value">628</div>
              <div class="a2-metric-value">234,671</div>
            </div>
  
            <div class="a2-metrics-title-row">
              <div class="a2-metric-title">环比上月</div>
              <div class="a2-metric-title">环比上月</div>
              <div class="a2-metric-title">环比上月</div>
              <div class="a2-metric-title">环比上月</div>
            </div>
  
            <div class="a2-metrics-value-row">
              <div class="a2-metric-value a2-metric-value-huanbi">
                <span class="huanbi-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 10l-4-4h8z" fill="#2be282"/></svg>
                </span>
                -12.2%
              </div>
              <div class="a2-metric-value a2-metric-value-huanbi">
                <span class="huanbi-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 10l-4-4h8z" fill="#2be282"/></svg>
                </span>
                -1.2%
              </div>
              <div class="a2-metric-value a2-metric-value-huanbi">
                <span class="huanbi-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 10l-4-4h8z" fill="#2be282"/></svg>
                </span>
                -4.3%
              </div>
              <div class="a2-metric-value a2-metric-value-huanbi">
                <span class="huanbi-icon">
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 10l-4-4h8z" fill="#2be282"/></svg>
                </span>
                -2.3%
              </div>
            </div>
  
            <!-- 新增ECharts排行榜 -->
            <div class="a2-ranking-echart">
              <div class="a2-ranking-header">
                <span>发货地排行榜</span>
                <span class="a2-ranking-unit">运输单量</span>
              </div>
              <v-chart :option="barOption" autoresize style="height: 100%; width: 100%;" />
            </div>
  
          </div>
        </div>
        <div class="card-b"></div>
      </div>
      <div class="section section2">
        <div class="card-c"><div class="card-c1">
          <div class="c1-title-row">
            <IconTitleBar />
            仓储库存监控
          </div>
          <div class="c1-metrics-row">
            <div class="c1-metric-block">
              <div class="c1-metric-title">入库作业量(箱)</div>
              <div class="c1-metric-value">24,747</div>
              <div class="c1-metric-huanbi-label">环比上月</div>
              <div class="c1-metric-huanbi-value up">
                29.3%
                <svg width="14" height="14" viewBox="0 0 14 14" style="vertical-align: middle; transform: none;"><polygon points="7,4 12,10 2,10" fill="#ff4d4f"/></svg>
              </div>
            </div>
            <div class="c1-metric-block">
              <div class="c1-metric-title">出库作业量(箱)</div>
              <div class="c1-metric-value">8,396</div>
              <div class="c1-metric-huanbi-label">环比上月</div>
              <div class="c1-metric-huanbi-value up">
                12.6%
                <svg width="14" height="14" viewBox="0 0 14 14" style="vertical-align: middle; transform: none;"><polygon points="7,4 12,10 2,10" fill="#ff4d4f"/></svg>
              </div>
            </div>
            <div class="c1-metric-block">
              <div class="c1-metric-title">库存箱数(箱)</div>
              <div class="c1-metric-value">2,323,0</div>
              <div class="c1-metric-huanbi-label">环比上月</div>
              <div class="c1-metric-huanbi-value up">
                2.9%
                <svg width="14" height="14" viewBox="0 0 14 14" style="vertical-align: middle; transform: none;"><polygon points="7,4 12,10 2,10" fill="#ff4d4f"/></svg>
              </div>
            </div>
          </div>
        </div></div>
        <div class="card-d"><div class="card-d1">
          <div class="d1-title-row">
            <IconTitleBar />
            物流园区视频监控
          </div>
          <div class="d1-metrics-table">
            <div class="d1-metrics-row">
              <div class="d1-metric-block">
                <div class="d1-metric-title">总面积m²</div>
                <div class="d1-metric-value">163,058,696</div>
              </div>
              <div class="d1-metric-block">
                <div class="d1-metric-title">出租面积m²</div>
                <div class="d1-metric-value">-</div>
              </div>
              <div class="d1-metric-block">
                <div class="d1-metric-title">出租率</div>
                <div class="d1-metric-value">52.4%</div>
              </div>
            </div>
            <div class="d1-metrics-row">
              <div class="d1-metric-block">
                <div class="d1-metric-title">总客户数</div>
                <div class="d1-metric-value">48</div>
              </div>
              <div class="d1-metric-block">
                <div class="d1-metric-title">总园区数</div>
                <div class="d1-metric-value">10</div>
              </div>
              <div class="d1-metric-block">
                <div class="d1-metric-title">填仓率</div>
                <div class="d1-metric-value">62.0%</div>
              </div>
            </div>
          </div>
        </div></div>
        <div class="card-e"><div class="card-e1">
          <div class="e1-title-row">
            <IconTitleBar />
            自动化立库运营监控
          </div>
          <div class="e1-table-box" ref="e1TableBox">
            <a-table
              :columns="e1Columns"
              :data="e1Data"
              :pagination="false"
              size="small"
              class="e1-table"
              :row-style="() => ({ height: rowHeight })"
            />
          </div>
        </div></div>
      </div>
    </div>
  </template>
  


  <script setup>
  import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
  import { useRouter } from 'vue-router'
  import bgImg from '@/assets/背景图.png'
  import IconTitleBar from '@/components/IconTitleBar.vue'
  import { use } from 'echarts/core'
  import VChart from 'vue-echarts'
  import { BarChart } from 'echarts/charts'
  import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  
  
  use([BarChart, GridComponent, TooltipComponent, TitleComponent, CanvasRenderer])
  
  const nowTime = ref('')
  let timer = null
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
  onMounted(() => {
    updateTime()
    timer = setInterval(updateTime, 1000)
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  
  const a1Metrics = [
    { title: '库区出租率', value: 0.5, unit: '%' },
    { title: '托位使用率', value: 1, unit: '%' },
    { title: '入库箱数', value: 56, unit: '万' },
    { title: '出库箱数', value: 18, unit: '万' },
  ]
  
  // 10条模拟数据
  const allRankingDataRaw = [
    { name: '深圳', value: 45030 },
    { name: '上海', value: 33930 },
    { name: '广州', value: 18210 },
    { name: '北京', value: 6247 },
    { name: '成都', value: 5176 },
    { name: '长沙', value: 4123 },
    { name: '南京', value: 3980 },
    { name: '杭州', value: 3560 },
    { name: '武汉', value: 3120 },
    { name: '西安', value: 2890 }
  ]
  // 排序后数据
  const allRankingData = allRankingDataRaw.slice().sort((a, b) => b.value - a.value)
  
  const showCount = 6 // 每页显示6条
  const rollingCount = 7 // 后7名轮播
  const rollingPageSize = 3 // 每次轮播3条
  let rollingIndex = 0
  let rollingTimer = null
  
  const getCurrentRanking = () => {
    // 前3名固定
    const fixed = allRankingData.slice(0, 3)
    // 轮播后7名
    const rolling = allRankingData.slice(3, 10)
    // 取当前页的后几名
    const start = rollingIndex * rollingPageSize
    const end = start + rollingPageSize
    const rollingShow = rolling.slice(start, end)
    // 如果到最后一页不足数量，只从后7名里补齐，避免前3名重复
    let result = fixed.concat(rollingShow)
    if (rollingShow.length < rollingPageSize) {
      result = result.concat(rolling.slice(0, rollingPageSize - rollingShow.length))
    }
    return result
  }
  
  const barOption = ref({})
  
  const barCategoryGap = computed(() => `${Math.max(10, 100 / showCount - 10)}%`)
  
  function updateBarOption() {
    const data = getCurrentRanking()
    barOption.value = {
      grid: { left: 40, right: 30, top: 0, bottom: 0 },
      xAxis: {
        type: 'value',
        axisLabel: { show: false },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: data.map(item => item.name),
        axisLabel: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
        axisLine: { show: false },
        axisTick: { show: false },
        inverse: true
      },
      series: [
        {
          type: 'bar',
          data: data.map(item => item.value),
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [
                { offset: 0, color: '#2be282' },
                { offset: 1, color: '#1de9b6' }
              ]
            }
          },
          barWidth: 12,
          barCategoryGap: barCategoryGap.value,
          label: {
            show: true,
            position: 'right',
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 14,
            formatter: function(val) {
              return val.value;
            }
          }
        }
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(0,0,0,0.7)',
        textStyle: { color: '#fff' }
      }
    }
  }
  
  onMounted(() => {
    updateBarOption()
    rollingTimer = setInterval(() => {
      rollingIndex = (rollingIndex + 1) % Math.ceil(rollingCount / rollingPageSize)
      updateBarOption()
    }, 2000)
  })
  onUnmounted(() => {
    if (rollingTimer) clearInterval(rollingTimer)
  })
  
  // Arco表格模拟数据
  const e1Columns = [
    { title: '堆垛机名称', dataIndex: 'name', align: 'center', width: '7rem' },
    { title: '托盘号', dataIndex: 'tray', align: 'center', width: '16rem' },
    { title: '作业状态', dataIndex: 'status', align: 'center', width: '7rem' }
  ]
  // 全部数据
  const allE1Data = Array.from({ length: 20 }, (_, i) => ({
    name: `CRN1-${i+1}`,
    tray: [
      'GS808ISD20241128IN0099',
      'GS808ISD20241128IN0124',
      'DX0011JN20241226IR102',
      'GS808ISD20241128IN0141',
      'GS808ISD20241128IN0152',
      'GS808ISD20241128IN0163',
      'GS808ISD20241128IN0174',
      'GS808ISD20241128IN0185',
      'GS808ISD20241128IN0196',
      'GS808ISD20241128IN0207',
      'GS808ISD20241128IN0218',
      'GS808ISD20241128IN0229',
      'GS808ISD20241128IN0240',
      'GS808ISD20241128IN0251',
      'GS808ISD20241128IN0262',
      'GS808ISD20241128IN0273',
      'GS808ISD20241128IN0284',
      'GS808ISD20241128IN0295',
      'GS808ISD20241128IN0306',
      'GS808ISD20241128IN0317',
    ][i % 20],
    status: i % 3 === 0 ? '闲置中' : '出库中'
  }))
  const e1Data = ref(allE1Data.slice(0, 4))
  let e1PageIndex = ref(0)
  let e1Timer = null
  function updateE1Data() {
    const start = e1PageIndex.value * 4
    const end = start + 4
    if (start >= allE1Data.length) {
      e1PageIndex.value = 0
    }
    e1Data.value = allE1Data.slice(e1PageIndex.value * 4, e1PageIndex.value * 4 + 4)
  }
  onMounted(() => {
    updateE1Data()
    e1Timer = setInterval(() => {
      e1PageIndex.value = (e1PageIndex.value + 1) % Math.ceil(allE1Data.length / 4)
      updateE1Data()
    }, 2000)
    window.addEventListener('resize', calcRowHeight)
    calcRowHeight()
  })
  onUnmounted(() => {
    if (e1Timer) clearInterval(e1Timer)
    window.removeEventListener('resize', calcRowHeight)
  })
  
  const e1TableBox = ref(null)
  const rowHeight = ref('1rem') // 默认行高
  function calcRowHeight() {
    nextTick(() => {
      if (e1TableBox.value) {
        // 精确获取表头实际高度
        const header = e1TableBox.value.querySelector('.arco-table-header');
        let headerHeight = 0;
        if (header) {
          headerHeight = header.offsetHeight;
        } else {
          headerHeight = 2.4 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        }
        const boxHeight = e1TableBox.value.offsetHeight;
        const available = boxHeight - headerHeight;
        if (available > 0) {
          rowHeight.value = (available / 4) + 'px';
        }
      }
    });
  }
  
  // 动态设置根元素 font-size 随屏幕宽度变化
  function setRootFontSize() {
    const baseWidth = 1920; // 设计稿宽度
    const minFontSize = 12;
    const maxFontSize = 22;
    const html = document.documentElement;
    let size = (window.innerWidth / baseWidth) * 16;
    size = Math.max(minFontSize, Math.min(maxFontSize, size));
    html.style.fontSize = size + 'px';
  }
  setRootFontSize();
  window.addEventListener('resize', setRootFontSize);
  onUnmounted(() => {
    window.removeEventListener('resize', setRootFontSize)
  })
  
  const flylineConfig = {
    points: [
      { name: 'A', coordinate: [0.18, 0.35] },
      { name: 'B', coordinate: [0.65, 0.18] },
      { name: 'C', coordinate: [0.32, 0.78] },
      { name: 'D', coordinate: [0.78, 0.65] }
    ],
    lines: [
      { source: 'A', target: 'B' },
      { source: 'A', target: 'C' },
      { source: 'B', target: 'D' },
      { source: 'C', target: 'D' }
    ]
  }
  
  const router = useRouter()
  function goBack() {
    router.push('/portfolio')
  }
  </script>



  <style>
@font-face {
  font-family: 'HarmonyOS_Sans_TC_Medium';
  src: url('/fonts/HarmonyOS_Sans_TC_Medium.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

/* Logistics.vue 里 <style scoped> 内添加或修改 */
.wuliu-dashboard {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'HarmonyOS_Sans_TC_Medium', Arial, sans-serif;
  z-index: 9999; /* 保证在最上层，如有需要 */
}

.btn {
  display: inline-block;
  padding: 0.18rem 0.7rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  border: 3px solid #00e499;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  text-decoration: none;
  overflow: hidden;
  z-index: 1;
  font-family: inherit;
  margin-right: 0.5rem;
}

.btn::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #00e499;
  transform: translateX(-100%);
  transition: all .3s;
  z-index: -1;
}

.btn:hover::before {
  transform: translateX(0);
}

/* 合并并确保导航栏flex居中 */
.navbar {
  display: flex;
  align-items: center;
  height: 6%;
  min-height: 6%;
  background: #242328;
  color: #fff;
  justify-content: space-between;
  padding: 0 34px 0 34px;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
  position: relative;
}

.navbar-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.1;
}

.navbar-subtitle {
  font-size: 0.65rem;
  font-weight: normal;
  opacity: 0.8;
  margin-top: 2px;
  letter-spacing: 1px;
}

.navbar-time {
  font-size: 1.1rem;
  font-family: 'Consolas', 'Menlo', 'Monaco', monospace;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 1.1rem;
}

.section {
  margin-left: 5px;
  margin-right: 5px;
}

.section1 {
  height: 64%;
  color: #222;
  display: flex;
  flex: none;
}

.section2 {
  height: 30%;
  color: #222;
  display: flex;
  flex: none;
}

.card-a {
  width: 30%;
  max-width: 30%;
  flex: none;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
}

.card-a1 {
  flex: 1;
  height: 20%;
  max-height: 20%;
  margin-top: 3%;
  margin-bottom: 1%;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(21,37,53,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  color: #222;
}

.card-a2 {
  flex: 1;
  height: 80%;
  max-height: 80%;
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  font-size: 1.1rem;
  font-weight: 500;
  background: rgba(21,37,53,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  color: #222;
  padding-top: 0;
}

.card-b {
  width: 70%;
  max-width: 70%;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
}

.card-c {
  width: 30%;
  max-width: 30%;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  box-sizing: border-box;
}

.card-c1 {
  width: 100%;
  height: 94%;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(21,37,53,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  color: #222;
  padding-top: 0;
}

.card-d {
  width: 30%;
  max-width: 30%;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  box-sizing: border-box;
}

.card-d1 {
  width: 100%;
  height: 94%;
  margin-top: 3%;
  margin-bottom: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(21,37,53,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  color: #222;
  padding-top: 0;
}

.d1-title-row {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  padding-left: 1.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: left;
}

.card-e {
  height: 100%;
  max-height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
}

.card-e1 {
  width: 94%;
  height: 94%;
  margin-top: 1.3%;
  margin-bottom:1.3%;
  margin-left: 3.2%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: rgba(21,37,53,0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  color: #222;
  padding-top: 0;
}

.e1-title-row {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  padding-left: 1.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: left;
}

.e1-table-box {
  height: 100%;
  width: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.e1-table {
  width: 100%;
  padding: 0.625rem 0.625rem 0.625rem 0.625rem;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  --color-bg-table: rgba(21,37,53,0.12);
  background: rgba(21,37,53,0.4) !important;
}

/* 强力覆盖arco表格背景色 */
.e1-table :deep(.arco-table),
.e1-table :deep(.arco-table-container),
.e1-table :deep(.arco-table-content),
.e1-table :deep(.arco-table-header),
.e1-table :deep(.arco-table-th),
.e1-table :deep(.arco-table-td),
.e1-table :deep(.arco-table-cell),
.e1-table :deep(td),
.e1-table :deep(th) {
  background: rgba(21,37,53,0.4) !important;
  box-shadow: none !important;
}

.e1-table :deep(.arco-table-header) {
  background: rgba(42,42,50,0.85) !important;
}

.e1-table :deep(.arco-table-th) {
  color: #fff !important;
  font-weight: bold;
  background: rgba(42,42,50,0.85) !important;
  border-bottom: none !important;
}

.e1-table :deep(.arco-table-td) {
  color: #e0f7fa !important;
  background: transparent !important;
  border-bottom: none !important;
}

.e1-table :deep(.arco-table-row:hover) .arco-table-td {
  background: inherit !important;
  color: inherit !important;
}

.e1-table :deep(.arco-table) {
  border-radius: 12px;
  overflow: hidden;
  border: none !important;
  box-shadow: none !important;
}

.e1-table :deep(.arco-table-placeholder) {
  height: 100% !important;
  min-height: 100% !important;
  background: transparent !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.e1-table :deep(.arco-table-row),
.e1-table :deep(.arco-table-th),
.e1-table :deep(.arco-table-td) {
  min-height: 0 !important;
  height: unset !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  line-height: 1.85 !important;
}

.e1-table :deep(.arco-table-header) {
  min-height: 2.4rem;
}

.e1-table :deep(.arco-table-row) {
  min-height: unset;
}

@media (max-width: 900px) {
  .navbar {
    height: 48px;
    font-size: 1rem;
    padding: 0 12px;
  }
  .section1, .section2 {
    font-size: 1.1rem;
  }
  .card-a, .card-b, .card-c, .card-d, .card-e {
    font-size: 1.1rem;
  }
}

.a1-metrics-title-row, .a1-metrics-value-row {
  display: flex;
  width: 100%;
}

.a1-metric-title, .a1-metric-value {
  flex: 1;
  text-align: center;
}

.a1-metric-title {
  font-size: 0.95rem;
  color: #cfd8dc;
  letter-spacing: 1px;
  font-weight: 500;
}

.a1-main-num {
  font-size: 2.2rem;
  font-weight: bold;
  color: #fff;
  line-height: 1;
  margin-right: 2px;
  letter-spacing: 2px;
}

.a1-metric-unit {
  font-size: 1.1rem;
  color: #cfd8dc;
  margin-bottom: 2px;
}

.a2-title-row {
  display: flex;
  align-items: center;
  width: 100%;
  text-align: left;
  font-size: 1.15rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.2rem;
  letter-spacing: 1px;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  box-sizing: border-box;
}

.a2-metrics-title-row, .a2-metrics-value-row {
  display: flex;
  width: 100%;
  margin-top: 0.2rem;
}

.a2-metric-title, .a2-metric-value {
  flex: 1;
  text-align: center;
}

.a2-metric-title {
  font-size: 0.95rem;
  color: #cfd8dc;
  letter-spacing: 1px;
  font-weight: 500;
}

.a2-metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1px;
}

.a2-metric-value-huanbi {
  color: #2be282 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.3rem;
}

.huanbi-icon {
  display: inline-flex;
  align-items: center;
  margin-right: 4px;
}

.a2-ranking-echart {
  margin-top: 1.1rem;
  margin-left: 1.1rem;
  width: 95%;
  height: 100%;
  max-height: 100%;
}

.a2-ranking-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 1.02rem;
  color: #fff;
  font-weight: bold;
  margin-bottom: 0.12rem;
  padding-left: 0.1rem;
  letter-spacing: 0;
}

.a2-ranking-unit {
  color: #545668;
  font-size: 0.93rem;
  font-weight: normal;
  margin-left: 0.5rem;
}

.c1-title-row {
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  padding-left: 1.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: left;
}

.c1-metrics-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0.625rem 0.625rem 0.625rem 0.625rem;
  box-sizing: border-box;
}

.c1-metric-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.c1-metric-title {
  font-size: 1rem;
  color: #cfd8dc;
  letter-spacing: 1px;
  font-weight: 500;
  margin-top: 1.8rem;
  margin-bottom: 0.1rem;
  text-align: center;
}

.c1-metric-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
  text-align: center;
}

.c1-metric-huanbi-label {
  font-size: 0.95rem;
  color: #cfd8dc;
  margin-top: 4.5rem;
  margin-bottom: 0.05rem;
  text-align: center;
}

.c1-metric-huanbi-value.up {
  color: #ff4d4f;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  margin-bottom: 0.1rem;
}

.d1-metrics-table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.625rem 0.625rem 0.625rem 0.625rem;
}

.d1-metrics-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.d1-metric-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.d1-metric-title {
  font-size: 1rem;
  color: #cfd8dc;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 0.1rem;
  text-align: center;
}

.d1-metric-value {
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
}
</style>