// funciona sin necesidad de colocar start en el .json




import { strict } from 'assert';


/* 
// package.json
{
    "type": "module",
    "dependencies": {
      "express": "^4.18.2"
    }
  } */
// index.js uasando type module asi no funciona al desplegar en cpanel del hosting
import express from 'express';

const app = express();
const port = 3000;

//strict.equal(true, true, 'ES6 modules are supported!');

//import { strict } from 'assert';

// Realiza una comprobación simple usando assert para verificar si funciona el import.
strict.equal(true, true, 'ES6 modules are supported!');

console.log('Módulos ES6 están soportados.');

app.get('/', (req, res) => {
    res.send('¡Hola Mundo! Usando módulos ES6');
});



app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});