<template>

<Header />

  <div class="home-root">
    
    <div class="home-header-row">
      <div>
        <div class="home-title">梁永顺</div>
      
        <div class="home-subtitle">数据分析 看板开发</div>
      </div>
      <img class="home-avatar" src="../assets/头像.JPG" alt="avatar" />
    </div>
    <div class="home-section">
      <div class="home-section-title">个人优势</div>
      <div class="home-desc" style="text-align: left;">
        <ul style=" margin: 0;">
          <li>精通SQL语法，熟练使用Mysql，GaussDB，PostgreSQL各类数据库</li>
          <li>精通Python，熟练使用Numpy,Pandas对数据进行分析处理，并用Pyecharts创建图表</li>
          <li>熟练使用Excel，Tableau，帆软BI，Echarts.js制作各种可视化图表及仪表盘制作</li>
          <li>构建AI扣子工作流赋能业务分析，减少手工操作作业，提升分析效率</li>
          <li>掌握多种分析方法和模型，AB测试，同期群分析，描述性分析，拆解分析，漏斗转化，SWOT，AARRR，AIPL模型</li>
        </ul>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title">技术栈</div>
      <div class="tech-icons-row">
        <div
          v-for="(icon, idx) in techIcons"
          :key="idx"
          class="tech-icon-card"
        >
          <img :src="icon.src" :alt="icon.name" class="tech-icon-img" />
          <span class="tech-icon-name">{{ icon.name }}</span>
        </div>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title-row">
        <span class="home-section-title">作品集</span>
        <a class="more-link" @click.prevent="goPortfolio">查看更多作品 &gt;</a>
      </div>
      <div class="project-card-list">
        <div class="project-card" @click="goLogistics">
          <div class="project-background"></div>
          <div class="project-info">
            <div class="project-title">物流中心运营监控大屏</div>
            <div class="project-desc">物流中心视角下的仓库态势监控大屏</div>
          </div>
        </div>
        <div class="project-card" @click="goHumanResource">
          <div class="project-background hr-background"></div>
          <div class="project-info">
            <div class="project-title">人力资源分析大屏</div>
            <div class="project-desc">统筹人力资源分全流程分析</div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title-row">
        <span class="home-section-title">博客</span>
        <a class="more-link" @click.prevent="goBlog">查看更多笔记 &gt;</a>
      </div>
      <div class="blog-list">
        <a class="blog-card" href="#">
          <div class="blog-title">AB测试</div>
          <div class="blog-desc">AB测试的原理和应用</div>
          <span class="blog-arrow">↗</span>
        </a>
        <a class="blog-card" href="#">
          <div class="blog-title">统计学</div>
          <div class="blog-desc">统计学基础知识</div>
          <span class="blog-arrow">↗</span>
        </a>
      </div>
    </div>
    <div class="home-section">
      <div class="home-section-title">Contect</div>
      <div class="social-card-list">
        <div class="social-card">
          <img class="social-icon" :src="githubIcon" alt="github" style="width:40px;height:40px;" />
          <span class="social-name">@Dataseek</span>
        </div>
        <div class="social-card">
          <img class="social-icon" :src="gitlabIcon" alt="gitlab" style="width:40px;height:40px;" />
          <span class="social-name">@Dataseek</span>
        </div>
        <div class="social-card">
          <img class="social-icon" :src="dingtalkIcon" alt="dingtalk" style="width:40px;height:40px;" />
          <span class="social-name">@Dataseek</span>
        </div>
        <div class="social-card">
          <img class="social-icon" :src="feishuIcon" alt="feishu" style="width:40px;height:40px;" />
          <span class="social-name">@Dataseek</span>
        </div>
      </div>
    </div>
    
  </div>
</template>



