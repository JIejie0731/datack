<template>
  <div class="hr-dashboard" ref="dashboardRef">
      <!-- 顶部导航栏，仿照示例图片风格 -->
      <div class="hr-section section-1 nav-bar-fixed">
          <div class="nav-bar-flex">
              <div class="logo-title-group shrinkable">
                  <span class="logo-double-circle">
                      <span class="circle circle-blue"></span>
                      <span class="circle circle-purple"></span>
                  </span>
                  <span class="nav-title ellipsis">HR Dashboard</span>
                  <span class="nav-overview">Overview</span>
              </div>

              <div style="display: flex; align-items: center; gap: 10px; margin-left: 16px;">
                  <button :class="{ active: activeBtn === 'overview' }" @click="setActiveBtn('overview')">人力概览</button>
                  <button :class="{ active: activeBtn === 'map' }" @click="setActiveBtn('map')">作战地图</button>
              </div>

              <!-- 新增省市筛选器 -->
              <a-space class="nav-selectors">
                  <a-tree-select v-model="selectedDept" :data="treeData" placeholder="请选择部门" style="width: 220px" />
              </a-space>
              <div class="nav-icons-user">
                  <icon-home class="nav-icon" style="cursor:pointer;" @click="router.push('/portfolio')" />

                  <icon-download class="nav-icon" @click="downloadDashboardPDF" style="cursor:pointer;" />
                  <icon-user class="nav-icon" />
                  <div class="user-info">
                      <a-tooltip :content="dbStatus === 'connected' ? '数据库已连接' : '数据库未连接'" position="top">
                          <span class="user-name ellipsis">PGSQL</span>
                      </a-tooltip>
                      <span class="user-role">
                          <span class="user-dot"
                              :style="{ background: dbStatus === 'connected' ? '#00d26a' : '#ff3b3b' }"></span>
                          {{ dbStatus === 'connected' ? 'Succeed Connect' : (dbStatus === 'checking' ? 'Checking...' :
                          'Not Connected') }}
                      </span>
                  </div>
              </div>
          </div>
      </div>

      <!-- 新增人力概览和作战地图按钮 -->

      <div class="hr-section section-2">
          <div class="card-list">
              <div v-for="(item, index) in 4" :key="index" class="card-item card1-flex">
                <div class="card1-indicator">
                  <div class="indicator-content">
                    <span class="indicator-icon">
                      <template v-if="index === 1">
                        <svg t="1748451155797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38088" width="40" height="40"><path d="M896 962.56h-768c-51.2 0-93.866667-42.666667-93.866667-93.866667v-614.4c0-51.2 42.666667-93.866667 93.866667-93.866666h310.613333c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6H128c-23.893333 0-42.666667 18.773333-42.666667 42.666666v614.4c0 23.893333 18.773333 42.666667 42.666667 42.666667h768c23.893333 0 42.666667-18.773333 42.666667-42.666667v-614.4c0-23.893333-18.773333-42.666667-42.666667-42.666666H585.386667c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h310.613333c51.2 0 93.866667 42.666667 93.866667 93.866666v614.4c0 52.906667-42.666667 93.866667-93.866667 93.866667z" fill="#333333" p-id="38089"></path><path d="M348.16 535.893333c-54.613333 0-97.28-44.373333-97.28-98.986666 0-54.613333 44.373333-97.28 97.28-97.28s97.28 44.373333 97.28 97.28c1.706667 56.32-42.666667 98.986667-97.28 98.986666z m0-145.066666c-25.6 0-46.08 20.48-46.08 46.08 0 25.6 20.48 47.786667 46.08 47.786666s46.08-20.48 46.08-47.786666c1.706667-23.893333-18.773333-46.08-46.08-46.08zM512 783.36H186.026667c-13.653333 0-25.6-11.946667-25.6-25.6 0-104.106667 85.333333-189.44 189.44-189.44s189.44 85.333333 189.44 189.44c-1.706667 15.36-13.653333 25.6-27.306667 25.6z m-298.666667-51.2h269.653334c-11.946667-63.146667-68.266667-112.64-134.826667-112.64s-122.88 49.493333-134.826667 112.64zM788.48 663.893333c-6.826667 0-13.653333-1.706667-18.773333-6.826666l-151.893334-151.893334c-10.24-10.24-10.24-25.6 0-35.84s25.6-10.24 35.84 0l151.893334 151.893334c10.24 10.24 10.24 25.6 0 35.84-5.12 3.413333-10.24 6.826667-17.066667 6.826666z" fill="#333333" p-id="38090"></path><path d="M636.586667 663.893333c-6.826667 0-13.653333-1.706667-18.773334-6.826666-10.24-10.24-10.24-25.6 0-35.84l151.893334-151.893334c10.24-10.24 25.6-10.24 35.84 0s10.24 25.6 0 35.84l-151.893334 151.893334c-3.413333 3.413333-10.24 6.826667-17.066666 6.826666z" fill="#333333" p-id="38091"></path><path d="M512 317.44c-54.613333 0-98.986667-44.373333-98.986667-98.986667V160.426667c0-54.613333 44.373333-98.986667 98.986667-98.986667s98.986667 44.373333 98.986667 98.986667v58.026666c0 54.613333-44.373333 98.986667-98.986667 98.986667z m0-204.8c-25.6 0-47.786667 22.186667-47.786667 47.786667v58.026666c0 25.6 22.186667 47.786667 47.786667 47.786667s47.786667-22.186667 47.786667-47.786667V160.426667c0-27.306667-22.186667-47.786667-47.786667-47.786667z" fill="#333333" p-id="38092"></path></svg>
                      </template>
                      <template v-else-if="index === 2">
                        <svg t="1748451785961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="63303" width="40" height="40"><path d="M119.13216 820.096V263.36256a13.2864 13.2864 0 0 1 13.27616-13.26592h276.736c6.8864 47.34976 47.744 83.85024 96.9728 83.85024s90.10176-36.49536 96.98816-83.85024h285.23008a13.2864 13.2864 0 0 1 13.26592 13.26592v470.45632h56.00768V263.36256c0-38.19008-31.06816-69.2736-69.2736-69.2736h-284.20096V123.91424a27.99616 27.99616 0 0 0-28.0064-28.0064H436.1216a28.0064 28.0064 0 0 0-28.0064 28.0064v70.17472H132.40832c-38.20544 0-69.28384 31.08352-69.28384 69.2736v556.73856c0 38.19008 31.08352 69.2736 69.28384 69.2736h450.66752v-56.00768H132.40832a13.29664 13.29664 0 0 1-13.27616-13.27104zM464.128 151.91552h83.99872V235.9296c0 23.16288-18.8416 42.00448-42.00448 42.00448s-41.99424-18.8416-41.99424-42.00448V151.91552z" fill="#3E3A39" p-id="63304"></path><path d="M559.03744 637.57824l-103.20896-51.57888 26.69056-38.8352a28.02688 28.02688 0 0 0 4.92032-15.86176V449.32608c0-60.86144-48.64-108.544-110.7456-108.544-62.09536 0-110.7456 47.68256-110.7456 108.544v81.97632c0 5.81632 1.80736 11.48928 5.18144 16.2304l27.19744 38.2464-107.73504 51.58912a27.98592 27.98592 0 0 0-15.90272 25.25696v52.0448a28.0064 28.0064 0 0 0 28.0064 28.0064h343.81824a28.00128 28.00128 0 0 0 28.0064-28.0064v-52.0448a28.0064 28.0064 0 0 0-15.48288-25.04704z m-40.52992 49.09056H230.69696v-6.4l121.83552-58.34752a27.97568 27.97568 0 0 0 15.01184-18.24256 28.04224 28.04224 0 0 0-4.29568-23.2448l-41.2928-58.07616V449.32608c0-29.45536 24.0384-52.53632 54.73792-52.53632s54.73792 23.08096 54.73792 52.53632v73.27744l-39.99744 58.19904a28.04224 28.04224 0 0 0-4.03456 22.8608 27.97568 27.97568 0 0 0 14.592 18.048l116.51584 58.22464v6.7328zM737.15712 592.2048c15.47776 0 28.0064-12.53888 28.0064-28.0064s-12.52352-28.0064-28.0064-28.0064H623.36c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h113.79712zM623.36 417.47968c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h178.19648a28.00128 28.00128 0 0 0 28.0064-28.0064 27.99616 27.99616 0 0 0-28.0064-28.0064H623.36z" fill="#3E3A39" p-id="63305"></path><path d="M683.40736 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63306"></path><path d="M820.51072 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63307"></path><path d="M957.60896 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63308"></path></svg>
                      </template>
                      <template v-else-if="index === 3">
                        <svg t="1748452547151" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="71215" width="40" height="40"><path d="M502.4 313.6c35.2 0 67.2-28.8 67.2-67.2V144h-131.2v105.6c-3.2 35.2 25.6 64 64 64z" p-id="71216" fill="#2c2c2c"></path><path d="M889.6 240h-275.2v6.4c0 64-51.2 115.2-115.2 115.2S384 313.6 384 249.6v-9.6H134.4c-22.4 0-41.6 19.2-41.6 41.6v556.8c0 22.4 19.2 41.6 41.6 41.6h755.2c22.4 0 41.6-19.2 41.6-41.6V281.6c0-22.4-19.2-41.6-41.6-41.6zM524.8 732.8H179.2v-51.2l137.6-67.2-44.8-64v-83.2c0-44.8 38.4-80 83.2-80 44.8 0 83.2 35.2 83.2 80v83.2l-44.8 64 131.2 67.2v51.2z m105.6-300.8H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6-3.2-16 9.6-25.6 22.4-25.6z m0 112H736c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-105.6c-12.8 0-25.6-12.8-25.6-25.6 0-16 12.8-25.6 25.6-25.6z m169.6 153.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z" p-id="71217" fill="#2c2c2c"></path></svg>
                      </template>
                      <template v-else>
                        <svg t="1748449437076" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34389" width="40" height="40"><path d="M966.464 619.712a26.176 26.176 0 0 1-26.176-26.176V273.184c0-23.264-18.912-42.144-42.144-42.144H589.12a26.176 26.176 0 1 1 0-52.32h309.024a94.624 94.624 0 0 1 94.528 94.496v320.352a26.176 26.176 0 0 1-26.208 26.144zM587.712 923.072H127.2a94.624 94.624 0 0 1-94.528-94.56V273.184A94.624 94.624 0 0 1 127.2 178.688h313.184a26.144 26.144 0 1 1 0 52.32h-313.184c-23.264 0-42.176 18.912-42.176 42.144V828.48a42.24 42.24 0 0 0 42.176 42.208h460.544a26.144 26.144 0 1 1-0.032 52.384z" fill="#231815" p-id="34390"></path><path d="M512.64 341.344a98.016 98.016 0 0 1-97.92-97.92v-128.672c0-14.432 11.744-26.176 26.176-26.176h143.456c14.464 0 26.176 11.744 26.176 26.176v128.544a97.984 97.984 0 0 1-97.888 98.048zM467.072 140.96v102.336c0 25.216 20.448 45.696 45.568 45.696 25.12 0 45.536-20.48 45.536-45.568V140.96H467.072zM837.984 479.872h-201.856a26.176 26.176 0 0 1 0-52.384h201.856a26.208 26.208 0 0 1 0 52.384zM758.944 606.976h-122.816a26.176 26.176 0 0 1 0-52.352h122.816a26.144 26.144 0 0 1 0 52.352zM789.888 938.016a25.696 25.696 0 0 1-15.904-5.472l-132.384-101.376a26.176 26.176 0 1 1 31.84-41.568l113.024 86.592 158.944-179.264a26.176 26.176 0 1 1 39.2 34.72l-175.168 197.504a25.92 25.92 0 0 1-19.552 8.864zM458.976 807.68a26.144 26.144 0 0 1-26.176-26.144v-103.2c0-18.048-14.688-32.704-32.736-32.704H295.52c-18.016 0-32.704 14.656-32.704 32.704v103.2a26.176 26.176 0 0 1-52.352 0v-103.2a85.152 85.152 0 0 1 85.088-85.056h104.512a85.184 85.184 0 0 1 85.12 85.056v103.2a26.24 26.24 0 0 1-26.208 26.144zM347.776 551.744c-56.032 0-101.664-45.632-101.664-101.696s45.6-101.696 101.664-101.696 101.664 45.632 101.664 101.696-45.632 101.696-101.664 101.696z m0-151.008a49.344 49.344 0 1 0 0.032 98.56 49.344 49.344 0 0 0-0.032-98.56z" fill="#231815" p-id="34391"></path></svg>
                      </template>
                    </span>
                    <span class="indicator-number">{{ index === 1 ? '200人' : (index === 2 ? '198人' : (index === 3 ? '134人' : '500人')) }}</span>
                    <span class="indicator-label">{{ index === 1 ? '离职人数' : (index === 2 ? '入职人数' : (index === 3 ? '转正人数' : '在职人数')) }}</span>
                  </div>
                </div>
                <div class="card1-chart">
                  <div :ref="el => cardBarRefs[index] = el" class="card1-bar-chart" style="width: 100%; height: 100%;"></div>
                </div>
              </div>
          </div>
      </div>

      <div class="hr-section section-3">
          <div class="section3-card-list">
              <div class="section3-card">
                  <div class="cardA-inner">
                      <div class="cardA-row1">
                          <BaseCard name="月度趋势" cardId="monthly-trend" v-model:zoom="trendZoom">
                            <div class="chart-container" :style="trendZoom ? {height: '100%'} : {height: '100%'}">
                              <div ref="chartA1Ref" style="width: 100%; height: 100%;"></div>
                            </div>
                          </BaseCard>
                      </div>

                      <div class="cardA-row2">
                          <div class="cardA-row2-item">
                              <BaseCard name="年龄分布" cardId="age-distribution" v-model:zoom="ageZoom">
                                <div class="a2-chart" :style="ageZoom ? {height: '100%'} : {height: 'calc(100% )'}">
                                  <div ref="agePieRef" :style="ageZoom ? 'width:100%;height:100%;' : 'width:100%;height:260px;'" ></div>
                                </div>
                              </BaseCard>
                          </div>

                          <div class="cardA-row2-item">
                              <BaseCard name="职级分布" cardId="level-distribution" v-model:zoom="levelZoom">
                                <div class="a3-chart" :style="levelZoom ? {height: '100%'} : {height: '100%'}">
                                  <div ref="levelBarRef" style="width: 100%; height: 100%;"></div>
                                  <Modal
                                    v-model:visible="showLevelModal"
                                    :title="modalInfo.level + '职级人员信息'"
                                    :columns="tableColumns"
                                    :data="tableData"
                                    :page-size="15"
                                  />
                                </div>
                              </BaseCard>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="section3-card">
                  <BaseCard name="B区表格" cardId="b-table">
                    <template #header>
                      <div class="b-title"><h3>B区表格</h3></div>
                    </template>
                    <div class="cardB-table">
                      <el-table :data="bTableData" style="width: 100%" max-height="340">
                        <el-table-column prop="dept" label="部门" />
                        <el-table-column prop="total" label="人数" />
                        <el-table-column prop="onJob" label="在职" />
                        <el-table-column prop="leave" label="离职" />
                        <el-table-column prop="entry" label="入职" />
                        <el-table-column prop="regular" label="转正" />
                      </el-table>
                    </div>
                  </BaseCard>
              </div>
          </div>
      </div>
      <div class="hr-section section-4">区域4</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import { IconSettings, IconDownload, IconUser, IconHome } from '@arco-design/web-vue/es/icon';
