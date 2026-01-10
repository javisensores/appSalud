const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',  // Cambia 'toor' por '' (vacío)
    database: 'appsalud',
});

module.exports = pool;


