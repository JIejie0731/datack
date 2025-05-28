const { Client } = require('pg');

module.exports = async (req, res) => {
  // 手动设置 CORS 响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL, // 你的 Neon 数据库连接串
    // ssl: { rejectUnauthorized: false } // 如果需要 SSL
  });

  try {
    await client.connect();
    await client.query('SELECT 1');
    await client.end();
    res.status(200).json({ status: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}; 

