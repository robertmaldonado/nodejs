// sin type module si corre al desplegar en el cpanel del hosting

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo! sin type module ');
  console.log(`abirendo pagina web`);
});



app.listen(port, () => {
  console.log(`Servidor   
 escuchando en el puerto ${port}`);   

});

// funciona sin necesidad de colocar start en el .json


/* 
// package.json
{
    "type": "module",
    "dependencies": {
      "express": "^4.18.2"
    }
  } */
// index.js uasando type module asi no funciona al desplegar en cpanel del hosting
/* import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo! Usando módulos ES6');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); */