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




SELECT 
  DATE_FORMAT(fecha, '%Y-%m-%d') AS dia,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappyr' THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappym' THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach' THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(CASE WHEN LOWER(metodo_pago) = 'factura' THEN monto ELSE 0 END) AS total_factura,

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
  
  UNION ALL 

  SELECT ffactura,factura,'factura'
  FROM servicios
  WHERE ffactura IS NOT NULL AND factura IS NOT NULL


) AS pagos_normalizados
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY dia
ORDER BY dia DESC






SELECT 
  DATE_FORMAT(fecha, '%Y-%m') AS mes,  --  cambia agrupación por mes
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





SELECT 
  DATE_FORMAT(fecha, '%Y-%m') AS mes,

  -- Totales por método de pago
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappyr'   THEN monto ELSE 0 END) AS total_yappyr,
  SUM(CASE WHEN LOWER(metodo_pago) = 'yappym'   THEN monto ELSE 0 END) AS total_yappym,
  SUM(CASE WHEN LOWER(metodo_pago) = 'ach'      THEN monto ELSE 0 END) AS total_ach,
  SUM(CASE WHEN LOWER(metodo_pago) = 'efectivo' THEN monto ELSE 0 END) AS total_efectivo,
  SUM(CASE WHEN LOWER(metodo_pago) = 'factura'  THEN monto ELSE 0 END) AS total_factura,

  -- Total mensual excluyendo facturas
  SUM(CASE WHEN LOWER(metodo_pago) != 'factura' THEN monto ELSE 0 END) AS total_mes

FROM (
  -- Pagos por previsión
  SELECT fprevision AS fecha, prevision AS monto, met_pgrv AS metodo_pago 
  FROM servicios
  WHERE fprevision IS NOT NULL AND prevision IS NOT NULL AND met_pgrv IS NOT NULL

  UNION ALL

  -- Pagos por abono
  SELECT fpabono AS fecha, abono AS monto, met_pgab AS metodo_pago 
  FROM servicios
  WHERE fpabono IS NOT NULL AND abono IS NOT NULL AND met_pgab IS NOT NULL

  UNION ALL

  -- Pagos finales
  SELECT fpfinal AS fecha, pfinal AS monto, met_pgfn AS metodo_pago 
  FROM servicios
  WHERE fpfinal IS NOT NULL AND pfinal IS NOT NULL AND met_pgfn IS NOT NULL

  UNION ALL 

  -- Facturas (método fijo: 'factura')
  SELECT ffactura AS fecha, facturado AS monto, 'factura' AS metodo_pago 
  FROM servicios
  WHERE ffactura IS NOT NULL AND facturado IS NOT NULL
) AS pagos_normalizados

-- Filtrar por los últimos 6 meses
WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)

-- Agrupar por mes
GROUP BY mes
ORDER BY mes DESC;







    SELECT
        id_servicio,
        id_cliente,
        equipo,
        estatus,
        marca,
        falla,
        dano,
        DATE_FORMAT(fer, '%Y-%m-%d') AS fer,
        DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,
        presup,
        DATEDIFF(f_in, CURDATE()) AS dias_restantes
    FROM
        servicios
    WHERE
       estatus != 'entregado'
    ORDER BY
        FIELD(estatus, 'reparar', 'recibido', 'revisado', 'presupuesto', 'repuestos', 'reparado', 'irreparable', 'reciclado', 'abandonado', 'entregado'),
       
        fer IS NULL,
        fer ASC,
       f_in ASC;




-- Selecciona columnas específicas del registro de servicios
SELECT
    id_servicio,                          -- ID único del servicio
    id_cliente,                           -- ID del cliente asociado
    equipo,                               -- Tipo o nombre del equipo recibido
    estatus,                              -- Estado actual del servicio (ej. reparar, revisado, entregado)
    marca,                                -- Marca del equipo
    falla,                                -- Descripción de la falla reportada
    dano,                                 -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,  -- Fecha de recepción, formateada como YYYY-MM-DD
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,-- Fecha de ingreso al sistema, formateada como YYYY-MM-DD
    presup,                               -- Presupuesto estimado o aprobado
    DATEDIFF(f_in, CURDATE()) AS dias_restantes -- Días restantes hasta la fecha de ingreso (puede ser negativo si ya pasó)

-- Fuente de datos
FROM
    servicios                             -- Tabla principal que contiene los registros de servicio

-- Filtro para mostrar solo servicios ingresados en los últimos 3 meses
WHERE
    f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)

-- Orden personalizado de los resultados
ORDER BY
    FIELD(estatus,                        -- Ordena los estatus según prioridad definida manualmente
        'reparar', 'recibido', 'revisado', 'presupuesto', 'repuestos',
        'reparado', 'irreparable', 'reciclado', 'abandonado', 'entregado'),
    
    fer IS NULL,                          -- Coloca primero los registros que sí tienen fecha de recepción
    fer ASC,                              -- Ordena por fecha de recepción (más antiguos primero)
    f_in ASC;                             -- Luego ordena por fecha de ingreso (más antiguos primero)




    SELECT
    id_servicio,
    id_cliente,
    equipo,
    estatus,
    marca,
    falla,
    dano,
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,
    presup,
    DATEDIFF(f_in, CURDATE()) AS dias_restantes