import { useRouter } from 'vue-router';
import { Tooltip as ATooltip } from '@arco-design/web-vue';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as echarts from 'echarts';
import Modal from './Modal.vue';
import { Table as ATable } from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import BaseCard from '../components/BaseCard.vue';
import { ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/dist/index.css';

const router = useRouter();


// 动态部门树数据
const treeData = ref([]);
const selectedDept = ref([]);

onMounted(async () => {
  try {
      const res = await fetch('/api/dept-tree');
      const data = await res.json();
      treeData.value = data;
      // 默认选中第一个一级部门
      if (treeData.value.length > 0) {
          selectedDept.value = [treeData.value[0].key];
      }
  } catch (e) {
      treeData.value = [];
  }

  // 初始化图表
  initChart();
});

const activeBtn = ref('overview');
function setActiveBtn(name) {
  activeBtn.value = name;
  if (name === 'map') {
      router.push('/battle-map');
  }
  if (name === 'overview') {
      router.push('/hr-dashboard');
  }
}

// 数据库连接状态逻辑
const dbStatus = ref('checking'); // checking, connected, error
onMounted(async () => {
  try {
      const res = await fetch('/api/db-status');
      const data = await res.json();
      dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
  } catch (e) {
      dbStatus.value = 'error';
  }
});

// 截图转PDF逻辑
const dashboardRef = ref(null);
async function downloadDashboardPDF() {
  const el = dashboardRef.value;
  if (!el) return;
  const canvas = await html2canvas(el, { useCORS: true, backgroundColor: null });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('HR-Dashboard.pdf');
}

const chartA1Ref = ref(null);

// 初始化图表函数
function initChart() {
  nextTick(() => {
      if (chartA1Ref.value) {
          const chartA1 = echarts.init(chartA1Ref.value);

          const entryData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31]; // 入职
          const leaveData = [3, 5, 4, 6, 7, 5, 8, 7, 6, 9, 10, 8]; // 离职
          const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

          const gridLeft = computed(() => trendZoom.value ? 80 : 42)

          chartA1.setOption({
              title: { text: '', left: 'left', top: 0 },
              tooltip: { trigger: 'axis' },
              legend: { data: ['在职', '离职'], right: 20, top: 10, textStyle: { fontSize: 15, color: '#222' }, itemWidth: 30 },
              grid: { left: gridLeft.value, right: 0, top: 40, bottom: 28 },
              xAxis: {
                  type: 'category', data: months,
                  axisLabel: { fontSize: 15 },
                  splitLine: { show: false },
                  axisLine: { show: false },
                  axisTick: { show: false }
              },
              yAxis: { type: 'value', name: '人数', axisLabel: { fontSize: 15 }, splitLine: { show: false } },
              series: [
                  {
                      name: '在职',
                      type: 'line',
                      data: entryData,
                      itemStyle: { color: '#222' }, // 黑色
                      lineStyle: { color: '#222', width: 3 },
                      symbol: 'circle',
                      symbolSize: 8
                  },
                  {
                      name: '离职',
                      type: 'line',
                      data: leaveData,
                      itemStyle: { color: '#2257f4' }, // 蓝色
                      lineStyle: { type: 'dashed', color: '#2257f4', width: 3 },
                      symbol: 'circle',
                      symbolSize: 8
                  }
              ]
          }, { notMerge: true });

          // 窗口大小变化时重新渲染图表
          window.addEventListener('resize', () => {
              chartA1.resize();
          });
      }
  });
}



