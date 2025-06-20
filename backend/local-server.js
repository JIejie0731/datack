require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbStatus = require('./api/db-status');
const sqlQuery = require('./api/sql-query');
const sqlDatasets = require('./api/sql-datasets');
const sqlDatasetsExecuteByName = require('./api/sql-datasets-execute-by-name');
const datasetTableMap = require('./api/dataset-table-map');
const feishuAuth = require('./api/feishu-auth');
const dataUploadRouter = require('./routes/data-upload');
const validateMysql = require('./api/db/validate-mysql');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/db-status', dbStatus);
app.post('/api/sql-query', sqlQuery);
app.all('/api/sql-datasets', sqlDatasets);
app.all('/api/sql-datasets-execute-by-name', sqlDatasetsExecuteByName);
app.all('/api/dataset-table-map', datasetTableMap);
app.use('/api/feishu-auth', feishuAuth);
app.use('/api/data-upload', dataUploadRouter);
app.post('/api/db/validate-mysql', validateMysql);

app.get('/api/dept-tree', require('./api/dept-tree'));

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(3001, () => {
  console.log('本地后端服务已启动：http://localhost:3001/api/db-status');
});