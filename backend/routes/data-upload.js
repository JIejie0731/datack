const express = require('express')
const router = express.Router()
const { Pool } = require('pg')
const format = require('pg-format')

// 数据库连接配置
const pool = new Pool({ 
  connectionString: process.env.NEON_DATABASE_URL 
})

// 创建表并导入数据
router.post('/create-table', async (req, res) => {
  const client = await pool.connect()
  try {
    const { tableConfig, fieldMappings, data } = req.body

    // 开始事务
    await client.query('BEGIN')

    // 1. 构建建表 SQL
    const createTableSQL = generateCreateTableSQL(tableConfig, fieldMappings)
    await client.query(createTableSQL)

    // 2. 构建插入数据的 SQL
    if (data && data.length > 0) {
      const insertSQL = generateInsertSQL(tableConfig.tableName, fieldMappings, data)
      await client.query(insertSQL)
    }

    // 3. 添加表注释
    if (tableConfig.tableComment) {
      const commentSQL = format(
        'COMMENT ON TABLE %I IS %L',
        tableConfig.tableName,
        tableConfig.tableComment
      )
      await client.query(commentSQL)
    }

    // 4. 添加字段注释
    for (const field of fieldMappings) {
      if (field.comment) {
        const fieldCommentSQL = format(
          'COMMENT ON COLUMN %I.%I IS %L',
          tableConfig.tableName,
          field.fieldName,
          field.comment
        )
        await client.query(fieldCommentSQL)
      }
    }

    // 提交事务
    await client.query('COMMIT')

    res.json({
      success: true,
      message: `表创建成功，共导入 ${data ? data.length : 0} 条数据`,
      totalCount: data ? data.length : 0
    })
  } catch (error) {
    // 回滚事务
    await client.query('ROLLBACK')
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  } finally {
    client.release()
  }
})

// 生成建表 SQL
function generateCreateTableSQL(tableConfig, fieldMappings) {
  const fieldDefinitions = fieldMappings.map(field => {
    let fieldDef = format('%I %s', field.fieldName, field.fieldType)
    
    // 添加长度/精度
    if (field.fieldType === 'VARCHAR' && field.length) {
      fieldDef += `(${field.length})`
    } else if (field.fieldType === 'DECIMAL' && field.precision) {
      fieldDef += `(${field.precision}, 2)`
    }
    
    return fieldDef
  }).join(', ')

  return format(
    'CREATE TABLE IF NOT EXISTS %I (id SERIAL PRIMARY KEY, %s, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)',
    tableConfig.tableName,
    fieldDefinitions
  )
}

// 生成插入数据的 SQL
function generateInsertSQL(tableName, fieldMappings, data) {
  // 获取字段名列表
  const fields = fieldMappings.map(f => f.fieldName)
  
  // 准备数据
  const values = data.map(row => {
    return fieldMappings.map(field => {
      const value = row[field.originalName]
      
      // 根据字段类型处理数据
      if (value === undefined || value === null) {
        return null
      }
      
      switch (field.fieldType) {
        case 'INT':
          return parseInt(value) || null
        case 'DECIMAL':
          return parseFloat(value) || null
        case 'DATETIME':
          return value ? new Date(value) : null
        default:
          return String(value)
      }
    })
  })

  // 使用 pg-format 构建安全的 SQL
  return format(
    'INSERT INTO %I (%s) VALUES %L',
    tableName,
    fields.join(', '),
    values
  )
}

// 获取所有表信息
router.get('/tables', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        t.table_name,
        obj_description((quote_ident(t.table_schema) || '.' || quote_ident(t.table_name))::regclass, 'pg_class') as table_comment,
        t.table_schema
      FROM information_schema.tables t
      WHERE t.table_schema = 'public'
      ORDER BY t.table_name
    `)
    
    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

// 获取表结构信息
router.get('/table/:tableName/structure', async (req, res) => {
  try {
    const { tableName } = req.params
    
    // 获取字段信息
    const result = await pool.query(`
      SELECT 
        c.column_name,
        c.data_type,
        c.character_maximum_length,
        c.numeric_precision,
        c.numeric_scale,
        c.is_nullable,
        c.column_default,
        pgd.description as column_comment
      FROM information_schema.columns c
      LEFT JOIN pg_catalog.pg_description pgd ON 
        pgd.objoid = (quote_ident(c.table_schema) || '.' || quote_ident(c.table_name))::regclass AND 
        pgd.objsubid = c.ordinal_position
      WHERE c.table_name = $1
      ORDER BY c.ordinal_position
    `, [tableName])
    
    res.json({
      success: true,
      data: result.rows
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router 