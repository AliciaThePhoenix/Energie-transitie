import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',    
  user: 'root', 
  password: '', 
  database: 'energie-transitie'
};

// Maak een connection pool
const pool = mysql.createPool(dbConfig);

export default pool;
