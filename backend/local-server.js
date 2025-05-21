require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbStatus = require('./api/db-status');

const app = express();
app.use(cors());
app.get('/api/db-status', dbStatus);

app.listen(3001, () => {
  console.log('本地后端服务已启动：http://localhost:3001/api/db-status');
}); 