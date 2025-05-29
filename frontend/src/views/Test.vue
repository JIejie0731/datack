<template>
  <div class="test-dashboard-bg">
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
          <a-tooltip content="开发中..." position="top">
            <button :class="{ active: activeBtn === 'map' }" @click="setActiveBtn('map')">招聘分析</button>
          </a-tooltip>
        </div>
        <a-space class="nav-selectors">
          <a-tree-select v-model="selectedDept" :data="treeData" placeholder="请选择部门" style="width: 220px" />
        </a-space>
        <div class="nav-icons-user">
          <a-tooltip content="返回作品集目录" position="top">
            <IconHome class="nav-icon" style="cursor:pointer;" @click="goPortfolio" />
          </a-tooltip>
          <a-tooltip content="导出为pdf" position="top">
            <IconDownload class="nav-icon" @click="downloadDashboardPDF" style="cursor:pointer;" />
          </a-tooltip>
          <IconUser class="nav-icon" />
          <div class="user-info">
            <a-tooltip :content="dbStatus === 'connected' ? '数据库已连接' : '数据库未连接'" position="top">
              <span class="user-name ellipsis">PGSQL</span>
            </a-tooltip>
            <span class="user-role">
              <span
                :class="['status-dot', dbStatus]"
                aria-label="数据库状态"
              ></span>
              {{ dbStatus === 'connected' ? 'Succeed' : (dbStatus === 'checking' ? 'Checking...' : 'Not Connected') }}
            </span>
          </div>
      </div>
    </div>
    </div>
    <div class="main-content">
      <div class="content-area area-a">
        <div class="mini-card-list">
          <div v-for="(item, index) in 4" :key="index" class="mini-card card1-flex">
            <div class="card1-indicator">
              <div class="indicator-content">
                <span class="indicator-icon">
                  <template v-if="index === 1">
                    <!-- 离职人数icon -->
                    <svg t="1748451155797" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="38088" width="40" height="40"><path d="M896 962.56h-768c-51.2 0-93.866667-42.666667-93.866667-93.866667v-614.4c0-51.2 42.666667-93.866667 93.866667-93.866666h310.613333c13.653333 0 25.6 11.946667 25.6 25.6s-11.946667 25.6-25.6 25.6H128c-23.893333 0-42.666667 18.773333-42.666667 42.666666v614.4c0 23.893333 18.773333 42.666667 42.666667 42.666667h768c23.893333 0 42.666667-18.773333 42.666667-42.666667v-614.4c0-23.893333-18.773333-42.666667-42.666667-42.666666H585.386667c-13.653333 0-25.6-11.946667-25.6-25.6s11.946667-25.6 25.6-25.6h310.613333c51.2 0 93.866667 42.666667 93.866667 93.866666v614.4c0 52.906667-42.666667 93.866667-93.866667 93.866667z" fill="#333333" p-id="38089"></path><path d="M348.16 535.893333c-54.613333 0-97.28-44.373333-97.28-98.986666 0-54.613333 44.373333-97.28 97.28-97.28s97.28 44.373333 97.28 97.28c1.706667 56.32-42.666667 98.986667-97.28 98.986666z m0-145.066666c-25.6 0-46.08 20.48-46.08 46.08 0 25.6 20.48 47.786667 46.08 47.786666s46.08-20.48 46.08-47.786666c1.706667-23.893333-18.773333-46.08-46.08-46.08zM512 783.36H186.026667c-13.653333 0-25.6-11.946667-25.6-25.6 0-104.106667 85.333333-189.44 189.44-189.44s189.44 85.333333 189.44 189.44c-1.706667 15.36-13.653333 25.6-27.306667 25.6z m-298.666667-51.2h269.653334c-11.946667-63.146667-68.266667-112.64-134.826667-112.64s-122.88 49.493333-134.826667 112.64zM788.48 663.893333c-6.826667 0-13.653333-1.706667-18.773333-6.826666l-151.893334-151.893334c-10.24-10.24-10.24-25.6 0-35.84s25.6-10.24 35.84 0l151.893334 151.893334c10.24 10.24 10.24 25.6 0 35.84-5.12 3.413333-10.24 6.826667-17.066667 6.826666z" fill="#333333" p-id="38090"></path><path d="M636.586667 663.893333c-6.826667 0-13.653333-1.706667-18.773334-6.826666-10.24-10.24-10.24-25.6 0-35.84l151.893334-151.893334c10.24-10.24 25.6-10.24 35.84 0s10.24 25.6 0 35.84l-151.893334 151.893334c-3.413333 3.413333-10.24 6.826667-17.066666 6.826666z" fill="#333333" p-id="38091"></path><path d="M512 317.44c-54.613333 0-98.986667-44.373333-98.986667-98.986667V160.426667c0-54.613333 44.373333-98.986667 98.986667-98.986667s98.986667 44.373333 98.986667 98.986667v58.026666c0 54.613333-44.373333 98.986667-98.986667 98.986667z m0-204.8c-25.6 0-47.786667 22.186667-47.786667 47.786667v58.026666c0 25.6 22.186667 47.786667 47.786667 47.786667s47.786667-22.186667 47.786667-47.786667V160.426667c0-27.306667-22.186667-47.786667-47.786667-47.786667z" fill="#333333" p-id="38092"></path></svg>
                  </template>
                  <template v-else-if="index === 2">
                    <!-- 入职人数icon -->
                    <svg t="1748451785961" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="63303" width="40" height="40"><path d="M119.13216 820.096V263.36256a13.2864 13.2864 0 0 1 13.27616-13.26592h276.736c6.8864 47.34976 47.744 83.85024 96.9728 83.85024s90.10176-36.49536 96.98816-83.85024h285.23008a13.2864 13.2864 0 0 1 13.26592 13.26592v470.45632h56.00768V263.36256c0-38.19008-31.06816-69.2736-69.2736-69.2736h-284.20096V123.91424a27.99616 27.99616 0 0 0-28.0064-28.0064H436.1216a28.0064 28.0064 0 0 0-28.0064 28.0064v70.17472H132.40832c-38.20544 0-69.28384 31.08352-69.28384 69.2736v556.73856c0 38.19008 31.08352 69.2736 69.28384 69.2736h450.66752v-56.00768H132.40832a13.29664 13.29664 0 0 1-13.27616-13.27104zM464.128 151.91552h83.99872V235.9296c0 23.16288-18.8416 42.00448-42.00448 42.00448s-41.99424-18.8416-41.99424-42.00448V151.91552z" fill="#3E3A39" p-id="63304"></path><path d="M559.03744 637.57824l-103.20896-51.57888 26.69056-38.8352a28.02688 28.02688 0 0 0 4.92032-15.86176V449.32608c0-60.86144-48.64-108.544-110.7456-108.544-62.09536 0-110.7456 47.68256-110.7456 108.544v81.97632c0 5.81632 1.80736 11.48928 5.18144 16.2304l27.19744 38.2464-107.73504 51.58912a27.98592 27.98592 0 0 0-15.90272 25.25696v52.0448a28.0064 28.0064 0 0 0 28.0064 28.0064h343.81824a28.00128 28.00128 0 0 0 28.0064-28.0064v-52.0448a28.0064 28.0064 0 0 0-15.48288-25.04704z m-40.52992 49.09056H230.69696v-6.4l121.83552-58.34752a27.97568 27.97568 0 0 0 15.01184-18.24256 28.04224 28.04224 0 0 0-4.29568-23.2448l-41.2928-58.07616V449.32608c0-29.45536 24.0384-52.53632 54.73792-52.53632s54.73792 23.08096 54.73792 52.53632v73.27744l-39.99744 58.19904a28.04224 28.04224 0 0 0-4.03456 22.8608 27.97568 27.97568 0 0 0 14.592 18.048l116.51584 58.22464v6.7328zM737.15712 592.2048c15.47776 0 28.0064-12.53888 28.0064-28.0064s-12.52352-28.0064-28.0064-28.0064H623.36c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h113.79712zM623.36 417.47968c-15.47776 0-28.0064 12.53888-28.0064 28.0064s12.52352 28.0064 28.0064 28.0064h178.19648a28.00128 28.00128 0 0 0 28.0064-28.0064 27.99616 27.99616 0 0 0-28.0064-28.0064H623.36z" fill="#3E3A39" p-id="63305"></path><path d="M683.40736 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63306"></path><path d="M820.51072 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63307"></path><path d="M957.60896 830.60224m-58.76736 0a58.76736 58.76736 0 1 0 117.53472 0 58.76736 58.76736 0 1 0-117.53472 0Z" fill="#3E3A39" p-id="63308"></path></svg>
                  </template>
                  <template v-else-if="index === 3">
                    <!-- 转正人数icon -->
                    <svg t="1748452547151" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="71215" width="40" height="40"><path d="M502.4 313.6c35.2 0 67.2-28.8 67.2-67.2V144h-131.2v105.6c-3.2 35.2 25.6 64 64 64z" p-id="71216" fill="#2c2c2c"></path><path d="M889.6 240h-275.2v6.4c0 64-51.2 115.2-115.2 115.2S384 313.6 384 249.6v-9.6H134.4c-22.4 0-41.6 19.2-41.6 41.6v556.8c0 22.4 19.2 41.6 41.6 41.6h755.2c22.4 0 41.6-19.2 41.6-41.6V281.6c0-22.4-19.2-41.6-41.6-41.6zM524.8 732.8H179.2v-51.2l137.6-67.2-44.8-64v-83.2c0-44.8 38.4-80 83.2-80 44.8 0 83.2 35.2 83.2 80v83.2l-44.8 64 131.2 67.2v51.2z m105.6-300.8H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6-3.2-16 9.6-25.6 22.4-25.6z m0 112H736c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6h-105.6c-12.8 0-25.6-12.8-25.6-25.6 0-16 12.8-25.6 25.6-25.6z m169.6 153.6h-166.4c-12.8 0-25.6-12.8-25.6-25.6s12.8-25.6 25.6-25.6H800c12.8 0 25.6 12.8 25.6 25.6s-12.8 25.6-25.6 25.6z" p-id="71217" fill="#2c2c2c"></path></svg>
                  </template>
                  <template v-else>
                    <!-- 在职人数icon -->
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
      <div class="content-area area-b">
        <div class="b-card-list">
          <div class="b-card b-chart-card">
            <div class="b-charts-grid">
              <BaseCard name="月度趋势" class="b-chart-a1" v-model:zoom="a1Zoom">
                <template #default>
                  <div ref="a1LineChartRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="a1Zoom">
                  <div ref="a1LineChartZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
              <div class="b-charts-row">
                <BaseCard name="年龄分布" class="b-chart-a2" v-model:zoom="a2Zoom">
                  <template #default>
                    <div ref="a2PieChartRef" style="width:100%;height:100%;"></div>
                  </template>
                  <template #default v-if="a2Zoom">
                    <div ref="a2PieChartZoomRef" style="width:100%;height:100%;"></div>
                  </template>
                </BaseCard>
                <BaseCard name="职级分布" class="b-chart-a3" v-model:zoom="a3Zoom">
                  <template #default>
                    <div ref="a3BarChartRef" style="width:100%;height:100%;"></div>
                  </template>
                  <template #default v-if="a3Zoom">
                    <div ref="a3BarChartZoomRef" style="width:100%;height:100%;"></div>
                  </template>
                </BaseCard>
              </div>
            </div>
          </div>
          <div class="b-card b-table-card">
            <!-- 部门统计表格，放大时弹窗内容区高度固定，表格高度100%防止溢出 -->
            <BaseCard name="部门统计" v-model:zoom="tableZoom">
              <template #default>
                <div style="max-height:76vh;overflow:auto;">
                  <el-table
                    :data="bTableData"
                    style="width: 100%"
                    :max-height="tableZoom ? 'calc(76vh - 48px)' : 475"
                  >
                    <el-table-column prop="dept" label="部门" />
                    <el-table-column prop="total" label="人数" />
                    <el-table-column prop="onJob" label="在职" />
                    <el-table-column prop="leave" label="离职" />
                    <el-table-column prop="entry" label="入职" />
                    <el-table-column prop="regular" label="转正" />
                  </el-table>
                </div>
              </template>
            </BaseCard>
          </div>
        </div>
      </div>
      <div class="content-area area-c">
        <div class="c-card-list">
          <div class="c-card">
            <div class="c-subcard-list">


              <BaseCard name="男女比例" class="c-subcard" v-model:zoom="genderZoom" style="padding:0;">
                <template #default>
                  <div ref="genderPieRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="genderZoom">
                  <div ref="genderPieZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>



              <BaseCard name="学历分布" class="c-subcard" v-model:zoom="eduZoom" style="padding:0;">
                <template #default>
                  <div ref="eduPieRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="eduZoom">
                  <div ref="eduPieZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
              <BaseCard name="司龄分布" class="c-subcard" v-model:zoom="workAgeZoom" style="padding:0;">
                <template #default>
                  <div ref="workAgePieRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="workAgeZoom">
                  <div ref="workAgePieZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
            </div>
          </div>
          <div class="c-card">
            <div class="c-subcard-list">
              <BaseCard name="组织结构" class="c-subcard" v-model:zoom="orgTreeZoom" style="padding:0;">
                <template #default>
                  <div ref="orgTreeRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="orgTreeZoom">
                  <div ref="orgTreeZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
              <BaseCard name="绩效考核分布" class="c-subcard" v-model:zoom="performanceBarZoom" style="padding:0;">
                <template #default>
                  <div ref="performanceBarRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="performanceBarZoom">
                  <div ref="performanceBarZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
            </div>
          </div>
          <div class="c-card">
            <div class="c-subcard-list">
              <BaseCard name="人员岗位分布" class="c-subcard" v-model:zoom="jobStackZoom" style="padding:0;">
                <template #default>
                  <div ref="jobStackRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="jobStackZoom">
                  <div ref="jobStackZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
              <BaseCard name="人员地区分布" class="c-subcard" v-model:zoom="regionMapZoom" style="padding:0;">
                <template #default>
                  <div ref="regionMapRef" style="width:100%;height:100%;"></div>
                </template>
                <template #default v-if="regionMapZoom">
                  <div ref="regionMapZoomRef" style="width:100%;height:100%;"></div>
                </template>
              </BaseCard>
            </div>
    </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { IconHome, IconDownload, IconUser } from '@arco-design/web-vue/es/icon';
