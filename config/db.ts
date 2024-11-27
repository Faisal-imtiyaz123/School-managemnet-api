import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST as string,
    port:process.env.DB_PORT as unknown as number,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
});

db.connect((err) => {
    if (err) {
        console.error('Database failed to connect:', err.stack);
        process.exit(1);
    }
    console.log('Database connected successfully');
});

export default db;
