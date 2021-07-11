const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

console.log(process.env.DATABASE_URL);

// DB connection
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.on('connect', () => {
    console.log('DB connected successful');
});

module.exports = {
    query: (text, params) => client.query(text, params),
};