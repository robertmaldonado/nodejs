import { createPool } from 'mysql2/promise';

/* const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'Prueba01'
}); */

const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'taller_admin'
});


export default pool;