import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  user: 'postgres',
  host: '192.168.1.7',
  database: 'jobCardData',
  password: 'Postgres101',
  port: 5432,
})

export default pool