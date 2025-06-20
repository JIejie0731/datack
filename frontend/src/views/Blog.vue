<template>
  <Header />
  <div class="blog-contents">
    <div class="title-area">
      <div class="portfolio-title-row">
        <h1 class="portfolio-title">Blog（开发中···）</h1>
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
      <!-- 内容区域 -->
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
  </div>
</template>

<script setup>
// 引入 Header 组件
import Header from '../components/公共导航栏组件/Header.vue'

// 引入 useRouter
import { useRouter } from 'vue-router'
// 获取router实例
const router = useRouter()
// 处理"更多"按钮点击事件，跳转到首页（目录页）
function handleMore() {
  router.push('/')
}

// 这里可以添加测试用的逻辑
</script>

<style scoped>
.blog-contents {
  width: 670px;

  height: calc(100vh - 65px); /* 占据整个视口高度 */
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: auto; /* 内容超出时自身滚动 */
  margin: 0 auto; /* 水平居中 */

  padding: 1.2rem;
}

.title-area {
  padding: 1rem 0;
  text-align: center;
  margin-bottom: 1rem;
}

.content-area {
  flex: 1; /* 填满剩余空间 */
  min-height: 0; /* 防止内容过多撑破 */
  padding: 1rem 0;
}

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
  transform: scale(0.7);
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

/* 新增：从Home.vue复制的博客卡片样式 */
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
</style>