import { Space as ASpace, TreeSelect as ATreeSelect, Tooltip as ATooltip } from '@arco-design/web-vue';
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as echarts from 'echarts';
import BaseCard from '../components/BaseCard.vue';
import { ElTable, ElTableColumn } from 'element-plus';
import 'element-plus/dist/index.css';

const router = useRouter();

// 按钮激活与路由跳转
const activeBtn = ref('overview');
function setActiveBtn(name) {
  activeBtn.value = name;
  if (name === 'overview') {
    router.push('/hr-dashboard');
  }
  // 取消作战地图跳转逻辑
}

// 首页图标点击
function goPortfolio() {
  router.push('/portfolio');
}

// 下载PDF逻辑
async function downloadDashboardPDF() {
  const el = document.body; // 可根据实际需求替换为主内容ref
  if (!el) return;
  const canvas = await html2canvas(el, { useCORS: true, backgroundColor: null });
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('HR-Dashboard.pdf');
}

// 数据库状态逻辑
const dbStatus = ref('checking');
onMounted(async () => {
  try {
    // 可用mock接口或实际接口
    const res = await fetch('/api/db-status');
    const data = await res.json();
    dbStatus.value = data.status === 'connected' ? 'connected' : 'error';
  } catch (e) {
    dbStatus.value = 'error';
  }
});

