require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbStatus = require('./api/db-status');
const sqlQuery = require('./api/sql-query'); // 新增

const app = express();
app.use(cors());
app.use(express.json()); // 新增，解析json请求体

app.get('/api/db-status', dbStatus);
app.post('/api/sql-query', sqlQuery); // 新增

app.get('/api/dept-tree', require('./api/dept-tree'));

app.listen(3001, () => {
  console.log('本地后端服务已启动：http://localhost:3001/api/db-status');
});