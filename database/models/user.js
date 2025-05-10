const { Client } = require('pg');

const client = new Client({
    user: 'your_username',
    host: 'localhost',
    database: 'octra_db',
    password: 'your_password',
    port: 5432,
});

client.connect();

module.exports = client;
