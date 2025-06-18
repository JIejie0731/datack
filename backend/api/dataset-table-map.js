const { Client } = require('pg');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
  });
  await client.connect();

  try {
    if (req.method === 'GET') {
      const { rows } = await client.query('SELECT * FROM dataset_table_map ORDER BY id DESC');
      res.status(200).json({ data: rows });
    } else if (req.method === 'POST') {
      const { dataset_name, table_name, table_alias, remark } = req.body;
      await client.query(
        'INSERT INTO dataset_table_map (dataset_name, table_name, table_alias, remark) VALUES ($1, $2, $3, $4)',
        [dataset_name, table_name, table_alias, remark]
      );
      res.status(200).json({ success: true });
    } else if (req.method === 'PUT') {
      const { id, dataset_name, table_name, table_alias, remark } = req.body;
      await client.query(
        'UPDATE dataset_table_map SET dataset_name=$1, table_name=$2, table_alias=$3, remark=$4 WHERE id=$5',
        [dataset_name, table_name, table_alias, remark, id]
      );
      res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      const id = req.query.id || req.body.id;
      await client.query('DELETE FROM dataset_table_map WHERE id=$1', [id]);
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.end();
  }
};