// 部门筛选器
const selectedDept = ref([]);
const treeData = [
  { key: '1', title: '技术部', children: [ { key: '1-1', title: '前端组' }, { key: '1-2', title: '后端组' } ] },
  { key: '2', title: '产品部' },
  { key: '3', title: '设计部' }
];

// 小卡片图表数据和ref
const cardBarRefs = ref([]);
const card1BarData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31];
const card1BarMonths = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

onMounted(() => {
  nextTick(() => {
    cardBarRefs.value.forEach((el, idx) => {
      if (el) {
        const chart = echarts.init(el);
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
        });
        window.addEventListener('resize', () => chart.resize());
      }
    });
  });
});

const a1LineChartRef = ref(null);
const a1LineChartZoomRef = ref(null);
const a1Zoom = ref(false);

function renderA1LineChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const entryData = [12, 18, 15, 20, 25, 22, 30, 28, 26, 32, 35, 31]; // 入职
    const leaveData = [3, 5, 4, 6, 7, 5, 8, 7, 6, 9, 10, 8]; // 离职
    chart.setOption({
      title: { text: '', left: 'left', top: 0 },
      tooltip: { trigger: 'axis' },
      legend: { data: ['入职', '离职'], right: 20, top: 10, textStyle: { fontSize: 15, color: '#222' }, itemWidth: 30 },
      grid: { left: 42, right: 0, top: 40, bottom: 28 },
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
          name: '入职',
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
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderA1LineChart(a1LineChartRef);
  });
});