// 年龄分布

const agePieRef = ref(null);
const ageZoom = ref(false)

onMounted(() => {
nextTick(() => {
  if (agePieRef.value) {
    const chart = echarts.init(agePieRef.value);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: ['30%', '50%'],
          center: ['50%', '40%'], 
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}\n{c}人 ({d}%)', 
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 10
          },
          color: ['#2257f4', '#4e7fff', '#00d26a', '#ffb300', '#ff3b3b'],
          data: [
            { value: 120, name: '18-25岁' },
            { value: 200, name: '26-35岁' },
            { value: 150, name: '36-45岁' },
            { value: 80,  name: '46-55岁' },
            { value: 40,  name: '55岁以上' }
          ]
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
});
});

watch(ageZoom, (val) => {
  if (val) {
    nextTick(() => {
      if (agePieRef.value) {
        const chart = echarts.init(agePieRef.value);
        chart.setOption({
          tooltip: { trigger: 'item' },
          legend: { show: false },
          series: [
            {
              name: '年龄分布',
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '40%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}\n{c}人 ({d}%)',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 18,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: true,
                length: 20,
                length2: 10
              },
              color: ['#2257f4', '#4e7fff', '#00d26a', '#ffb300', '#ff3b3b'],
              data: [
                { value: 120, name: '18-25岁' },
                { value: 200, name: '26-35岁' },
                { value: 150, name: '36-45岁' },
                { value: 80,  name: '46-55岁' },
                { value: 40,  name: '55岁以上' }
              ]
            }
          ]
        });
        chart.resize();
        window.addEventListener('resize', () => chart.resize());
      }
    });
  }
})



