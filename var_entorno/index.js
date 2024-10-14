//const dotenv = requiere('dotenv')
//dotenv.config()

require('dotenv').config()  // sin "type": "module", hay que quitarl si se coloca sale error


// Importar dotenv con la sintaxis de ESM
//import dotenv from 'dotenv'; // type module     con  "type": "module",
// Configurar dotenv para cargar variables del archivo .env
//dotenv.config(); // type module  con "type": "module",

console.log(process.env.NOMBRE_SECRETO)
console.log(process.env.PUERTO_NUMERO)