import mysql from 'mysql2';
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	port: Number(process.env.DB_PORT),
	connectionLimit: 10
});

export { pool };