// 职级分布柱状图

const levelBarRef = ref(null)
let chartInstance = null
const dataArr = [30, 50, 80, 120, 90, 60, 20]
const maxValue = Math.max(...dataArr) + 15
// 模态框控制
const showLevelModal = ref(false)
const modalInfo = ref({ level: '', value: 0 })


function randomDate(start, end) {
return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

// 生成随机数函数
function randomNumber(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 生成随机评分函数
function randomScore(min = 60, max = 100) {
return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

const tableColumns = [
{ title: '姓名', dataIndex: 'name', align: 'left', width: 80 },
{ title: '工号', dataIndex: 'id', align: 'left', width: 80 },
{ title: '岗位', dataIndex: 'position', align: 'left', width: 100 },
{ title: '部门', dataIndex: 'department', align: 'left', width: 100 },
{ title: '入职日期', dataIndex: 'hireDate', align: 'left', width: 120 },
{ title: '直属上级', dataIndex: 'supervisor', align: 'left', width: 100 },
{ title: '联系电话', dataIndex: 'phone', align: 'left', width: 120 },
{ title: '电子邮箱', dataIndex: 'email', align: 'left', width: 160 },
{ title: '办公地点', dataIndex: 'location', align: 'left', width: 100 },
{ title: '职级', dataIndex: 'level', align: 'left', width: 80 },
{ title: '薪资等级', dataIndex: 'salaryGrade', align: 'left', width: 100 },
{ title: '本月考勤', dataIndex: 'attendance', align: 'left', width: 100 },
{ title: '本月绩效', dataIndex: 'performance', align: 'left', width: 100 },
{ title: '任务完成率', dataIndex: 'taskCompletion', align: 'left', width: 120 },
{ title: '项目参与度', dataIndex: 'projectInvolvement', align: 'left', width: 120 },
{ title: '培训时长', dataIndex: 'trainingHours', align: 'left', width: 100 },
{ title: '技能评分', dataIndex: 'skillScore', align: 'left', width: 100 },
{ title: '团队协作', dataIndex: 'teamwork', align: 'left', width: 100 },
{ title: '客户满意度', dataIndex: 'customerSatisfaction', align: 'left', width: 120 },
{ title: '备注', dataIndex: 'notes', align: 'left', width: 180 }
]
const allLevelData = {
  P1: Array.from({ length: 30 }, (_, i) => ({
name: `P1员工${i + 1}`,
id: `P1${String(i + 1).padStart(3, '0')}`,
position: '实习生',
department: ['技术部', '产品部', '设计部', '市场部', '运营部'][randomNumber(0, 4)],
hireDate: randomDate(new Date(2023, 0, 1), new Date()),
supervisor: ['张经理', '李总监', '王主管', '赵经理', '陈总监'][randomNumber(0, 4)],
phone: `13${randomNumber(10000000, 99999999)}`,
email: `p1_${i + 1}@example.com`,
location: ['北京', '上海', '广州', '深圳', '杭州'][randomNumber(0, 4)],
level: 'P1',
salaryGrade: `S${randomNumber(1, 3)}`,
attendance: `${randomNumber(20, 22)}/22天`,
performance: randomScore(70, 90),
taskCompletion: `${randomScore(75, 95)}%`,
projectInvolvement: `${randomScore(60, 85)}%`,
trainingHours: `${randomNumber(10, 30)}小时`,
skillScore: randomScore(65, 85),
teamwork: randomScore(70, 90),
customerSatisfaction: randomScore(75, 95),
notes: '实习生，正在培训中'
})),
P2: [
  { name: '王五', id: '1003', position: '初级工程师' }
],
P3: [
  { name: '赵六', id: '1004', position: '中级工程师' }
],
P4: [
  { name: '钱七', id: '1005', position: '高级工程师' }
],
P5: [
  { name: '孙八', id: '1006', position: '资深工程师' }
],
P6: [
  { name: '周九', id: '1007', position: '技术专家' }
],
P7: [
  { name: '吴十', id: '1008', position: '首席专家' }
]
}
const tableData = ref([])
const option = {
  grid: {
  top: 10,
  bottom:20,
  left:30,
  right: 20
},
xAxis: {
   type: 'value',
   max: maxValue,
   splitLine: { show: false },
   axisLabel: { show: false }
},
yAxis: {
  type: 'category' ,
  
  data: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
  axisLabel: { fontSize: 13 },
                  splitLine: { show: false },
                  axisLine: { show: false },
                  axisTick: { show: false }
},
series: [
  {
    data: [30, 50, 80, 120, 90, 60, 20], // 这里填你的实际人数
    type: 'bar',
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(180, 180, 180, 0.2)'
    },
    label: {
show: true,           // 显示标签
position: 'right',      // 标签显示在柱子顶部
color: '#1d1e21',     // 标签颜色，可自定义
fontSize: 14,     // 字体大小
formatter: '{c}人'
},
itemStyle: {
color: '#3044f2' // 你喜欢的颜色
}
  }
]
}



function renderChart() {
if (!levelBarRef.value) return
chartInstance = echarts.init(levelBarRef.value)
chartInstance.setOption(option)
chartInstance.off('click')


chartInstance.on('click', function(params) {
if (params.componentType === 'series') {
  modalInfo.value = { level: params.name, value: params.value }
  tableData.value = allLevelData[params.name] || []
  showLevelModal.value = true
}
})
}

function resizeChart() {
if (chartInstance) {
  chartInstance.resize()
}
}

onMounted(() => {
renderChart()
window.addEventListener('resize', resizeChart)
})

onBeforeUnmount(() => {
if (chartInstance) {
  chartInstance.dispose()
}
window.removeEventListener('resize', resizeChart)
})

const trendZoom = ref(false)
watch(trendZoom, (val) => {
  if (val) {
    nextTick(() => {
      if (chartA1Ref.value) {
        const chartA1 = echarts.init(chartA1Ref.value);
        // 重新设置 option
        const entryData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31];
        const leaveData = [3, 5, 4, 6, 7, 5, 8, 7, 6, 9, 10, 8];
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        const gridLeft = computed(() => val ? 80 : 42)
        chartA1.setOption({
          title: { text: '', left: 'left', top: 0 },
          tooltip: { trigger: 'axis' },
          legend: { data: ['在职', '离职'], right: 20, top: 10, textStyle: { fontSize: 15, color: '#222' }, itemWidth: 30 },
          grid: { left: gridLeft.value, right: 0, top: 40, bottom: 28 },
          xAxis: {
            type: 'category', data: months,
            axisLabel: { fontSize: 15 },
            splitLine: { show: false },
            axisLine: { show: false },
            axisTick: { show: false }
          },
          yAxis: { type: 'value', name: '人数', axisLabel: { fontSize: 15 }, splitLine: { show: false } },
          series: [
            {
              name: '在职',
              type: 'line',
              data: entryData,
              itemStyle: { color: '#222' },
              lineStyle: { color: '#222', width: 3 },
              symbol: 'circle',
              symbolSize: 8
            },
            {
              name: '离职',
              type: 'line',
              data: leaveData,
              itemStyle: { color: '#2257f4' },
              lineStyle: { type: 'dashed', color: '#2257f4', width: 3 },
              symbol: 'circle',
              symbolSize: 8
            }
          ]
        });
        chartA1.resize();
        window.addEventListener('resize', () => chartA1.resize());
      }
    });
  }
})

const levelZoom = ref(false)
watch(levelZoom, (val) => {
  if (val) {
    nextTick(() => {
      if (levelBarRef.value) {
        chartInstance = echarts.init(levelBarRef.value)
        chartInstance.setOption(option)
        chartInstance.resize()
        chartInstance.off('click')
        chartInstance.on('click', function(params) {
          if (params.componentType === 'series') {
            modalInfo.value = { level: params.name, value: params.value }
            tableData.value = allLevelData[params.name] || []
            showLevelModal.value = true
          }
        })
        window.addEventListener('resize', () => chartInstance.resize())
      }
    })
  }
})

const cardBarRefs = ref([])
const card1BarData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31]
const card1BarMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
onMounted(() => {
  nextTick(() => {
    cardBarRefs.value.forEach((el, idx) => {
      if (el) {
        const chart = echarts.init(el)
        chart.setOption({
          grid: { left: 24, right: 16, top: 24, bottom: 28 },
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: function(params) {
              const p = params[0];
              return `${p.axisValue}：${p.data}人`;
            }
          },
          xAxis: {
            type: 'category',
            data: card1BarMonths,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          yAxis: {
            type: 'value',
            name: '',
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          },
          series: [{
            data: card1BarData,
            type: 'bar',
            itemStyle: { color: '#2257f4' },
            barWidth: '60%'
          }]
        })
        window.addEventListener('resize', () => chart.resize())
      }
    })
  })
})