<script setup>
import Header from '../components/公共导航栏组件/Header.vue'
import icon1 from '../assets/帆软BI-copy.png'
import icon2 from '../assets/剪映.png'
import icon3 from '../assets/css.png'
import icon4 from '../assets/Excel.png'
import icon5 from '../assets/Figma.png'
import icon6 from '../assets/html.png'
import icon7 from '../assets/javascript.png'
import icon8 from '../assets/MySQL.png'
import icon9 from '../assets/navicat.png'
import icon10 from '../assets/pgsql.png'
import icon11 from '../assets/PPT.png'
import icon12 from '../assets/python.png'
import icon13 from '../assets/tableau.png'
import icon14 from '../assets/Vue.png'
import icon15 from '../assets/Node.js.png'
import icon16 from '../assets/vscode.png'
import githubIcon from '../assets/github.png'
import gitlabIcon from '../assets/gitlab.png'
import dingtalkIcon from '../assets/钉钉.png'
import feishuIcon from '../assets/飞书.png'
import { useRouter } from 'vue-router'

const techIcons = [
  { src: icon12, name: 'Python' },
  { src: icon8, name: 'MySQL' },
  { src: icon10, name: 'PostgreSQL' },
  { src: icon13, name: 'Tableau' },
  { src: icon1, name: '帆软BI' },
  { src: icon4, name: 'Excel' },
  { src: icon11, name: 'PPT' },
  { src: icon9, name: 'Navicat' },
  { src: icon16, name: 'VSCode' },
  { src: icon5, name: 'Figma' },
  { src: icon2, name: '剪映' },
  { src: icon6, name: 'HTML' },
  { src: icon3, name: 'CSS' },
  { src: icon7, name: 'JavaScript' },
  { src: icon14, name: 'Vue' },
  { src: icon15, name: 'Node.js' },
]

const router = useRouter()
function goLogistics() {
  router.push('/logistics')
}

function goPortfolio() {
  router.push('/portfolio')
}

function goHumanResource() {
  router.push('/human-resource')
}

function goBlog() {
  router.push('/blog')
}

function goFeishu() {
  window.open('https://www.feishu.cn/invitation/page/add_contact/?token=59fsaa9d-4cbb-4955-b18f-6d0699461cae&amp;unique_id=BNuMbLeMuGYQeQLnnJCopg==', '_blank')
}
</script>





<style scoped>
.home-root {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 16px calc(64px + 18px) 16px !important; /* 顶部padding 64px，底部为Header高度64px + 原有底部padding 16px */
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #222;
  min-height: 100vh !important;
  box-sizing: border-box;
  overflow-y: auto;
margin-top: 65px;

  
}
body, html, #app {
  min-height: 100vh;
}

body.dark {
  background: #18181c;
  color: #eee;
}
body.dark .home-root {
  background: #23232a;
  color: #eee;
}
body.dark .home-section-title,
body.dark .home-title,
body.dark .home-subtitle {
  color: #eee;
}
body.dark .project-card,
body.dark .project-info,
body.dark .blog-card,
body.dark .social-card,
body.dark .tech-icon-card {
  background: #23232a;
  color: #eee;
  border-color: #333;
}
body.dark .project-desc,
body.dark .blog-desc,
body.dark .social-name,
body.dark .tech-icon-name {
  color: #bbb;
}
body.dark .navbar-tooltip {
  background: #333;
  color: #fff;
}
body.dark .tech-icon-img {
  background: #222;
}
/* body.dark .more-link::after {
  background: none;
} */

.home-desc ul {
  list-style: disc !important;
  padding-left: 1.5em;
  margin: 0;
}
.home-desc li {
  margin-bottom: 4px;
}



