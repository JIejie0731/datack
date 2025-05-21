require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbStatus = require('./api/db-status');
const fcExpress = require('@serverless-devs/express');

const app = express();
app.use(cors());
app.get('/api/db-status', dbStatus);

// 适配为 FC handler
module.exports.handler = fcExpress(app);

// 本地开发时用 node server.js 也能跑
if (process.env.NODE_ENV !== 'production') {
  app.listen(3001, () => {
    console.log('后端API本地服务已启动：http://localhost:3001');
  });
}