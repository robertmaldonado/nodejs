import { createPool } from 'mysql2/promise';

// import dotenv from 'dotenv';
// dotenv.config(); // Cargar variables de entorno

// const config = {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// };



const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'taller_admin'
});


/* //hosting
const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'epwnhzmc_taller_admin_user',
    password: 'claveadmin15-',
    database: 'epwnhzmc_taller_admin'
}); */


/* const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}); */


export default pool;