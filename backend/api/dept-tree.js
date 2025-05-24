const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL });

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const result = await pool.query(`
      SELECT DISTINCT dept_level1, dept_level2, dept_level3
      FROM emp_info
      ORDER BY dept_level2, dept_level3
    `);

    // 构建树形结构
    const tree = [];
    const map = {};

    result.rows.forEach(row => {
      const { dept_level1, dept_level2, dept_level3 } = row;
      if (!map[dept_level1]) {
        map[dept_level1] = { key: dept_level1, title: dept_level1, children: [] };
        tree.push(map[dept_level1]);
      }
      const l1 = map[dept_level1];
      let l2 = l1.children.find(c => c.title === dept_level2);
      if (!l2) {
        l2 = { key: `${dept_level1}-${dept_level2}`, title: dept_level2, children: [] };
        l1.children.push(l2);
      }
      if (dept_level3) {
        l2.children.push({ key: `${dept_level1}-${dept_level2}-${dept_level3}`, title: dept_level3 });
      }
    });

    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 