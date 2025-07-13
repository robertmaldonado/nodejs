CREATE DATABASE Prueba01;

USE Prueba01;

CREATE TABLE personas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT
);

SELECT * FROM personas;

--// para agregar esta columnas de fechas despues de creada una tabbla anteriormente
ALTER TABLE personas
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- // agregando status 
ALTER TABLE personas
ADD COLUMN estatus VARCHAR(20) NULL;

/////////////////////////

CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NULL,
    contacto VARCHAR(100),
    direccion TEXT
);

CREATE TABLE servicios (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    equipo VARCHAR(100),
    falla TEXT,
    fecha_ingreso DATE,
    fecha_salida DATE,
    descripcion_reparacion TEXT,
    costo DECIMAL(10,2),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);


consulta

SELECT * FROM personas WHERE id = 8


para consultar que cliente realizo el servicio tecnico espesifico
SELECT c.nombre, c.apellido
FROM clientes c
INNER JOIN serviciotecnico st ON c.id_cliente = st.id_cliente
WHERE st.id_reparacion = 8;


// para solo consultar name del id 27
SELECT name 
FROM personas
WHERE id = 27;

// crear 10 digitos decimal 10 total con 2 decimales
ALTER TABLE clientes
ADD COLUMN saldo DECIMAL(10,2);

ALTER TABLE clientes ADD UNIQUE (correo);

ALTER TABLE `clientes` ADD UNIQUE(`telefono`);



SELECT
    id_servicio,
    equipo,
    estatus,
    marca,
    falla,
    dano,
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,
    presup
FROM
    servicios
WHERE
    f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
ORDER BY
    FIELD(
        estatus,
        'recibido',
        'revisado',
        'presupuesto',
        'repuestos',
        'reparar',
        'reparado',
        'irreparable',
        'reciclado',
        'abandonado',
        'entregado'
    ),
    f_in ASC;

    
        const query = `
    SELECT
        id_servicio,
        equipo,
        estatus,
        marca,
        falla,
        dano,
        DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,
        presup
    FROM
        servicios
    WHERE
        f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    ORDER BY
        FIELD(estatus, 'recibido', 'revisado', 'presupuesto', 'repuestos', 'reparar', 'reparado', 'irreparable', 'reciclado', 'abandonado', 'entregado'),
        f_in ASC;
`;









FROM (
  SELECT fecha1 AS fecha, monto1 AS monto, metodo_pago1 AS metodo_pago, costo1 AS costos FROM servicios WHERE fecha1 IS NOT NULL
  UNION ALL
  SELECT fecha2, monto2, metodo_pago2, costo2 FROM servicios WHERE fecha2 IS NOT NULL
  UNION ALL
  SELECT fecha3, monto3, metodo_pago3, costo3 FROM servicios WHERE fecha3 IS NOT NULL
) AS pagos    -- <-- Este es el alias de la tabla virtual resultante



SELECT
  fecha,
  SUM(CASE WHEN LOWER(metodo_pago) IN ('transferencia', 'yappyr', 'yappym') THEN monto ELSE 0 END) AS total_transferencia,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(monto) AS total_dia,
  SUM(costos) AS total_costos,
  SUM(monto) - SUM(costos) AS utilidad
FROM (
  -- ... (Aquí va la subconsulta UNION ALL que explicamos antes) ...
) AS pagos -- Estamos consultando esta tabla virtual 'pagos'
GROUP BY fecha
ORDER BY fecha DESC;






