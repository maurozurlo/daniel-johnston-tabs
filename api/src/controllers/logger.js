const pool = require('../config/db')
const tableName = 'logs'


const logger = async (userId, username, action, table) => {
  let user = username ? username : 'Unknown'

  const actionString = `${user} ${action} into ${table}`
  try {
    await logToDB(userId || -1, actionString)
  } catch (error) {
    console.log('Unable to log')
  }
}


const logToDB = async (userId, action) => {
  const conn = await pool.getConnection()
  const stmt = `insert into ${tableName} (user,action) values (?,?)`
  await conn.execute(stmt, [userId, action])
  conn.release()
  console.log(`Logged ${action} performed by ${userId}`)
}

const getLogs = async maxLogs => {
  const conn = await pool.getConnection()
  const stmt = `SELECT action, DATE_FORMAT(timestamp, "%b %d %Y, %h:%i:%s %p") as timestamp FROM logs order by timestamp DESC limit ?`
  const [rows] = await conn.execute(stmt, [maxLogs])
  conn.release()
  return rows
}

module.exports = {
  logger,
  getLogs
}
