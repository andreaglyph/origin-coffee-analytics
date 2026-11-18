const { ventas } = require('./data.js');

console.log("Cantidad de registros:", ventas.length);

console.log("Primer registro:", ventas[0]);

console.log("Último registro:", ventas[ventas.length - 1]);

console.log("Producto del cuarto registro:", ventas[3].producto);

console.table(ventas);