---------------------------------
chatgpt
SELECT 
  fecha AS dia,
  SUM(CASE WHEN metodo_pago = 'transferencia' THEN monto ELSE 0 END) AS total_transferencia,
  SUM(CASE WHEN metodo_pago = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(CASE WHEN metodo_pago = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(monto) AS total_dia,
  SUM(costo) AS total_costos,
  SUM(monto) - SUM(costo) AS utilidad
FROM (
  SELECT fecha1 AS fecha, monto1 AS monto, metodo_pago1 AS metodo_pago, costo FROM servicios
  WHERE fecha1 IS NOT NULL AND monto1 IS NOT NULL

  UNION ALL

  SELECT fecha2, monto2, metodo_pago2, costo FROM servicios
  WHERE fecha2 IS NOT NULL AND monto2 IS NOT NULL

  UNION ALL

  SELECT fecha3, monto3, metodo_pago3, costo FROM servicios
  WHERE fecha3 IS NOT NULL AND monto3 IS NOT NULL
) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
GROUP BY dia
ORDER BY dia DESC;

| dia        | total\_transferencia | total\_efectivo | total\_ach | total\_dia | total\_costos | utilidad |
| ---------- | -------------------- | --------------- | ---------- | ---------- | ------------- | -------- |
| 2025-06-10 | 1200                 | 800             | 500        | 2500       | 1500          | 1000     |
| 2025-06-09 | 2000                 | 0               | 700        | 2700       | 1700          | 1000     |
| ...        | ...                  | ...             | ...        | ...        | ...           | ...      |

------------------------------------------

copilot

SELECT
  fecha AS dia,
  SUM(CASE WHEN LOWER(metodo_pago) IN ('transferencia', 'yappyr', 'yappym') THEN monto ELSE 0 END) AS total_transferencia,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(monto) AS total_dia,
  SUM(costos) AS total_costos,
  SUM(monto) - SUM(costos) AS utilidad
FROM (
  SELECT 
    fecha1 AS fecha, 
    monto1 AS monto, 
    metodo_pago1 AS metodo_pago, 
    IFNULL(costo1, 0) AS costos
  FROM servicios
  WHERE fecha1 IS NOT NULL

  UNION ALL

  SELECT 
    fecha2, 
    monto2, 
    metodo_pago2, 
    IFNULL(costo2, 0)
  FROM servicios
  WHERE fecha2 IS NOT NULL

  UNION ALL

  SELECT 
    fecha3, 
    monto3, 
    metodo_pago3, 
    IFNULL(costo3, 0)
  FROM servicios
  WHERE fecha3 IS NOT NULL
) AS pagos
GROUP BY fecha
ORDER BY fecha DESC;



*************************modificando  



SELECT 
  DATE_FORMAT(fecha, '%Y-%m-%d') AS dia,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(monto) AS total_dia,
  SUM(costos) AS total_costos,
  SUM(monto) - SUM(costos) AS utilidad
FROM (
  SELECT fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago, IFNULL(costo, 0) AS costos FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  SELECT fpabono, abono, met_pgab, IFNULL(costo, 0) FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL  AND met_pgab IS NOT NULL

  UNION ALL

  SELECT fpfinal, pfinal, met_pgfn, IFNULL(costo, 0) FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL

) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY dia
ORDER BY dia DESC;




SELECT 
  DATE_FORMAT(fecha, '%Y-%m-%d') AS dia,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN  LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(monto) AS total_dia,
  SUM(costos) AS total_costos,
  SUM(monto) - SUM(costos) AS utilidad
FROM (
  SELECT fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago, IFNULL(costo, 0) AS costos FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  SELECT fpabono, abono, met_pgab FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL  AND met_pgab IS NOT NULL

  UNION ALL

  SELECT fpfinal, pfinal, met_pgfn FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL

) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY dia
ORDER BY dia DESC;







SELECT 
  DATE_FORMAT(pagos.fecha, '%Y-%m-%d') AS dia,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(monto) AS total_dia,
  SUM(DISTINCT IFNULL(costo, 0)) AS total_costos,
  SUM(monto) - SUM(DISTINCT IFNULL(costo, 0)) AS utilidad
FROM (
  SELECT id, fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  SELECT id, fpabono, abono, met_pgab FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL AND met_pgab IS NOT NULL

  UNION ALL

  SELECT id, fpfinal, pfinal, met_pgfn FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL
) AS pagos
JOIN servicios ON pagos.id = servicios.id
WHERE pagos.fecha >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
GROUP BY dia
ORDER BY dia DESC;


--------------------------------------------------------
sin costos ni utilidad

SELECT 
  DATE_FORMAT(fecha, '%Y-%m-%d') AS dia,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(monto) AS total_dia
FROM (
  SELECT fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago 
  FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  SELECT fpabono, abono, met_pgab 
  FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL AND met_pgab IS NOT NULL

  UNION ALL

  SELECT fpfinal, pfinal, met_pgfn 
  FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL
) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY dia
ORDER BY dia DESC;





✅ Consulta actualizada para resumen mensual

SELECT 
  DATE_FORMAT(fecha, '%Y-%m') AS mes,  -- 👈 cambia agrupación por mes
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(monto) AS total_mes
FROM (
  SELECT fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago 
  FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  SELECT fpabono, abono, met_pgab 
  FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL AND met_pgab IS NOT NULL

  UNION ALL

  SELECT fpfinal, pfinal, met_pgfn 
  FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL
) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY mes
ORDER BY mes DESC;


