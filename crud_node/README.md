ayuda  aqui hay informacion de tutoriales usado para hacer este ejemplo de crud

https://www.youtube.com/watch?v=eOGlouhsIjY
https://github.com/luisangelf11/crud-tuto-node-mysql



Conclusión:
Usa pool.query para operaciones rápidas y concurrentes.
Usa connection.execute para consultas seguras, críticas, o cuando trabajes con transacciones o datos sensibles.


DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha
fecha: 2023-06-14T05:00:00.000Z,
fecha: '2023-06-14'



Biblioteca mysql2:

Internamente, la biblioteca inserta los valores en los marcadores de posición y construye una consulta segura y lista para ejecutar en el servidor MySQL.
Ejemplo:
javascript
Copiar código
const query = "SELECT * FROM clientes WHERE cedula = ?";
const cedula = "123456789";
const [rows] = await pool.query(query, [cedula]);
La biblioteca mysql2 convierte esta consulta en algo como:
sql
Copiar código
SELECT * FROM clientes WHERE cedula = '123456789';
Servidor MySQL:

MySQL recibe la consulta ya formateada y la ejecuta en su motor de base de datos.
