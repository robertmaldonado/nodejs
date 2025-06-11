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




// Función para obtener servicios de los últimos 6 meses
        const query = `
            SELECT equipo, estatus, falla 
            FROM servicios 
            WHERE f_in >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            ORDER BY f_in DESC
        `;



-------------------------------------------------------------------------------------------------------------------

SELECT 
    DATE(fecha) AS dia,
    SUM(CASE WHEN tipodepago = 'transferencia' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_transferencia,
    SUM(CASE WHEN tipodepago = 'efectivo' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_efectivo,
    SUM(CASE WHEN tipodepago = 'ach' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_ach,
    SUM(deposito1 + deposito2 + deposito3) AS total_dia
FROM servicios
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY dia
ORDER BY dia DESC;








+------------+------------------+--------------+--------+-----------+
| dia        | total_transferencia | total_efectivo | total_ach | total_dia |
+------------+------------------+--------------+--------+-----------+
| 2025-06-10 | 1200              | 800          | 500    | 2500      |
| 2025-06-09 | 2000              | 0            | 700    | 2700      |
| 2025-06-08 | 500               | 1200         | 300    | 2000      |
| 2025-06-07 | 1500              | 1000         | 800    | 3300      |
+------------+------------------+--------------+--------+-----------+

-------------------------------------------------------------------------------------

SELECT 
    DATE(fecha) AS dia,
    SUM(CASE WHEN tipodepago = 'transferencia' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_transferencia,
    SUM(CASE WHEN tipodepago = 'efectivo' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_efectivo,
    SUM(CASE WHEN tipodepago = 'ach' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_ach,
    SUM(deposito1 + deposito2 + deposito3) AS total_dia,
    SUM(costo) AS total_costos,
    SUM(deposito1 + deposito2 + deposito3) - SUM(costo) AS utilidad
FROM servicios
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY dia
ORDER BY dia DESC;

+------------+------------------+--------------+--------+-----------+-------------+---------+
| dia        | total_transferencia | total_efectivo | total_ach | total_dia | total_costos | utilidad |
+------------+------------------+--------------+--------+-----------+-------------+---------+
| 2025-06-10 | 1200              | 800          | 500    | 2500      | 1500        | 1000    |
| 2025-06-09 | 2000              | 0            | 700    | 2700      | 1700        | 1000    |
| 2025-06-08 | 500               | 1200         | 300    | 2000      | 800         | 1200    |
| 2025-06-07 | 1500              | 1000         | 800    | 3300      | 2000        | 1300    |
+------------+------------------+--------------+--------+-----------+-------------+---------+

-----------------------------------------------------------------------------------------------------------------------

por mes

SELECT 
    DATE_FORMAT(fecha, '%Y-%m') AS mes,
    SUM(CASE WHEN tipodepago = 'transferencia' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_transferencia,
    SUM(CASE WHEN tipodepago = 'efectivo' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_efectivo,
    SUM(CASE WHEN tipodepago = 'ach' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_ach,
    SUM(deposito1 + deposito2 + deposito3) AS total_ingresos,
    SUM(costo) AS total_costos,
    SUM(deposito1 + deposito2 + deposito3) - SUM(costo) AS utilidad
FROM servicios
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY YEAR(fecha), MONTH(fecha)
ORDER BY mes DESC;


+--------+------------------+--------------+--------+---------------+-------------+---------+
| mes    | total_transferencia | total_efectivo | total_ach | total_ingresos | total_costos | utilidad |
+--------+------------------+--------------+--------+---------------+-------------+---------+
| 2025-06 | 5000              | 3000         | 2000    | 10000         | 6000        | 4000    |
| 2025-05 | 4500              | 2500         | 1500    | 8500          | 5000        | 3500    |
| 2025-04 | 4000              | 2000         | 1000    | 7000          | 4000        | 3000    |
| 2025-03 | 3500              | 1500         | 800     | 5800          | 3500        | 2300    |
| 2025-02 | 3000              | 1200         | 600     | 4800          | 2800        | 2000    |
| 2025-01 | 2500              | 1000         | 500     | 4000          | 2500        | 1500    |
+--------+------------------+--------------+--------+---------------+-------------+---------+


------------------------------
por año  

SELECT 
    YEAR(fecha) AS año,
    SUM(CASE WHEN tipodepago = 'transferencia' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_transferencia,
    SUM(CASE WHEN tipodepago = 'efectivo' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_efectivo,
    SUM(CASE WHEN tipodepago = 'ach' THEN (deposito1 + deposito2 + deposito3) ELSE 0 END) AS total_ach,
    SUM(deposito1 + deposito2 + deposito3) AS total_ingresos,
    SUM(costo) AS total_costos,
    SUM(deposito1 + deposito2 + deposito3) - SUM(costo) AS utilidad
FROM servicios
GROUP BY YEAR(fecha)
ORDER BY año DESC;


+------+------------------+--------------+--------+---------------+-------------+---------+
| año  | total_transferencia | total_efectivo | total_ach | total_ingresos | total_costos | utilidad |
+------+------------------+--------------+--------+---------------+-------------+---------+
| 2025 | 50000             | 30000        | 20000   | 100000        | 60000       | 40000   |
| 2024 | 45000             | 25000        | 15000   | 85000         | 50000       | 35000   |
| 2023 | 40000             | 20000        | 10000   | 70000         | 40000       | 30000   |
| 2022 | 35000             | 15000        | 8000    | 58000         | 35000       | 23000   |
+------+------------------+--------------+--------+---------------+-------------+---------+

------------------------














