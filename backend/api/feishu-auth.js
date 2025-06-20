// backend/api/feishu-auth.js
const express = require('express')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const { Pool } = require('pg')

const router = express.Router()
const pool = new Pool({ connectionString: process.env.NEON_DATABASE_URL })

const FEISHU_APP_ID = 'cli_a8d8e7d8d37c100c'
const FEISHU_APP_SECRET = '8dLOQDIeV7f9AVpgpu6dtfL0bCDMJhpg'
const FEISHU_REDIRECT_URI = process.env.BACKEND_URL + '/api/feishu-auth/callback'
const JWT_SECRET = 'your_jwt_secret'

// 1. 跳转到飞书授权
router.get('/login', (req, res) => {
  const redirect = encodeURIComponent(FEISHU_REDIRECT_URI)
  res.redirect(`https://open.feishu.cn/open-apis/authen/v1/index?app_id=${FEISHU_APP_ID}&redirect_uri=${redirect}&state=xxx`)
})

// 2. 飞书回调
router.get('/callback', async (req, res) => {
  const { code } = req.query
  try {
    // 用 code 换 access_token 和用户信息
    const tokenRes = await axios.post('https://open.feishu.cn/open-apis/authen/v1/access_token', {
      grant_type: 'authorization_code',
      code,
      app_id: FEISHU_APP_ID,
      app_secret: FEISHU_APP_SECRET,
    })
    const { open_id, name, avatar_url, email } = tokenRes.data.data

    // 存储/更新用户
    const client = await pool.connect()
    let user
    const result = await client.query('SELECT * FROM dataseek_users WHERE open_id=$1', [open_id])
    if (result.rows.length === 0) {
      const insert = await client.query(
        'INSERT INTO dataseek_users (open_id, name, avatar, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [open_id, name, avatar_url, email]
      )
      user = insert.rows[0]
    } else {
      const update = await client.query(
        'UPDATE dataseek_users SET name=$2, avatar=$3, email=$4, updated_at=NOW() WHERE open_id=$1 RETURNING *',
        [open_id, name, avatar_url, email]
      )
      user = update.rows[0]
    }
    client.release()

    // 生成JWT
    const token = jwt.sign({ id: user.id, open_id: user.open_id, name: user.name }, JWT_SECRET, { expiresIn: '7d' })

    // 重定向回前端，带token
    res.redirect(`${process.env.FRONTEND_URL}/livedata?token=${token}`)
  } catch (e) {
    console.error(e);
    res.status(500).send('飞书登录失败: ' + (e && e.message ? e.message : e));
  }
})

router.get('/me', async (req, res) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未登录' })
  }
  try {
    const token = auth.slice(7)
    const payload = jwt.verify(token, JWT_SECRET)
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM dataseek_users WHERE id=$1', [payload.id])
    client.release()
    if (result.rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' })
    }
    const user = result.rows[0]
    res.json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      open_id: user.open_id
    })
  } catch (e) {
    res.status(401).json({ error: 'token无效或已过期' })
  }
})

module.exports = router