.home-header-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}
.home-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  text-align: left;
}
.home-subtitle {
  font-size: 1.1rem;
  color: #888;
  font-weight: 500;
}
.home-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
}
.home-section {
  width: 100%;

  margin-bottom: 32px;

}
.home-section-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: left;
}
.home-section-title-row {
  display: flex;
  align-items: center;

  justify-content: space-between;
  margin-bottom: 12px;
}
.more-link {
  font-size: 0.98rem;
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.more-link:hover {
  color: #888;
}
.more-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 0;
  height: 2px;
  background: #111;
  transition: width 0.6s cubic-bezier(.4,2,.6,1), left 0.6s cubic-bezier(.4,2,.6,1);
}
.more-link:hover::after {
  width: 100%;
  left: 0;
}
.home-desc {
  color: #444;
 
  font-size: 1.05rem;
  line-height: 1.7;
}
.tech-icons-row {
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
  margin-top: 16px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
 
  justify-content: flex-start;
}
.tech-icon-card {
  width: 12.5%;
  min-width: 48px;
  max-width: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  padding-left: 0;
  padding-right: 0;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1);
  cursor: pointer;
  position: relative;
}
.tech-icon-card:hover {
  transform: scale(1.12);
  z-index: 2;
}
.tech-icon-card:hover .tech-icon-img {
  transform: scale(1.12);
}
.tech-icon-img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 12px;
  background: #f5f5f5;
  padding: 6px;
  box-shadow: 0 2px 8px #0001;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1);
}
.tech-icon-name {
  opacity: 0;
  font-size: 0.95rem;
  color: #666;
  margin-top: 4px;
  transition: opacity 0.18s;
  pointer-events: none;
}
.tech-icon-card:hover .tech-icon-name {
  opacity: 1;
}
.tech-item {
  background: #fafafa;
  color: #222;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #e1e1e1;
}
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.blog-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fafafa;
  border-radius: 0;
  padding: 18px 24px;
  color: #222;
  font-weight: 500;
  text-decoration: none;
  border: 1.5px solid #eee;
  transition: background 0.2s, border-color 0.2s, transform 0.3s cubic-bezier(.4,2,.6,1);
  height: 6rem;
}
.blog-card:hover {
  background: #f5f5f5;
  border-color: #eee;
  transform: scale(1.04);
}
.blog-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.blog-desc {
  color: #888;
  font-size: 0.98rem;
  
  margin-left: 16px;
  flex: 1;
}
.blog-arrow {
  font-size: 1.2rem;
  color: #888;
  margin-left: 16px;
  display: inline-block;
  transition: transform 0.3s cubic-bezier(.4,2,.6,1);
}
.blog-card:hover .blog-arrow {
  transform: rotate(-45deg);
}
.home-footer {
  margin: 40px auto 0 auto;
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 2px 12px #0001;
  padding: 12px 24px;
}
.footer-icon {
  font-size: 1.35rem;
  color: #222;
  text-decoration: none;
  transition: color 0.2s;
}
.footer-icon:hover {
  color: #2be282;
}
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
  height: 100%;
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
.social-card-list {
  display: flex;
  gap: 18px;
  margin-top: 18px;
  justify-content: space-between;
  flex-wrap: wrap;
}
.social-card {
  background: #fff;
  border: 1.5px solid #e0e0e0;
  border-radius: 0;
  flex: 1 1 0;
  min-width: 120px;
  max-width: 24%;
  height: 8.8125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  color: #222;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.25s cubic-bezier(.4,2,.6,1);
}
.social-card:hover {
  border-color: #b6b6b6;
  box-shadow: 0 4px 24px #0001;
  transform: translateY(-4px) scale(1.01);
}
.social-icon {
  font-size: 2rem;
  margin-bottom: 8px;
}
.social-name {
  font-size: 1rem;
  color: #888;
}

/* 背景颜色代替图片 */
.project-background {
  width: 100%;
  height: 14.375rem; /* 230px 转换为 rem */
  background-image: url('../assets/物流封面.png'); /* 设置背景图片 */
  background-size: cover; /* 确保图片覆盖整个区域 */
  background-position: center; /* 确保图片居中 */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* 添加阴影，模拟发光效果 */
}

/* 人力资源分析大屏卡片背景图 */
.hr-background {
  background-image: url('../assets/hr封面.png'); /* 设置人力资源封面图片 */
  background-size: cover; /* 确保图片覆盖整个区域 */
  background-position: center; /* 确保图片居中 */
}
</style> 