FROM servicios
WHERE
    -- Mostrar todos los servicios excepto los entregados
    estatus != 'entregado'
    OR (
        -- Mostrar solo los entregados de los últimos 3 meses
        estatus = 'entregado'
        AND f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    f_in ASC;






WHERE
  (
    estatus NOT IN ('entregado', 'repuesto', 'recibido', 'revisado')
  )
  OR (
    estatus IN ('entregado', 'repuesto', 'recibido', 'revisado')
    AND f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
  )




SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente asociado al servicio
    equipo,            -- Tipo o nombre del equipo recibido
    estatus,           -- Estado actual del servicio (ej. reparado, entregado, etc.)
    marca,             -- Marca del equipo
    falla,             -- Falla reportada por el cliente
    dano,              -- Daño diagnosticado por el técnico
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,  -- Fecha estimada de reparación, formateada como 'YYYY-MM-DD'
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in, -- Fecha de ingreso del equipo, también formateada
    presup,            -- Monto del presupuesto asignado al servicio
    DATEDIFF(f_in, CURDATE()) AS dias_restantes -- Diferencia en días entre hoy y la fecha de ingreso (puede ser negativa si ya pasó)
FROM servicios         -- Tabla principal que contiene los registros de servicios

WHERE
    estatus != 'entregado'  -- Mostrar todos los servicios que NO están marcados como entregados
    OR (
        estatus = 'entregado'  -- Si el servicio está entregado...
        AND f_in >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)  -- ...solo mostrarlo si fue ingresado en los últimos 3 meses
    )

ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),  -- Orden personalizado de los estatus (no alfabético)
    fer IS NULL,     -- Prioriza los registros que sí tienen fecha estimada de reparación
    fer ASC,         -- Ordena por fecha estimada de reparación (más antigua primero)
    f_in ASC;        -- Si hay empate, ordena por fecha de ingreso (más antigua primero)




    SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,  -- Fecha de ingreso del equipo, también formateada
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_ent, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta entrega (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_ent IS NULL  -- Mostrar servicios sin fecha de entrega
        OR f_ent >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)  -- O entregados en los últimos 3 meses
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    ISNULL(f_ent), f_ent ASC;



    f_sal




        SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_ent, '%Y-%m-%d') AS f_ent,  -- Fecha de entrega
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_ent, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta entrega (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_ent IS NULL  -- Mostrar servicios sin fecha de entrega
        OR f_ent >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)  -- O entregados en los últimos 3 meses
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    ISNULL(f_ent), f_ent ASC;




    SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,    -- Fecha de ingreso del equipo
    DATE_FORMAT(f_ent, '%Y-%m-%d') AS f_ent,  -- Fecha de entrega del equipo
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_ent, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta entrega (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_ent IS NULL  -- Mostrar servicios sin fecha de entrega
        OR f_ent >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)  -- O entregados en los últimos 3 meses
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    ISNULL(f_ent), f_ent ASC;




SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,    -- Fecha de ingreso del equipo
    DATE_FORMAT(f_sal, '%Y-%m-%d') AS f_sal,  -- Fecha de salida del equipo
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_sal, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta salida (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_sal IS NULL  -- Mostrar servicios sin fecha de salida
        OR f_sal >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)  -- O salieron en los últimos 3 meses
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    f_in ASC,                            -- Luego ordena por fecha de ingreso (más antiguos primero)  
    ISNULL(f_sal), f_sal ASC;


SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,    -- Fecha de ingreso del equipo
    DATE_FORMAT(f_sal, '%Y-%m-%d') AS f_sal,  -- Fecha de salida del equipo
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_sal, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta salida (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_sal IS NULL  -- Mostrar servicios sin fecha de salida
        OR f_sal >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)  -- O salieron en los últimos 3 meses
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    f_in ASC,                            -- Luego ordena por fecha de ingreso (más antiguos primero)  
    f_sal IS NULL DESC, f_sal ASC;







    SELECT
    id_servicio,       -- ID único del servicio
    id_cliente,        -- ID del cliente
    equipo,            -- Tipo de equipo
    estatus,           -- Estado actual del servicio
    marca,             -- Marca del equipo
    falla,             -- Falla reportada
    dano,              -- Daño diagnosticado
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,      -- Fecha estimada de reparación
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,    -- Fecha de ingreso del equipo
    DATE_FORMAT(f_sal, '%Y-%m-%d') AS f_sal,  -- Fecha de salida del equipo
    presup,            -- Presupuesto asignado
    DATEDIFF(IFNULL(f_sal, CURDATE()), CURDATE()) AS dias_restantes  -- Días hasta salida (o desde hoy si no hay fecha)
FROM servicios
WHERE
    (
        f_sal IS NULL  -- Mostrar servicios sin fecha de salida
        OR f_sal >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)  -- O salieron en los últimos 7 dias 
    )
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NULL,
    fer ASC,
    f_in ASC,                            -- Luego ordena por fecha de ingreso (más antiguos primero)  
    f_sal IS NULL DESC, f_sal ASC;



    SELECT
    id_servicio,
    id_cliente,
    equipo,
    estatus,
    marca,
    falla,
    dano,
    DATE_FORMAT(fer, '%Y-%m-%d') AS fer,
    DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in,
    DATE_FORMAT(f_sal, '%Y-%m-%d') AS f_sal,
    presup,
    DATEDIFF(CURDATE(), f_sal) AS dias_restantes
FROM servicios
WHERE
    f_sal IS NULL -- mostrar lo que aun no tienen fecha de alida
    OR f_sal >= CURDATE() - INTERVAL 7 DAY  -- mostrar lo que si tienen fecha pero solo los ultimos 7 dias
ORDER BY
    FIELD(estatus,
        'reparar', 'recibido', 'revisado', 'presupuesto',
        'repuestos', 'reparado', 'irreparable',
        'reciclado', 'abandonado', 'entregado'),
    fer IS NOT NULL DESC,  -- Prioriza los que tienen fecha estimada
    fer,                   -- Ordena por fecha estimada (NULLs van al final)
    f_in,                  -- Ordena por fecha de ingreso
    f_sal IS NOT NULL DESC, f_sal;  -- Entregados recientes primero, NULLs al final