watch(a1Zoom, (val) => {
  if (val) {
    nextTick(() => {
      renderA1LineChart(a1LineChartZoomRef);
    });
  } else {
    nextTick(() => {
      renderA1LineChart(a1LineChartRef);
    });
  }
});

const a2PieChartRef = ref(null);
const a2PieChartZoomRef = ref(null);
const a2Zoom = ref(false);

function renderA2PieChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
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
}

onMounted(() => {
  nextTick(() => {
    renderA2PieChart(a2PieChartRef);
  });
});

watch(a2Zoom, (val) => {
  if (val) {
    nextTick(() => {
      renderA2PieChart(a2PieChartZoomRef);
    });
  } else {
    nextTick(() => {
      renderA2PieChart(a2PieChartRef);
    });
  }
});

const a3BarChartRef = ref(null);
const a3BarChartZoomRef = ref(null);
const a3Zoom = ref(false);

function renderA3BarChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      grid: { top: 10, bottom: 20, left: 30, right: 20 },
      xAxis: {
        type: 'value',
        max: 135,
        splitLine: { show: false },
        axisLabel: { show: false }
      },
      yAxis: {
        type: 'category',
        data: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'],
        axisLabel: { fontSize: 13 },
        splitLine: { show: false },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          data: [30, 50, 80, 120, 90, 60, 20],
          type: 'bar',
          showBackground: true,
          backgroundStyle: { color: 'rgba(180, 180, 180, 0.2)' },
          label: {
            show: true,
            position: 'right',
            color: '#1d1e21',
            fontSize: 14,
            formatter: '{c}人'
          },
          itemStyle: { color: '#3044f2' }
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderA3BarChart(a3BarChartRef);
  });
});

