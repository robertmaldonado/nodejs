//const dotenv = requiere('dotenv')
//dotenv.config()

//require('dotenv').config()


// Importar dotenv con la sintaxis de ESM
import dotenv from 'dotenv'; // type module

// Configurar dotenv para cargar variables del archivo .env
dotenv.config();

console.log(process.env.NOMBRE_SECRETO)
console.log(process.env.PUERTO_NUMERO)