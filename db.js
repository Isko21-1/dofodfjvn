const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'event_planner',
  password: 'Iskopro21',
  port: 5432,
});

module.exports = pool;