watch(a3Zoom, (val) => {
  if (val) {
    nextTick(() => {
      renderA3BarChart(a3BarChartZoomRef);
    });
  } else {
    nextTick(() => {
      renderA3BarChart(a3BarChartRef);
    });
  }
});

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

// 部门统计表格放大状态
const tableZoom = ref(false);

const genderPieRef = ref(null);
const genderPieZoomRef = ref(null);
const genderZoom = ref(false);

function renderGenderPieChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      color: ['#2257f4', '#ffb300'],
      series: [
        {
          name: '男女比例',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          label: {
            formatter: '{b}\n{d}%'
          },
          data: [
            { value: 60, name: '男' },
            { value: 40, name: '女' }
          ]
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderGenderPieChart(genderPieRef);
  });
});

watch(genderZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderGenderPieChart(genderPieZoomRef);
    });
  } else {
    nextTick(() => {
      renderGenderPieChart(genderPieRef);
    });
  }
});

const eduPieRef = ref(null);
const eduPieZoomRef = ref(null);
const eduZoom = ref(false);

function renderEduPieChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          name: '学历分布',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 50, name: '博士' },
            { value: 200, name: '硕士' },
            { value: 600, name: '本科' },
            { value: 300, name: '大专' },
            { value: 100, name: '其他' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderEduPieChart(eduPieRef);
  });
});

watch(eduZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderEduPieChart(eduPieZoomRef);
    });
  } else {
    nextTick(() => {
      renderEduPieChart(eduPieRef);
    });
  }
});

const workAgePieRef = ref(null);
const workAgePieZoomRef = ref(null);
const workAgeZoom = ref(false);

function renderWorkAgePieChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { show: false },
      series: [
        {
          name: '司龄分布',
          type: 'pie',
          radius: '70%',
          data: [
            { value: 120, name: '1年以下' },
            { value: 300, name: '1-3年' },
            { value: 250, name: '3-5年' },
            { value: 180, name: '5-10年' },
            { value: 80, name: '10年以上' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderWorkAgePieChart(workAgePieRef);
  });
});

watch(workAgeZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderWorkAgePieChart(workAgePieZoomRef);
    });
  } else {
    nextTick(() => {
      renderWorkAgePieChart(workAgePieRef);
    });
  }
});

const orgTreeRef = ref(null);
const orgTreeZoomRef = ref(null);
const orgTreeZoom = ref(false);

function renderOrgTreeChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'item', triggerOn: 'mousemove' },
      series: [
        {
          type: 'tree',
          data: [
            {
              name: '公司',
              children: [
                {
                  name: '技术部',
                  children: [
                    { name: '前端组' },
                    { name: '后端组' }
                  ]
                },
                {
                  name: '产品部',
                  children: [
                    { name: '产品经理' }
                  ]
                },
                {
                  name: '设计部',
                  children: [
                    { name: 'UI组' },
                    { name: 'UX组' }
                  ]
                }
              ]
            }
          ],
          top: '5%',
          left: '10%',
          bottom: '5%',
          right: '20%',
          symbolSize: 16,
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right',
            fontSize: 15
          },
          leaves: {
            label: {
              position: 'right',
              verticalAlign: 'middle',
              align: 'left'
            }
          },
          expandAndCollapse: true,
          animationDuration: 400,
          animationDurationUpdate: 250
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderOrgTreeChart(orgTreeRef);
  });
});

