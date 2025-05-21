require('dotenv').config();
const express = require('express');
const cors = require('cors'); // 新增
const dbStatus = require('./api/db-status');
const app = express();

app.use(cors()); // 新增

app.get('/api/db-status', dbStatus);

app.listen(3001, () => {
  console.log('后端API本地服务已启动：http://localhost:3001');
});