const bTableData = [
  { dept: '技术部', total: 120, onJob: 110, leave: 5, entry: 8, regular: 6 },
  { dept: '产品部', total: 80, onJob: 75, leave: 2, entry: 4, regular: 3 },
  { dept: '设计部', total: 60, onJob: 58, leave: 1, entry: 2, regular: 2 },
  { dept: '市场部', total: 50, onJob: 48, leave: 1, entry: 2, regular: 1 },
  { dept: '运营部', total: 90, onJob: 85, leave: 3, entry: 5, regular: 4 },
  { dept: '行政部', total: 40, onJob: 38, leave: 1, entry: 1, regular: 1 },
  { dept: '财务部', total: 35, onJob: 33, leave: 1, entry: 1, regular: 1 },
  { dept: '法务部', total: 20, onJob: 19, leave: 0, entry: 1, regular: 1 },
  { dept: '人事部', total: 25, onJob: 24, leave: 0, entry: 1, regular: 1 },
  { dept: '采购部', total: 30, onJob: 28, leave: 1, entry: 2, regular: 1 },
  { dept: '物流部', total: 45, onJob: 43, leave: 1, entry: 2, regular: 2 },
  { dept: '客服部', total: 55, onJob: 52, leave: 2, entry: 3, regular: 2 },
  { dept: '研发部', total: 100, onJob: 95, leave: 2, entry: 5, regular: 3 },
  { dept: '公关部', total: 22, onJob: 21, leave: 0, entry: 1, regular: 1 },
  { dept: '信息部', total: 18, onJob: 17, leave: 0, entry: 1, regular: 1 },
];

