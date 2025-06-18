const { Client } = require('pg');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });

  await client.connect();

  if (req.method === 'GET') {
    const result = await client.query('SELECT * FROM sql_datasets ORDER BY id DESC');
    await client.end();
    res.status(200).json({ data: result.rows });
    return;
  }

  if (req.method === 'POST') {
    const { name, sql_text } = req.body;
    if (!name || !sql_text) {
      res.status(400).json({ error: 'name和sql_text不能为空' });
      await client.end();
      return;
    }
    await client.query(
      'INSERT INTO sql_datasets (name, sql_text, created_at) VALUES ($1, $2, NOW())',
      [name, sql_text]
    );
    await client.end();
    res.status(200).json({ success: true });
    return;
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      res.status(400).json({ error: 'id不能为空' });
      await client.end();
      return;
    }
    await client.query('DELETE FROM sql_datasets WHERE id=$1', [id]);
    await client.end();
    res.status(200).json({ success: true });
    return;
  }

  await client.end();
  res.status(405).json({ error: 'Method Not Allowed' });
};