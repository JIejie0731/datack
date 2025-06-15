<template>
  <el-button type="primary" @click="showDrill = true">下钻弹窗测试</el-button>
  <DrillModal v-model="showDrill" :data="testData" :columns="columns" title="下钻测试" />
</template>

<script setup>
import { ref } from 'vue'
import DrillModal from '@/components/DrillModal.vue'
import { ElButton } from 'element-plus'

const showDrill = ref(false)

const testData = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: `测试用户${i + 1}`,
  value: Math.floor(Math.random() * 1000),
  field4: 'A',
  field5: 'B',
  field6: '测试测试测试测试测试测试',
  field7: 'D',
  field8: 'E',
  field9: 'F',
  field10: 'G',
  field11: 'H',
  field12: 'I',
  field13: 'J',
  field14: 'K',
  field15: 'L'
}))

const columns = [
  { prop: 'id', label: 'ID' },
  { prop: 'name', label: '姓名' },
  { prop: 'value', label: '数值' },
  { prop: 'field4', label: '字段4' },
  { prop: 'field5', label: '字段5' },
  { prop: 'field6', label: '超级长度字段测试效果情况', minWidth: 300},
  { prop: 'field7', label: '字段7' },
  { prop: 'field8', label: '字段8' },
  { prop: 'field9', label: '字段9' },
  { prop: 'field10', label: '字段10' },
  { prop: 'field11', label: '字段11' },
  { prop: 'field12', label: '字段12' },
  { prop: 'field13', label: '字段13' },
  { prop: 'field14', label: '字段14' },
  { prop: 'field15', label: '字段15' }
]
</script>