watch(orgTreeZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderOrgTreeChart(orgTreeZoomRef);
    });
  } else {
    nextTick(() => {
      renderOrgTreeChart(orgTreeRef);
    });
  }
});

const jobStackRef = ref(null);
const jobStackZoomRef = ref(null);
const jobStackZoom = ref(false);

function renderJobStackChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      legend: { top: 10 },
      grid: { left: 40, right: 20, bottom: 30, top: 40 },
      xAxis: {
        type: 'category',
        data: ['技术', '产品', '设计'],
        axisTick: { alignWithLabel: true }
      },
      yAxis: { type: 'value', name: '人数' },
      series: [
        {
          name: '前端',
          type: 'bar',
          stack: '岗位',
          data: [30, 0, 0]
        },
        {
          name: '后端',
          type: 'bar',
          stack: '岗位',
          data: [40, 0, 0]
        },
        {
          name: '测试',
          type: 'bar',
          stack: '岗位',
          data: [20, 0, 0]
        },
        {
          name: '产品经理',
          type: 'bar',
          stack: '岗位',
          data: [0, 25, 0]
        },
        {
          name: '项目经理',
          type: 'bar',
          stack: '岗位',
          data: [0, 15, 0]
        },
        {
          name: 'UI',
          type: 'bar',
          stack: '岗位',
          data: [0, 0, 18]
        },
        {
          name: 'UX',
          type: 'bar',
          stack: '岗位',
          data: [0, 0, 12]
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderJobStackChart(jobStackRef);
  });
});

watch(jobStackZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderJobStackChart(jobStackZoomRef);
    });
  } else {
    nextTick(() => {
      renderJobStackChart(jobStackRef);
    });
  }
});

const performanceBarRef = ref(null);
const performanceBarZoomRef = ref(null);
const performanceBarZoom = ref(false);

function renderPerformanceBarChart(targetRef) {
  if (targetRef.value) {
    const chart = echarts.init(targetRef.value);
    chart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: 40, right: 20, bottom: 30, top: 30 },
      xAxis: { type: 'value', name: '人数' },
      yAxis: {
        type: 'category',
        data: ['A档', 'B档', 'C档', 'D档'],
        axisTick: { alignWithLabel: true }
      },
      series: [
        {
          name: '人数',
          type: 'bar',
          data: [20, 50, 25, 5],
          itemStyle: {
            color: function(params) {
              const colors = ['#2257f4', '#4e7fff', '#ffb300', '#ff3b3b'];
              return colors[params.dataIndex % colors.length];
            }
          },
          barWidth: 24,
          label: {
            show: true,
            position: 'right',
            formatter: '{c}人'
          }
        }
      ]
    });
    window.addEventListener('resize', () => chart.resize());
  }
}

onMounted(() => {
  nextTick(() => {
    renderPerformanceBarChart(performanceBarRef);
  });
});

watch(performanceBarZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderPerformanceBarChart(performanceBarZoomRef);
    });
  } else {
    nextTick(() => {
      renderPerformanceBarChart(performanceBarRef);
    });
  }
});

const regionMapRef = ref(null);
const regionMapZoomRef = ref(null);
const regionMapZoom = ref(false);

// 当前地图级别和名称
const regionMapLevel = ref('china'); // 'china' 或省份行政区划代码
const regionMapProvinceName = ref('');

