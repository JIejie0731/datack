const { Client } = require('pg');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { sql, page = 1, pageSize = 20 } = req.body || {};
  console.log('收到SQL:', sql);
  if (!sql) {
    res.status(400).json({ error: 'SQL语句不能为空' });
    return;
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  try {
    await client.connect();

    // 统计总数（仅支持简单select语句，复杂SQL需自行处理）
    let total = 0;
    try {
      const countSql = `SELECT COUNT(*) AS count FROM (${sql}) AS subquery`;
      const countResult = await client.query(countSql);
      total = parseInt(countResult.rows[0].count, 10);
    } catch (e) {
      total = 0;
    }

    // 分页
    const offset = (page - 1) * pageSize;
    let pagedSql = sql;
    if (!/\s+limit\s+/i.test(sql)) {
      pagedSql = `${sql} LIMIT ${pageSize} OFFSET ${offset}`;
    }
    const result = await client.query(pagedSql);

    await client.end();
    res.status(200).json({
      data: result.rows,
      total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 