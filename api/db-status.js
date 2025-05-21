const { Client } = require('pg');

module.exports = async (req, res) => {
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