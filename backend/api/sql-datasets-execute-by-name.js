const { Client } = require('pg');

module.exports = async (req, res) => {
  // 设置CORS和允许的请求方法
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许POST方法
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // 解析前端传递的参数
  const { name, params = {} } = req.body || {};
  if (!name) {
    res.status(400).json({ error: 'name不能为空' });
    return;
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  try {
    await client.connect();
    // 1. 动态查 dataset_table_map 获取表名
    const mapRes = await client.query(
      'SELECT table_name FROM dataset_table_map WHERE dataset_name=$1 LIMIT 1',
      [name]
    );
    if (!mapRes.rows.length || !mapRes.rows[0].table_name) {
      await client.end();
      res.status(400).json({ error: '未配置该数据集的表名' });
      return;
    }
    const tableName = mapRes.rows[0].table_name;

    // 2. 查sql_datasets表，获取自定义SQL（sql_text）
    const { rows } = await client.query('SELECT sql_text FROM sql_datasets WHERE name=$1', [name]);
    if (rows.length && rows[0].sql_text) {
      // 2.1 拼接where条件
      let whereArr = [];
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
          whereArr.push(`${key}='${params[key]}'`);
        }
      });
      let whereStr = whereArr.length ? 'WHERE ' + whereArr.join(' AND ') : '';
      // 2.2 自动包裹逻辑：将 FROM 表名 替换为 FROM (SELECT * FROM 表名 WHERE ... )
      const fromReg = new RegExp(`FROM\\s+${tableName}`, 'i');
      const subQuery = `FROM (SELECT * FROM ${tableName} ${whereStr})`;
      const sql = rows[0].sql_text.replace(fromReg, subQuery);
      console.log('最终SQL:', sql);
      const result = await client.query(sql);
      await client.end();
      res.status(200).json({ data: result.rows });
      return;
    }

    // 3. 没有自定义SQL，自动生成SQL
    let where = '1=1';
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
        where += ` AND ${key}='${params[key]}'`;
      }
    });
    let sql = '';
    if (name === 'dept_count') {
      sql = `SELECT dept_level2, count(1) as 人数 FROM (SELECT * FROM ${tableName} WHERE ${where}) t1 GROUP BY dept_level2 ORDER BY dept_level2`;
    } else if (name === 'age_model') {
      sql = `SELECT age, count(1) as 人数 FROM (SELECT * FROM ${tableName} WHERE ${where}) t1 GROUP BY age ORDER BY age`;
    } else {
      sql = `SELECT * FROM (SELECT * FROM ${tableName} WHERE ${where}) t1`;
    }
    console.log('最终SQL:', sql);
    const result = await client.query(sql);
    await client.end();
    res.status(200).json({ data: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 