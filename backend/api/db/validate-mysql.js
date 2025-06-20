const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只用前端传参
  const { host, port, user, password } = req.body;

  try {
    const conn = await mysql.createConnection({ host, port, user, password });
    await conn.end();
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}; 