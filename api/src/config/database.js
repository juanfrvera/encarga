const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DATABASE_URL);

// DB connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect();

module.exports = {
    query: (text, params) => pool.query(text, params),
};