// 模拟全国数据（省份全称，补全所有省份）
const regionData = [
  { name: '北京市', value: 120 },
  { name: '天津市', value: 90 },
  { name: '上海市', value: 80 },
  { name: '重庆市', value: 70 },
  { name: '河北省', value: 60 },
  { name: '山西省', value: 50 },
  { name: '辽宁省', value: 40 },
  { name: '吉林省', value: 30 },
  { name: '黑龙江省', value: 20 },
  { name: '江苏省', value: 110 },
  { name: '浙江省', value: 100 },
  { name: '安徽省', value: 90 },
  { name: '福建省', value: 80 },
  { name: '江西省', value: 70 },
  { name: '山东省', value: 60 },
  { name: '河南省', value: 50 },
  { name: '湖北省', value: 40 },
  { name: '湖南省', value: 30 },
  { name: '广东省', value: 200 },
  { name: '海南省', value: 10 },
  { name: '四川省', value: 120 },
  { name: '贵州省', value: 20 },
  { name: '云南省', value: 30 },
  { name: '陕西省', value: 40 },
  { name: '甘肃省', value: 10 },
  { name: '青海省', value: 5 },
  { name: '内蒙古自治区', value: 15 },
  { name: '广西壮族自治区', value: 25 },
  { name: '西藏自治区', value: 2 },
  { name: '宁夏回族自治区', value: 3 },
  { name: '新疆维吾尔自治区', value: 8 },
  { name: '香港特别行政区', value: 6 },
  { name: '澳门特别行政区', value: 4 },
  { name: '台湾省', value: 12 }
];
// 模拟省级数据（根据geoJSON自动生成）
async function getProvinceDataByGeoJSON(mapName) {
  const map = echarts.getMap(mapName);
  if (!map) return [];
  const features = map.geoJson.features;
  // 为每个地市分配一个模拟人数（如随机数或固定数值）
  return features.map(f => ({ name: f.properties.name, value: Math.floor(Math.random() * 100) + 10 }));
}

// 动态加载地图geoJSON
async function loadMap(mapName, provinceName = '') {
  if (!echarts.getMap(mapName)) {
    let url = '';
    if (mapName === 'china') {
      url = 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=100000_full';
    } else {
      // 全中国省份行政区划代码（全称）
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

// 省份中心点经纬度映射表
const provinceCenterMap = {
  '北京市': [116.4, 39.9],
  '天津市': [117.2, 39.1],
  '上海市': [121.5, 31.2],
  '重庆市': [106.5, 29.5],
  '广东省': [113.3, 23.1],
  '四川省': [102.7, 30.6],
  '浙江省': [120.2, 29.2],
  '江苏省': [119.0, 32.0],
  '山东省': [118.0, 36.6],
  '河南省': [113.6, 34.7],
  '河北省': [114.5, 38.0],
  '山西省': [112.5, 37.8],
  '辽宁省': [122.6, 41.2],
  '吉林省': [126.2, 43.7],
  '黑龙江省': [127.9, 47.7],
  '安徽省': [117.2, 31.8],
  '福建省': [118.3, 26.1],
  '江西省': [115.9, 27.6],
  '湖北省': [112.2, 30.9],
  '湖南省': [111.7, 27.8],
  '海南省': [109.5, 19.2],
  '贵州省': [106.7, 26.6],
  '云南省': [101.5, 25.0],
  '陕西省': [108.9, 34.3],
  '甘肃省': [103.8, 36.1],
  '青海省': [96.2, 35.6],
  '内蒙古自治区': [113.7, 44.0],
  '广西壮族自治区': [108.3, 23.8],
  '西藏自治区': [89.1, 31.7],
  '宁夏回族自治区': [106.2, 37.8],
  '新疆维吾尔自治区': [85.0, 41.7],
  '香港特别行政区': [114.1, 22.3],
  '澳门特别行政区': [113.5, 22.2],
  '台湾省': [121.0, 23.5]
};

function renderRegionMapChart(targetRef) {
  if (targetRef.value) {
    loadMap(regionMapLevel.value, regionMapProvinceName.value).then(async () => {
      const chart = echarts.init(targetRef.value);
      const isChina = regionMapLevel.value === 'china';
      let seriesData = regionData;
      if (!isChina) {
        // 省级数据自动适配geoJSON
        seriesData = await getProvinceDataByGeoJSON(regionMapLevel.value);
      }
      chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>人数：{c}'
        },
        visualMap: {
          min: 0,
          max: isChina ? 200 : 120,
          left: 20,
          bottom: 20,
          text: ['高','低'],
          inRange: {
            color: ['#e0f3ff', '#4e7fff']
          },
          calculable: true
        },
        graphic: isChina ? [] : [{
          type: 'text',
          left: 20,
          top: 20,
          style: {
            text: '返回全国',
            font: 'bold 16px sans-serif',
            fill: '#2257f4',
            cursor: 'pointer'
          },
          onclick: () => {
            regionMapLevel.value = 'china';
            regionMapProvinceName.value = '';
            renderRegionMapChart(targetRef);
          }
        }],
        series: [
          {
            name: isChina ? '地区分布' : regionMapProvinceName.value,
            type: 'map',
            map: regionMapLevel.value,
            roam: true,
            label: { show: false },
            data: seriesData,
            // 全国地图放大1.6倍并居中，省级地图放大1.2倍自动居中
            ...(isChina
              ? { zoom: 1.6, center: [104.0, 35.5] }
              : { zoom: 1.2, center: provinceCenterMap[regionMapProvinceName.value] || [104.0, 35.5] }
            )
          }
        ]
      });
      chart.off('click');
      chart.on('click', function(params) {
        if (isChina && params.name && params.name !== '其他') {
          regionMapLevel.value = params.name;
          regionMapProvinceName.value = params.name;
          renderRegionMapChart(targetRef);
        }
      });
      window.addEventListener('resize', () => chart.resize());
    });
  }
}