</script>



<style scoped>
.hr-dashboard {
  background: linear-gradient(to bottom, #1f2125 0%, #1f2125 20%, #f3f0f0 20%, #f3f0f0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  /* 顶部导航栏高度，避免内容被遮挡 */
}

.section-1 {
  height: 70px;
  color: #fff;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.section-1.nav-bar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
  background: #1f2125;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 70px;
  display: flex;
  align-items: center;
}

.custom-nav-row {
  width: 100%;
  height: 100%;
}

.logo-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 80px;
}

.logo-double-circle {
  position: relative;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  opacity: 0.9;
}

.circle-blue {
  left: 0;
  background: #6ee0ff;
  z-index: 1;
}

.circle-purple {
  left: 12px;
  background: #7c3aed;
  z-index: 2;
}

.nav-title {
  font-size: 1.15rem;
  font-weight: 500;
  color: #fff;
}

.nav-overview {
  font-size: 1.05rem;
  color: #4e7fff;
  margin-left: 4px;
  cursor: pointer;
}

.custom-menu {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.08rem;
}

.custom-menu .arco-menu-item {
  background: transparent;
  color: #fff;
  font-size: 1.08rem;
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  border: none;
}

.custom-menu .menu-selected,
.custom-menu .arco-menu-item-selected {
  color: #4e7fff !important;
  background: #23242a !important;
  border-bottom: 3px solid #4e7fff !important;
}

