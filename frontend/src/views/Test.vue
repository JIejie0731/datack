<template>
  <div style="padding: 24px;">
    <!-- 区域一：部门筛选器 -->
    <el-form :inline="true">
      <el-form-item label="部门选择">
        <el-cascader
          v-model="deptValue"
          :options="deptOptions"
          :props="{ checkStrictly: true, emitPath: true }"
          placeholder="请选择部门"
          style="width: 300px;"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchDeptCountAndAge">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 区域二：两个卡片组件 -->
    <div style="display: flex; gap: 24px; border: 1px dashed #dcdfe6; padding: 24px; min-height: 400px;">
      <BaseCard name="卡片一">
        <template #header>卡片一</template>
        <v-chart :option="barOption" autoresize style="width: 100%; height: 400px;" />
      </BaseCard>
      <BaseCard name="卡片二">
        <template #header>卡片二</template>
        <v-chart :option="ageBarOption" autoresize style="width: 100%; height: 400px;" />
      </BaseCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import BaseCard from '@/components/BaseCard.vue'
import VChart from 'vue-echarts'

const deptOptions = ref([])
const deptValue = ref([])
const deptBarData = ref([])
const ageBarData = ref([])

onMounted(() => {
  fetchDeptOptions()
  fetchDeptCountAndAge()
})

async function fetchDeptOptions() {
  // 假设数据集dept返回结构为 [{ dept_level1, dept_level2, dept_level3 }]
  const res = await axios.post('/api/sql-datasets-execute-by-name', { name: 'dept' })
  const raw = res.data.data || []
  const map = {}
  raw.forEach(row => {
    if (!row.dept_level1) return
    if (!map[row.dept_level1]) map[row.dept_level1] = { value: row.dept_level1, label: row.dept_level1, children: [] }
    if (row.dept_level2) {
      let l2 = map[row.dept_level1].children.find(c => c.value === row.dept_level2)
      if (!l2) {
        l2 = { value: row.dept_level2, label: row.dept_level2, children: [] }
        map[row.dept_level1].children.push(l2)
      }
      if (row.dept_level3) {
        l2.children.push({ value: row.dept_level3, label: row.dept_level3 })
      }
    }
  })
  deptOptions.value = Object.values(map)
}

async function fetchDeptCountAndAge() {
  // 解析部门参数
  const [dept_level1, dept_level2, dept_level3] = deptValue.value
  const queryParams = {}
  if (dept_level1) queryParams.dept_level1 = dept_level1
  if (dept_level2) queryParams.dept_level2 = dept_level2
  if (dept_level3) queryParams.dept_level3 = dept_level3

  // 并发请求，两个接口都返回后再一起赋值
  const [res1, res2] = await Promise.all([
    axios.post('/api/sql-datasets-execute-by-name', {
      name: 'dept_count',
      params: queryParams
    }),
    axios.post('/api/sql-datasets-execute-by-name', {
      name: 'age_model',
      params: queryParams
    })
  ])
  deptBarData.value = res1.data.data || []
  ageBarData.value = res2.data.data || []
}

const barOption = computed(() => {
  if (!deptBarData.value.length) return { title: { text: '暂无数据' } }
  return {
    title: { text: '各二级部门人数统计' },
    tooltip: {},
    xAxis: { type: 'category', data: deptBarData.value.map(item => item.dept_level2) },
    yAxis: { type: 'value', name: '人数' },
    series: [
      {
        type: 'bar',
        data: deptBarData.value.map(item => item.人数),
        name: '人数',
        itemStyle: { color: '#409EFF' }
      }
    ]
  }
})

const ageBarOption = computed(() => {
  if (!ageBarData.value.length) return { title: { text: '暂无数据' } }
  return {
    title: { text: '年龄分布统计' },
    tooltip: {},
    xAxis: { type: 'category', data: ageBarData.value.map(item => item.age) },
    yAxis: { type: 'value', name: '人数' },
    series: [
      {
        type: 'bar',
        data: ageBarData.value.map(item => item.人数),
        name: '人数',
        itemStyle: { color: '#67C23A' }
      }
    ]
  }
})
</script>