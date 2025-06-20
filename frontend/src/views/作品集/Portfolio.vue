<template>
    <Header />
    <div class="contents">
      <div class="title-area">
        <div class="portfolio-title-row">
          <h1 class="portfolio-title">作品集</h1>
          <button class="button" @click="handleMore">
            <div class="button-box">
              <span class="button-elem">
                <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
                </svg>
              </span>
              <span class="button-elem">
                <svg viewBox="0 0 46 40">
                  <path
                    d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"
                  ></path>
                </svg>
              </span>
            </div>
          </button>
        </div>
      </div>
      <div class="content-area">
        <div class="project-card-list">
          <div class="project-card" @click="goLogistics">
            <div class="project-background logistics-background" :style="{ backgroundImage: `url(${logisticsCoverImg})` }"></div>
            <div class="project-info">
              <div class="project-title">物流中心运营监控大屏</div>
              <div class="project-desc">物流中心视角下的仓库态势监控大屏</div>
            </div>
          </div>
          <div class="project-card" @click="goHumanResource">
            <div class="project-background hr-background" :style="{ backgroundImage: `url(${hrCoverImg})` }"></div>
            <div class="project-info">
              <div class="project-title">人力资源分析大屏</div>
              <div class="project-desc">统筹人力资源分全流程分析</div>
            </div>
          </div>
          <div class="project-card" @click="goGmv">
            <div class="project-background milktea-background" :style="{ backgroundImage: `url(${milkteaCoverImg})` }"></div>
            <div class="project-info">
              <div class="project-title">深圳X奶茶店运营大屏</div>
              <div class="project-desc">深圳X奶茶店运营数据可视化大屏</div>
            </div>
          </div>
          <div class="project-card" @click="goAdvertising">
            <div class="project-background building-background" :style="{ backgroundImage: `url(${buildingCoverImg})` }"></div>
            <div class="project-info">
              <div class="project-title">3D楼宇数字可视化</div>
              <div class="project-desc">3D楼宇数字孪生与可视化大屏</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // 引入 Header 组件
  import Header from '../../components/公共导航栏组件/Header.vue'
  import BaseCard from '../../components/卡片组件/BaseCard.vue'
  import DrillModal from '../../components/下钻组件/DrillModal.vue'
  
  // 引入 useRouter
  import { useRouter } from 'vue-router'
  // 获取router实例
  const router = useRouter()
  // 处理"更多"按钮点击事件，跳转到首页（目录页）
  function handleMore() {
    router.push('/')
  }
  
  // 引入人力资源封面图片
  import hrCoverImg from '@/assets/hr封面.png'
  import logisticsCoverImg from '@/assets/物流封面.png'
  import milkteaCoverImg from '@/assets/开发中黑色封面.jpg'
  import buildingCoverImg from '@/assets/开发中红色封面.jpg'
  
  // 处理项目卡片点击事件
  function goLogistics() {
    router.push('/logistics')
  }
  function goHumanResource() {
    router.push('/human-resource')
  }
  // 处理GMV卡片点击事件
  function goGmv() {
    router.push('/CombatMap') // 跳转到作战地图页面
  }
  // 处理广告投放卡片点击事件
  function goAdvertising() {
    router.push('/building-digital-twin') // 跳转到3D楼宇数字孪生与可视化大屏页面
  }
  // 这里可以添加测试用的逻辑
  
  // 自动重置全局样式，防止页面整体缩放异常
  import { onMounted, onUnmounted } from 'vue'
  onMounted(() => {
    document.documentElement.style.fontSize = '16px';
    document.body.style.transform = 'none';
    document.body.style.zoom = '1';
    document.body.style.width = 'auto';
    document.body.style.maxWidth = 'none';
  })

  onUnmounted(() => {
    document.documentElement.style.fontSize = '16px';
    document.body.style.transform = 'none';
    document.body.style.zoom = '1';
    document.body.style.width = 'auto';
    document.body.style.maxWidth = 'none';
  })
  </script>
  
  <style scoped>
  .contents {
    width: 670px;
    height: calc(100vh - 65px); /* 占据整个视口高度 */
    display: flex;
    flex-direction: column;
    /* align-items: center; /* 根据需要调整是否居中内容 */
    /* justify-content: center; /* 根据需要调整是否居中内容 */
  
    /* padding-bottom: 90px; /* 不考虑Header，所以去掉预留空间 */
    box-sizing: border-box;
    overflow: auto; /* 内容超出时自身滚动 */
    margin: 0 auto; /* 水平居中 */
    padding: 0 1.2rem;
    margin-top: 20px;
  }
  
  .title-area {
    /* 标题区域样式 */
    padding: 1rem 0;
  
    text-align: center;
  
 
  }
  
  .content-area {
    /* 内容区域样式 */
    flex: 1; /* 填满剩余空间 */
    min-height: 0; /* 防止内容过多撑破 */
    padding: 0;
    
  }
  
  /* 根据需要调整h1和p的样式 */
  h1 {
    margin-top: 0;
  }
  p {
    margin-bottom: 0;
  }
  
  /* 从Portfolio.vue复制的标题和按钮样式 */
  .portfolio-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  
  }
  .portfolio-title {
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
  }
  .button {
    display: block;
    position: relative;
    width: 56px;
    height: 56px;
    margin: 0;
    overflow: hidden;
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: 0;
  }
  .button:before,
  .button:after {
    content: "";
    position: absolute;
    border-radius: 50%;
    inset: 7px;
  }
  .button:before {
    border: 4px solid #222;
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }
  .button:after {
    border: 4px solid #222;
    transform: scale(1.3);
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
  }
  .button:hover:before,
  .button:focus:before {
    opacity: 0;
    transform: scale(0.7);;
    transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .button:hover:after,
  .button:focus:after {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.4s cubic-bezier(0.77, 0, 0.175, 1) 80ms,
      transform 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 80ms;
  }
  .button-box {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
  }
  .button-elem {
    display: block;
    width: 20px;
    height: 20px;
    margin: 17px 18px 0 18px;
    transform: rotate(180deg);
    fill: #222;
  }
  .button:hover .button-box,
  .button:focus .button-box {
    transition: 0.4s;
    transform: translateX(-56px);
  }
  
  /* 作品集卡片样式（与首页一致） */
  .project-card-list {
    display: flex;
    gap: 24px;
    margin-bottom: 32px;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .project-card {
    background: #fff;
    border: 2px solid #ebebeb;
    border-radius: 0;
    flex: 1 1 0;
    min-width: 260px;
    max-width: 48%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all 300ms cubic-bezier(.4,2,.6,1), box-shadow 300ms cubic-bezier(.4,2,.6,1);
    position: relative;
    align-items: center;
    justify-content: center;
    height: 19rem;
    min-height: 19rem;
    max-height: 19rem;
  }
  .project-card:hover {
    transform: rotateZ(1deg) rotateY(10deg) scale(1.06);
    z-index: 2;
  }
  .project-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0;
    pointer-events: none;
    opacity: 0.5;
    transition: opacity 0.3s;
  }
  .project-card:hover::after {
    opacity: 1;
  }
  .project-info {
    padding: 16px 18px 12px 18px;
    background: #fdfdfd;
    text-align: left;
    width: 100%;
    height: 4.6875rem; /* 75px 转换为 rem */
    border-top: 1.5px solid #e1e1e1;
  }
  .project-title {
    font-size: 1.1rem;
    font-weight: bold;
    color: #222;
  }
  .project-desc {
    color: #888;
    font-size: 0.98rem;
    margin-top: 4px;
  }
  .project-background {
    width: 100%;
    height: 14.375rem; /* 230px 转换为 rem */
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
  .hr-background {
    background-size: cover;
    background-position: center;
  }
  .milktea-background {
    background-size: cover;
    background-position: center;
  }
  .building-background {
    background-size: cover;
    background-position: center;
  }
  </style> 