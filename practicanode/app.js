const fs = require('fs');
//console.log(fs)

const poema = fs.readFileSync('poema.txt','utf-8');
console.log(poema)