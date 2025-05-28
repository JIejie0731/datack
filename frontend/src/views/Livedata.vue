<template>
  <Header />
  <a-modal v-model:visible="visible" title="请输入访问密码" :closable="true" :mask-closable="false" @ok="handleOk" @close="handleClose">
    <a-input-password v-model="password" placeholder="请输入密码" @pressEnter="handleOk" />
    <template #footer>
      <a-button @click="handleOk" type="primary">确定</a-button>
    </template>
    <div v-if="error" style="color: #f53f3f; margin-top: 8px;">密码错误，请重试。</div>
  </a-modal>
  <div class="livedata-root" v-if="authed">
    <h1 class="livedata-title">数据求索</h1>
    <div class="livedata-content">
      <p>这里是数据求索相关内容展示区。</p>
    </div>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
import { ref } from 'vue'
import { Modal as AModal, InputPassword as AInputPassword, Button as AButton } from '@arco-design/web-vue'
import { useRouter } from 'vue-router'

const visible = ref(true)
const password = ref('')
const error = ref(false)
const router = useRouter()
const authed = ref(false)

function handleOk() {
  if (password.value === '1005') {
    visible.value = false
    error.value = false
    authed.value = true
  } else {
    error.value = true
  }
}

function handleClose() {
  password.value = ''
  error.value = false
  if (!authed.value) {
    router.push('/')
  }
}
</script>

<style scoped>
.livedata-root {
  max-width: 700px;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}
.livedata-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: left;
}
.livedata-content {
  background: #fafafa;
  border-radius: 8px;
  padding: 24px 28px;
  color: #222;
  font-size: 1.05rem;
  border: 1.5px solid #eee;
  min-height: 120px;
}
</style> 