.nav-icons-user {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-shrink: 0;
  margin-right: 80px;
}

.nav-icon {
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
}

.user-name {
  font-size: 10px;
  color: #fff;
  min-width: 0;
}

.user-dot {
  width: 8px;
  height: 8px;
  background: #00d26a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.nav-bar-flex {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 18px;
  min-width: 0;
  height: 70px;
}

.shrinkable {
  display: flex;
  align-items: center;
  min-width: 0;
  flex-shrink: 1;
}

.logo-title-group {
  gap: 12px;
  min-width: 0;
  max-width: 320px;
}

.nav-title {
  font-size: 1.15rem;
  font-weight: 500;
  color: #fff;
  min-width: 0;
  max-width: 180px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  vertical-align: bottom;
  font-size: 5x;
}

.nav-overview {
  font-size: 1.05rem;
  color: #4e7fff;
  margin-left: 4px;
  cursor: pointer;
  min-width: 0;
}

.custom-menu {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.08rem;
  min-width: 0;
  flex-shrink: 1;
  max-width: 420px;
}

.custom-menu .arco-menu-item {
  background: transparent;
  color: #fff;
  font-size: 1.08rem;
  padding: 0 24px;
  height: 56px;
  display: flex;
  align-items: center;
  border: none;
}

.custom-menu .menu-selected,
.custom-menu .arco-menu-item-selected {
  color: #4e7fff !important;
  background: #23242a !important;
  border-bottom: 3px solid #4e7fff !important;
}

.nav-icons-user {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-shrink: 0;
}

.nav-icon {
  font-size: 22px;
  color: #fff;
  cursor: pointer;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 8px;
  min-width: 80px;
  /* 固定最小宽度，防止抖动 */
  max-width: 100px;
  /* 可选，防止过宽 */
}

.user-name {
  font-size: 10px;
  color: #fff;
  min-width: 0;
}

