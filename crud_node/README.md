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


numero de telefono
1. VARCHAR
Cuándo usarlo:

Si necesitas almacenar números de teléfono con caracteres adicionales como +, -, paréntesis, o espacios (por ejemplo, para formatos internacionales: +1 (123) 456-7890).
Si no realizarás operaciones matemáticas o cálculos con los números de teléfono.
Ventajas:

Flexibilidad para almacenar formatos diversos.
Permite incluir códigos de país, extensiones, y otros caracteres.

  errorNombre.textContent = "El nombre es obligatorio.";  // Variables para los elementos de error
    const errorNombre = document.getElementById("error-nombre");



    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Módulos JavaScript</title>
</head>
<body>
  <h1>Ejemplo de Módulos con JavaScript</h1>

  <form id="form">
    <label for="name">Nombre:</label>
    <input type="text" id="name" name="name" required>
    <button type="submit">Enviar</button>
  </form>
  <button id="clearForm">Limpiar Formulario</button>

  <script type="module" src="./js/main.js"></script>
</body>
</html>

document.getElementById("clearForm").addEventListener("click", () => {
  clearFormFields("form");
});


Para corregir un string eliminando los espacios al inicio, final y colapsando los espacios múltiples en uno solo, puedes usar los métodos trim() y replace() de JavaScript. Aquí tienes un ejemplo en Node.js:

javascript
Copiar
Editar
const textoIncorrecto = "  hola   mundo  ";
const textoCorregido = textoIncorrecto.trim().replace(/\s+/g, ' ');
console.log(textoCorregido); // "hola mundo"



-----------------------------------------------------------------------------------

SELECT MONTH(fecha_abono) AS mes, SUM(abono) AS total_ingresos
FROM ingresos
GROUP BY mes

UNION

SELECT MONTH(fecha_pago_final) AS mes, SUM(pago_final) AS total_ingresos
FROM ingresos
GROUP BY mes

ORDER BY mes;

