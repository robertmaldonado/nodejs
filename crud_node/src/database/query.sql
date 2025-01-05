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