.user-role {
  font-size: 8px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
  text-align: left;
  width: 80px;
  /* 固定宽度，保证状态切换时宽度不变 */
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-dot {
  width: 8px;
  height: 8px;
  background: #00d26a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
}

.nav-selectors {
  border: 2px solid #597ef7;
  flex-shrink: 0;
}

.nav-selectors :deep(.arco-select-view) {
  background: #23242a !important;
  border: 1.5px solid #000 !important;
  color: #fff !important;
}

.nav-selectors :deep(.arco-select-view-input) {
  color: #fff !important;
}

.nav-selectors :deep(.arco-select-dropdown) {
  background: #23242a !important;
  color: #fff !important;
  border: 1.5px solid #000 !important;
}

.nav-selectors :deep(.arco-select-option) {
  color: #fff !important;
  background: #23242a !important;
}

.nav-selectors :deep(.arco-select-option-active),
.nav-selectors :deep(.arco-select-option[aria-selected='true']) {
  background: #333 !important;
  color: #4e7fff !important;
}

.nav-action-btns {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 16px;
}

.nav-red-btn {
  border: 1.5px solid #ff3b3b !important;
  color: #ff3b3b !important;
  background: transparent !important;
  font-size: 13px;
  padding: 0 16px;
  height: 32px;
  border-radius: 4px;
}

/* 按钮基础样式 */
button {
  background: #1f2125;
  color: #fff;
  border: 1.5px solid #1f2125;
  border-radius: 4px;
  padding: 6px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  outline: none;
}

button::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: -6px;
  height: 3px;
  background: #4e7fff;
  /* 直角 */
  border-radius: 0;
  display: block;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(.4, 0, .2, 1);
  pointer-events: none;
}

button:hover::after {
  transform: scaleX(1);
}

button.active::after {
  transform: scaleX(1);
}

button:hover {
  background: #1f2125;
  color: #fff;
}

.section-2 {
  height: 230px;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 80px;
  margin-right: 80px;
  margin-top: 20px;
}

.card-list {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;

  justify-content: space-between;
  align-items: center;
}

.card-item,
.card1-flex {
  height: 190px;
  min-height: 190px;
  max-height: 190px;
  box-sizing: border-box;
}

.card-item {
  flex: 1;
  min-width: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #ff3b3b;
}

.section-3 {
  height: 100%;
  margin: 0px 80px 0 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #597ef7;
  font-size: 1.2rem;
}

.section-4 {
  border: 2px dashed #ff3b3b;
  min-height: 180px;
  margin: 32px 80px 0 80px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff3b3b;
  font-size: 1.2rem;
}

/* 区域3卡片布局与样式 */
.section3-card-list {
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: stretch;
  align-items: stretch;
}
.section3-card {
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #7c3aed;
  font-size: 1.1rem;
  font-weight: 500;
}
.base-card-content {
  padding: 1rem 1.5rem 0 1.5rem;
  box-sizing: border-box;
}
.cardA-inner {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}
.cardB-table {
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.a1-title {

  margin-left: 20px;
  margin-top: 10px;
 
  width: 100%;
  display: flex;


  font-size: 1.0rem;
  color: #394ca2;

}

/* 图表容器样式 */
.chart-container {
  width: 100%;
  height: 100%;
  border: 3px solid red;
  padding: 0;
  margin: 0;
  /* background: none; // 去除调试色 */
}


/* 区域3 a2部分样式 */

.cardA-row2-item {
display: flex;
flex-direction: column; /* 垂直排列子元素 */
height: 100%; /* 确保容器占满高度 */
}

.a2-title {
  width: 100%;
  padding-left: 20px;
  padding-top: 5px;
  color: #3b4399;
flex: 0 0 auto; /* 标题不伸缩，保持内容高度 */

}

.a2-chart {
  width: 100%;
flex: 1 1 auto; /* 图表区域填充剩余空间 */
min-height: 200px; /* 设置最小高度防止内容溢出 */

}


/* 区域3 a3部分样式 */


.a3-title {

  padding-left: 20px;
  padding-top: 5px;
  width: 100%;
  display: flex;
  color: #3b4399;
  
}

.a3-chart {
  width: 100%;
flex: 1 1 auto; /* 图表区域填充剩余空间 */
min-height: 200px; /* 设置最小高度防止内容溢出 */

}

/* 顶部卡片1左右布局样式 */
.card1-flex {
  display: flex;

  flex-direction: row;
  align-items: stretch;
  height: 100%;
}
.card1-indicator {
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  background: ;
  border-right: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #394ca2;
}
.card1-chart {
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* 指标区内容样式 */
.indicator-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.indicator-icon {
  margin-bottom: 0.5rem;
}
.indicator-number {
  font-size: 1.6rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 0.2rem;
}
.indicator-label {
  font-size: 1rem;
  color: #666;
}

.card1-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 120px;
}

/* 让B区表格内容区和表格都100%填充 */
:deep(.section3-card-list) {
  height: 100%;
  display: flex;
}
:deep([cardid="b-table"].section3-card) {
  height: 100%;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}
:deep([cardid="b-table"] .base-card-content) {
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.cardB-table {
  width: 100%;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
:deep([cardid="b-table"] .el-table) {
  width: 100% !important;
  min-width: 0 !important;
}
</style>