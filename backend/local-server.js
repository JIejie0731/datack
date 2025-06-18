require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbStatus = require('./api/db-status');
const sqlQuery = require('./api/sql-query');
const sqlDatasets = require('./api/sql-datasets'); // 新增
const sqlDatasetsExecuteByName = require('./api/sql-datasets-execute-by-name'); // 新增
const datasetTableMap = require('./api/dataset-table-map'); // 新增

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/db-status', dbStatus);
app.post('/api/sql-query', sqlQuery);
app.all('/api/sql-datasets', sqlDatasets); // 新增，支持GET/POST/DELETE
app.all('/api/sql-datasets-execute-by-name', sqlDatasetsExecuteByName); // 新增
app.all('/api/dataset-table-map', datasetTableMap); // 新增，支持GET/POST/PUT/DELETE

app.get('/api/dept-tree', require('./api/dept-tree'));

app.listen(3001, () => {
  console.log('本地后端服务已启动：http://localhost:3001/api/db-status');
});