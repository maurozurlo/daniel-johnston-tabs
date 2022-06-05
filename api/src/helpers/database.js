const pool = require('../config/db')
const sanitize = require('../transformers/sanitizeHTML')

const sanitizePayload = (payload) => {
  const sanitized = {}
  Object.keys(payload).forEach((key) => {
    sanitized[key] = sanitize(payload[key])
  })
  return sanitized
}

const getGenericCount = async (tableName) => {
  const [row] = await pool.execute(
    `SELECT COUNT(id) as count FROM ${tableName}`,
  )
  return row[0].count
}
const getDistinctCount = async (tableName, field) => {
  const [
    row,
  ] = await pool.query(
    `SELECT COUNT(DISTINCT ${field}) AS count FROM ${tableName}`,
    [field],
  )
  return row[0].count
}

const getFromField = async (tableName, field, value) => {
  const [
    rows,
  ] = await pool.execute(`SELECT * FROM ${tableName} WHERE ${field} = ?`, [
    value,
  ])
  return rows
}

const getAll = async (tableName) => {
  const [rows] = await pool.query(`SELECT * FROM ${tableName}`)
  return rows
}

const getFields = (payload) => {
  const values = Object.values(payload)
  return {
    values,
    fields: Object.keys(payload).join(','),
    qm: values.fill('?').join(','),
  }
}

const getFieldsForUpdate = (payload) => {
  delete payload['id'] // Remove ID
  const fields = Object.keys(payload).join(' = ?, ')
  const values = Object.values(payload)
  const replacements = {
    values: values,
    fields: `${fields} = ?`,
  }
  return replacements
}

const addToDB = async (tableName, payload, connection) => {
  const sanitized = sanitizePayload(payload)
  const rep = getFields(sanitized)
  const stmt = `insert into ${tableName} (${rep.fields}) values (${rep.qm})`
  const [rows] = await connection.execute(stmt, rep.values)
  return rows
}

const editInDB = async (tableName, payload, connection) => {
  const { id } = payload
  const sanitized = sanitizePayload(payload)
  const rep = getFieldsForUpdate(sanitized)
  const stmt = `UPDATE ${tableName} SET ${rep.fields} WHERE id = ?`
  const [rows] = await connection.execute(stmt, [...rep.values, id])
  return rows
}

const deleteFromDB = async (tableName, id) => {
  const [rows] = await pool.execute(`DELETE FROM ${tableName} WHERE id = ?`, [
    id,
  ])
  return rows
}

const updateCollectionInDB = async (tableName, collection) => {
  const conn = await pool.getConnection()
  await conn.query('begin;')
  for (let i = 0; i < collection.length; i++) {
    await editInDB(tableName, collection[i], conn)
  }
  await conn.query('commit;')
  conn.release()
}

const addCollectionToDB = async (tableName, collection) => {
  const conn = await pool.getConnection()
  await conn.query('begin;')
  for (let i = 0; i < collection.length; i++) {
    await addToDB(tableName, collection[i], conn)
  }
  await conn.query('commit;')
  conn.release()
}

module.exports = {
  addToDB,
  addCollectionToDB,
  editInDB,
  updateCollectionInDB,
  deleteFromDB,
  getFromField,
  getAll,
  getGenericCount,
  getDistinctCount,
  sanitizePayload,
}