onMounted(() => {
  nextTick(() => {
    renderRegionMapChart(regionMapRef);
  });
});

watch(regionMapZoom, (val) => {
  if (val) {
    nextTick(() => {
      renderRegionMapChart(regionMapZoomRef);
    });
  } else {
    nextTick(() => {
      renderRegionMapChart(regionMapRef);
    });
  }
});
</script>

<style scoped>
.test-dashboard-bg {
  background: linear-gradient(to bottom, #1f2125 0%, #1f2125 13.5%, #f3f0f0 13.5%, #f3f0f0 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
}
.hr-section.section-1.nav-bar-fixed {
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

.nav-selectors {
  border: 2px solid #597ef7;
  flex-shrink: 0;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 4px;
  
  background: #23242a;
  display: flex;
  align-items: center;
}

/* Arco TreeSelect深色适配 */
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
.user-role {
  font-size: 8px;
  color: #bdbdbd;
  display: flex;
  align-items: center;
  min-width: 0;
  white-space: nowrap;
  text-align: left;
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  vertical-align: middle;
  background: #bdbdbd;
  box-shadow: 0 0 2px #888;
  transition: background 0.2s;
}
.status-dot.connected {
  background: #00d26a !important;
}
.status-dot.checking {
  background: #ffb300 !important;
}
.status-dot.error {
  background: #ff3b3b !important;
}
.main-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 2.575rem;
  margin-left: 4.375rem;
  margin-right: 4.375rem;
 margin-bottom: 1.5rem;
}


.area-a {
  
  height: 11rem;
  width: 100%;
}
.area-b { 

height: 32rem;


}
.area-c {

  height: 730px;
}




.mini-card-list {
  display: flex;
  gap: 16px;
  width: 100%;
  height: 100%;
  align-items: stretch;
}
.mini-card {
  flex: 1 1 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
  font-weight: 500;
  padding: 0;
}
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
.card1-bar-chart {
  width: 100%;
  height: 100%;
  min-height: 120px;
}
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
.b-card-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 100%;
  margin: 0;
  padding: 0;
}
.b-card {
  flex: 1 1 0;
  background: #f1eded;
  border-radius: 0;
  box-shadow: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
}
.b-charts-grid {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  width: 100%;
  margin: 0;
  padding: 0;
}
.b-chart-a1 {
  flex: 1 1 0;
  background: transparent;
  display: flex;
  background: #fff;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  box-shadow: none;
  border: none;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.b-charts-row {
  display: flex;
  flex: 1 1 0;
  gap: 16px;
  height: 0;
  width: 100%;
  margin: 0;
  padding: 0;
}
.b-chart-a2, .b-chart-a3 {
  flex: 1 1 0;
  background: transparent;
  display: flex;
  align-items: center;
  background: #fff;
  justify-content: center;
  border-radius: 0;
  box-shadow: none;
  border: none;
  width: 100%;
  margin: 0;
  padding: 0;
}
:deep(.base-card-content) {
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  box-sizing: border-box;
}
.c-card-list {
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 100%;
}
.c-card {
  flex: 1 1 0;
  border: none;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #333;
}
.c-card:nth-child(1) {
  flex: 0 0 24.3%;
  max-width: 24.3%;
}
.c-card:nth-child(2), .c-card:nth-child(3) {
  flex: 1 1 0;
  max-width: 37.5%;
}
.c-subcard-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  width: 100%;
}
.c-subcard {
  background: #fff;
  flex: 1 1 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  font-size: 1rem;
  color: #333;
}
</style>

<style>
/* 强制限制 BaseCard 放大弹窗内容区最大高度，防止表格撑满屏幕 */
:deep(.arco-modal-body),
:deep(.base-card-modal-content) {
  max-height: 80vh !important;
  overflow: auto !important;
}
</style>