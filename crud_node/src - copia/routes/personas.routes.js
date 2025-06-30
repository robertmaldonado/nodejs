import { Router } from 'express'
import pool from '../database.js'


/* 
import dotenv from 'dotenv'; // type module     con  "type": "module",
// Configurar dotenv para cargar variables del archivo .env
dotenv.config(); // type module  con "type": "module",

console.log(process.env.NOMBRE_SECRETO)
console.log(process.env.PUERTO_NUMERO)
 */

const router = Router();

//console.log(`Host de la base de datos: ${DB_HOST}`);

//let var_id_cliente;
let var_id_cliente = null; // Variable para almacenar el id_cliente cliente actual, si es nul no existe el cliente
let id_cliente_ult = null; // id del ultimo cliente buscado, actualizado o guardado

//-------------------------------------------------
// datos del ultimo cliente registrado o  buscado
const client_reg = {
    id_cliente: null,
    nombre: null,
    telefono: null,
    ubicacion: null,
    cedula: null,
    correo: null,
    fecha: null
};
//-------------------------------------------------
// datos del ultimo cliente
const client_actual = {
    id_cliente: null,
    nombre: null,
    telefono: null,
    ubicacion: null,
    cedula: null,
    correo: null,
    fecha: null
};

//client_actual.email = "nuevoCorreo@example.com";
//console.log(client_actual.nombre); // Imprime "Juan"
//--------------------------------------------------------------------


//client_actual.nombre = null;
//client_actual.nombre = "roberto";

router.get('/add', (req, res) => {
    res.render('personas/add');

    //console.log(global);
});


router.get('/service', (req, res) => {
    //res.render('personas/client');
    res.render('personas/service', { cliente: client_reg });
    console.log("dirigio a cliente"); // esto es para hacer pruebas
    // res.redirect(301, 'https://www.electronicarj.com'); 
    // res.redirect('https://www.electronicarj.com');  // https://electronicarj.com/app/tools/reg1.html
    //// res.redirect('https://electronicarj.com/app/tools/reg1.html');

    //console.log(global);
});



router.post('/service', async (req, res) => {
    try {
        const requiredFields = ["id_cliente", "equipo", "estatus", "falla", "f_in", "f_sal", "repuestos",
            "costo", "fer", "met_pg", "presup", "proced", "serial", "model", "marca", "abono", "pulg", "dano",
            "fprevision", "fpabono", "fpfinal", "prevision", "pfinal"];

        const newService = Object.fromEntries(
            requiredFields.map(field => [field, req.body[field] || null])
        );

        console.log('Datos recibidos:', newService);

        if (!newService.id_cliente) {
            return res.status(400).json({ message: "ID del cliente es obligatorio." });
        }

        const query = "INSERT INTO servicios SET ?";
        //await pool.query(query, [newService]);

        // Insertar datos en la tabla correcta (¿'services' en lugar de 'clientes'?)
        const [result] = await pool.query(query, [newService]);

        console.log("Nuevo servicio registrado, ID:", result.insertId);

        // res.redirect('/personas/lghjgh');xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        res.redirect('/listservice');
    } catch (error) {
        console.error("Error en la inserción:", error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/serviceedit', async (req, res) => {       // para editar servicio
    try {
        const requiredFields = ["id_cliente", "id_servicio", "equipo", "estatus", "falla", "f_in", "f_sal", "repuestos",
            "costo", "fer", "met_pg", "presup", "proced", "serial", "model", "marca", "abono", "pulg", "dano",
            "fprevision", "fpabono", "fpfinal", "prevision", "pfinal"];

        const newService = Object.fromEntries(
            requiredFields.map(field => [field, req.body[field] || null])
        );

        const query = "UPDATE servicios SET ? WHERE id_servicio = ?";
        console.log('Datos recibidos serviceedit:', newService);

        if (!newService.id_cliente) {
            return res.status(400).json({ message: "ID del cliente es obligatorio." });
        }

        // const query = 'UPDATE personas SET ? WHERE id = ?', [newServicex, id];

        // await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
        //await pool.query(query, [newService]);

        // Insertar datos en la tabla correcta (¿'services' en lugar de 'clientes'?)
        const [result] = await pool.query(query, [newService, newService.id_servicio]);

        //  await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);

        //  console.log("Nuevo servicio registrado, ID:", result.insertId);

        // res.redirect('/');

        res.redirect('/listservice');
    } catch (error) {
        console.error("Error en la inserción:", error);
        res.status(500).json({ message: error.message });
    }
});







router.get('/client', (req, res) => {

    // res.render('personas/client', { title: 'Página sin partials', layout: 'noPartials' });
    // res.render('personas/client', { cliente: client_actual });


    res.render('personas/client', {
        title: 'Página sin partials',
        layout: 'noPartials',
        cliente: client_actual
    });



    console.log("dirigio a cliente"); // esto es para hacer pruebas
    // res.redirect(301, 'https://www.electronicarj.com'); 
    // res.redirect('https://www.electronicarj.com');  // https://electronicarj.com/app/tools/reg1.html
    //// res.redirect('https://electronicarj.com/app/tools/reg1.html');







    //console.log(global);
});

//aqi guardamos en variable en la ram datos cliente actual----------------------------------------------
router.post('/client', async (req, res) => {
    //res.render('personas/client');
    //res.render('personas/client', { cliente: client_actual });
    // console.log("dirigio a cliente"); // esto es para hacer pruebas
    // res.redirect(301, 'https://www.electronicarj.com'); 
    // res.redirect('https://www.electronicarj.com');  // https://electronicarj.com/app/tools/reg1.html
    //// res.redirect('https://electronicarj.com/app/tools/reg1.html');

    // console.log(process.env.NOMBRE_SECRETO)
    // console.log(process.env.PUERTO_NUMERO)

    let { nombre, telefono, ubicacion, cedula, correo, fechaactual } = req.body;

    // en caso que no este definido ponerlo como null
    nombre = nombre || null;
    telefono = telefono || null;
    ubicacion = ubicacion || null;
    cedula = cedula || null;
    correo = correo || null;
    fechaactual = fechaactual || null;

    //formatPhoneNumber(telefono);
    // client_actual.telefono = formatPhoneNumber(telefono);

    // client_actual.telefono = validarYCorregirTelefono(telefono);
    let valorxz = validarYCorregirTelefono(telefono);

    if (!valorxz) {
        return res.status(500).json({ error: "El teléfono está incorrecto. Debe tener el formato XXXX-XXXX." });
    }



    // client_actual.nombre = nombre;
    telefono = client_actual.telefono = valorxz;
    nombre = client_actual.nombre = nombre.trim().replace(/\s+/g, ' '); //quita espacio al inicio y final y mas de un espacio intermedios

    //client_actual.telefono = telefono;
    ubicacion = client_actual.ubicacion = ubicacion.trim().replace(/\s+/g, ' '); //quita espacio al inicio y final y mas de un espacio intermedios

    if (cedula) {
        cedula = client_actual.cedula = cedula.trim().replace(/\s+/g, ''); //quita cualquier  espacio 
    } else {
        client_actual.cedula = cedula;
    }

    if (correo) {
        correo = client_actual.correo = correo.trim().replace(/\s+/g, ''); //quita cualquier  espacio
    } else {

        client_actual.correo = correo;
    }

    client_actual.fecha = fechaactual;


    // si algun dato es duplicado osea ya existe  actualiza todo telefono, name,ubicacion,cedula

    console.log(`Usuario : ${client_actual.telefono}`);
    console.log(`Usuario : ${client_actual.nombre}`);
    console.log(`Usuario : ${client_actual.ubicacion}`);
    console.log(`Usuario : ${client_actual.cedula}`);
    console.log(`Usuario : ${client_actual.correo}`);
    console.log(`Usuario : ${client_actual.fecha}`);
    console.log(`Usuariotelefono  : ${valorxz}`);

    //--------------------------
    // esto es para que cuando un cliente se registre sus datos ya esten agregados cuando se agrega el servicio esto agiliza mas rapidez

    client_reg.fecha = client_actual.fecha;
    client_reg.nombre = client_actual.nombre;
    client_reg.telefono = client_actual.telefono;
    client_reg.ubicacion = client_actual.ubicacion;
    client_reg.correo = client_actual.correo;
    client_reg.cedula = client_actual.cedula;
    // falta el id del cliente
    //-----------------------------





    // Ejecución de la consulta con parámetros
    let usuarioId;


    try {

        const queryBuscar = `SELECT id_cliente FROM clientes WHERE telefono = ?`;
        const [rows1] = await pool.execute(queryBuscar, [valorxz]);

        // Asegurarse de inicializar `rows` correctamente
        //const [rows] = await pool.execute(query, [telefono]);
        //console.log(`Usuariotelefonodsfdfs : ${rows1}`);
        console.log("Contenido de rows1:", rows1);



        // Comprobar si se encontró algún usuario
        if (rows1.length > 0) {
            console.log(`Usuario encontrado con ID: ${rows1[0].id_cliente}`);

            // 2. Si existe, actualizar
            usuarioId = rows1[0].id_cliente; // antes era const

            client_reg.id_cliente = usuarioId;//********************* */


            const query = `UPDATE clientes SET name = ?, address = ?, correo = ?, fecha = ?, cedula = ? WHERE id_cliente = ?`;
            const params = [nombre, ubicacion, correo, fechaactual, cedula, usuarioId];

            const [rows] = await pool.execute(query, params);

            // console.log('No se encontró usuario con ese nombre.');
            console.log('usuario actualizado');

            //return true; // Existe usuario con ese nombre
        } else {
            console.log('No se encontró usuario con ese nombre.');


            // Usuario no encontrado, insertarlo
            console.log('No se encontró usuario con ese teléfono. Se agregará.');

            const queryInsertar = `INSERT INTO clientes (name, telefono, correo, fecha, cedula, address) VALUES (?, ?, ?, ?, ?, ?)`;
            const [result] = await pool.execute(queryInsertar, [nombre, telefono, correo, fechaactual, cedula, ubicacion]);

            if (result.affectedRows > 0) {
                console.log("Usuario agregado correctamente con ID:", result.insertId);

                usuarioId = result.insertId

                client_reg.id_cliente = usuarioId;//********************** */

                // res.json({ mensaje: "Usuario agregado correctamente.", id: result.insertId });
            } else {
                console.log("Error al insertar usuario.");
                res.status(500).json({ error: "No se pudo agregar el usuario." });
            }

            // res.json({ mensaje: "Usuario agregado correctamente." });




            //return false; // No existe
        }
    } catch (err) {
        console.error('Error en la operación:', err.message);
        // console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({ message: err.message });
    }




    //-----------------
    const termino = " SI, ESTOY DE ACUERDO E INFORMADO  Tengo 15 DIAS desde la notificación para retirar mi equipo; de lo contrario, será RECICLADO.";

    const mensajewa = ` Informacion del cliente:
- Numero de cliente: C${usuarioId}
- Fecha de entrada: ${fechaactual}
- Nombre: ${nombre}
- Teléfono: ${telefono}
- Ubicacion: ${ubicacion}
- Correo: ${correo}
- Cedula: ${cedula} 

* Terminos: ${termino}`;

    const numeroWhatsApp = "50765281803";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensajewa)}`;
    res.redirect(url); // Redirige automáticamente al enlace de WhatsApp

    //---------------


    // const numero = '12345678'; // Número sin guión
    // const mensaje = encodeURIComponent('Hola mundo'); // Codifica caracteres especiales

    // const enlace = `https://wa.me/${numero}?text=${mensaje}`;
    // res.redirect(enlace); // Redirige automáticamente al enlace de WhatsApp

    // res.json({ enlace });





    // res.render('personas/client', { cliente: client_actual });//*********** */

    //console.log(global);
});


// comentarios
router.get('/cadd', (req, res) => {
    //res.render('personas/client', { cliente: client_actual });
    console.log("dirigio a cliente jhfjf"); // esto es para hacer pruebas
    res.render('personas/cadd', { cliente: client_actual });
});

// limpiar
router.get('/clear', (req, res) => {
    client_actual.nombre = null;
    client_actual.telefono = null;
    client_actual.ubicacion = null;
    client_actual.correo = null;
    client_actual.cedula = null;

    //res.render('personas/client', { cliente: client_actual });

    res.render('personas/client', { title: 'Página sin partials', layout: 'noPartials', cliente: client_actual });
});




// para agregar  un cliente
router.post('/cadd', async (req, res) => {
    //console.log("recibiendo al guardar:", req.body); // esto es para hacer pruebas
    // console.log(req.body);
    // console.log(var_id_cliente);
    console.log("id guardado en servidor node", var_id_cliente); // esto es para hacer pruebas


    let { name, telefono, address, correo, fecha, cedula, nota, saldo } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 






    correo = correo || null;
    cedula = cedula || null;
    //ubicacion = ubicacion || null;
    address = address || null;

    const clienteData1 = [telefono, name, address, correo, cedula];


    /*  const newcliente = {
         name, telefono, correo: correo || null, fecha, cedula: cedula || nul, nota, saldo, address: ubicacion || null  //  , telefono, correo, fecha, cedula, nota, gasto
     }; */

    // if (!newcliente.correo) {
    //     datosCliente.correo = null;
    // }

    // const datosCliente = { nombre, correo: correo || null }; // Si correo no existe, lo dejamos como NULL

    //await pool.query('INSERT INTO clientes SET ?', [newcliente]);


    // si algun dato es duplicado osea ya existe  actualiza todo telefono, name,ubicacion,cedula
    const query = `INSERT INTO clientes (telefono,name,address,correo,cedula) VALUES (?,?,?,?,?)
                    ON DUPLICATE KEY UPDATE telefono = VALUES(telefono),name = VALUES(name),
                    address = VALUES(address),correo = VALUES(correo),cedula = VALUES(cedula)`;

    //const [result] = await pool.query('INSERT INTO clientes SET ?', [newcliente]);

    //  const { name, telefono, ubicacion, correo, fecha, cedula, nota, saldo } = req.body;


    /*  // Consulta SQL para insertar un nuevo cliente
     const query1 = `
         INSERT INTO clientes (name, telefono, ubicacion, correo, fecha, cedula, nota, saldo)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
       `;
  */
    // Ejecución de la consulta con parámetros



    try {
        const [result] = await pool.execute(query, clienteData1);
        if (result.affectedRows === 1) {
            console.log('Registro insertado.');
        } else if (result.affectedRows === 2) {
            console.log('Registro actualizado.');
        }
        res.redirect('/');
    } catch (err) {
        console.error('Error en la operación:', err.message);
        res.status(500).json({ message: err.message });
    }







    /* 
    
        try {
            const [result] = await pool.execute(query, clienteData1);
    
            // Obtener el ID del cliente recién insertado
            const insertedId = result.insertId;
            console.log("Cliente nuevo, su ID es:", insertedId);
    
            res.redirect('/');
        } catch (err) {
            console.error('Error al insertar el cliente:', err.message);
            res.status(500).json({ message: 'Error al insertar el cliente.' });
        }
     */


});




// para agregar  un cliente
router.post('/caddxz', async (req, res) => {
    //console.log("recibiendo al guardar:", req.body); // esto es para hacer pruebas
    // console.log(req.body);
    // console.log(var_id_cliente);
    console.log("id guardado en servidor node", var_id_cliente); // esto es para hacer pruebas
    try {

        const { name, telefono, ubicacion, correo, fecha, cedula, nota, saldo } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 


        const newcliente = {
            name, telefono, correo: correo || null, fecha, cedula: cedula || null, nota, saldo, address: ubicacion || null  //  , telefono, correo, fecha, cedula, nota, gasto
        }

        // if (!newcliente.correo) {
        //     datosCliente.correo = null;
        // }

        // const datosCliente = { nombre, correo: correo || null }; // Si correo no existe, lo dejamos como NULL

        // await pool.query('INSERT INTO clientes SET ?', [newcliente]);


        const [result] = await pool.query('INSERT INTO clientes SET ?', [newcliente]);



        // Obtener el ID del cliente recién insertado 
        const insertedId = result.insertId;
        console.log("cliente nuevo su id es", insertedId); // esto es para hacer pruebas

        res.redirect('/');
        //var_id_cliente = id_cliente; // Asignación a la nueva variable id del cliente actual en caso que exista error hay que sacar el id actual del cliente y guardarlo en la variable
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/add', async (req, res) => {
    try {
        const { name, lastname, age, estatus } = req.body;
        const newPersona = {
            name, lastname, age, estatus
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});



//guardarCliente('Juan Pérez', '1234');
//primero verifica si existe el numero de telefono en caso de existir actualiza y si no existe lo guarda, esto evita duplicar el mismo telefono cliente
async function guardarCliente(nombre, telefono) {
    try {
        const [rows] = await connection.promise().query('SELECT * FROM clientes WHERE telefono = ?', [telefono]);
        if (rows.length > 0) {
            await connection.promise().query('UPDATE clientes SET nombre = ? WHERE telefono = ?', [nombre, telefono]);
            console.log('Cliente actualizado');
        } else {
            await connection.promise().query('INSERT INTO clientes (nombre, telefono) VALUES (?, ?)', [nombre, telefono]);
            console.log('Cliente insertado');
        }
    } catch (error) {
        console.error(error);
    }
}

// Ruta para verificar la cédula
// Ruta para verificar la cédula
router.post('/check-cedula', async (req, res) => {
    const { telefono } = req.body;

    try {
        // Ejecutar la consulta
        //const [rows] = await pool.query("SELECT * FROM clientes WHERE cedula = ?", [cedula]);
        // const query = "SELECT name,saldo,telefono,cedula, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
        const query = "SELECT name,saldo,telefono,address,correo,cedula,id_cliente, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
        // const query = "SELECT name,saldo,telefono,address,correo,cedula,id_cliente,fecha FROM clientes WHERE telefono = ?";// da error
        //const query = "SELECT name,saldo,telefono,address,correo,cedula,id_cliente,DATE(fecha) AS fecha FROM clientes WHERE telefono = ?"; //error



        const [rows] = await pool.query(query, [telefono]);

        console.log("recibienviado:", rows[0]);
        // Suponiendo que solo esperamos un resultado (un cliente)
        if (rows.length > 0) {
            // Si la cédula existe
            //global = 8;//
            // const { id_cliente } = rows[0]; // Desestructuración para obtener id_cliente
            const cliente = rows[0];
            const cedula = cliente.id_cliente;
            const telefono = cliente.telefono;
            const name = cliente.name;
            const address = cliente.address;

            client_reg.id_cliente = cliente.id_cliente;
            client_reg.nombre = cliente.name;
            client_reg.telefono = telefono;
            client_reg.ubicacion = address;

            client_reg.fecha = cliente.fecha;// fecha
            client_reg.cedula = cliente.cedula; //cedula
            client_reg.correo = cliente.correo;  // correo
            console.log("clientefecha:", client_reg.fecha);
            //const name = cliente.name;
            // var_id_cliente = id_cliente; // Asignación a la nueva variable id del cliente actual en caso que exista
            //id_cliente_ult = id_cliente; // id dl ultimo cliente buscado encontrado
            //client_actual.id_cliente = id_cliente.id_cliente;
            console.log("/check-cedula id es", cedula); // esto es para hacer pruebas
            console.log("/check-cedula tel es", telefono); // esto es para hacer pruebas

            // return rows[0].id_cliente;
            //console.log(global);
            //console.log("El ID del cliente es:", var_id_cliente);
            res.json({ exists: true, data: rows[0] });
        } else {
            // Si no existe
            res.json({ exists: false });
            // console.log("No se encontró ningún cliente con ese número de teléfono.");
            var_id_cliente = null; //  en el caso qno exista lo actualizamos a null
        }
    } catch (error) {
        console.error("Error al verificar la cédula:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});


router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes');
        //  console.log(result); imprime en la consola del terminal no del navegador es para hacer pruebas
        res.render('personas/list', { personas: result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/listservice', async (req, res) => {


    try {

        const queryz = `
            SELECT equipo, marca, falla, estatus, f_in, repuestos
            FROM servicios 
            WHERE f_in >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            ORDER BY f_in DESC
        `;

        const query3 = `
            SELECT equipo, estatus, marca, falla, DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in, presup
            FROM servicios
            WHERE f_in >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            AND estatus != 'entregado'
            ORDER BY f_in ASC
        `;

        // no muestra los equips entregados
        const query8 = `
            SELECT id_servicio, equipo, estatus, marca, falla, dano, DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in, presup
            FROM servicios
            WHERE f_in >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            AND estatus != 'entregado'
            ORDER BY FIELD(estatus, 'recibido', 'revision', 'presupuesto'), f_in ASC`

            ;


        const query = `
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


        
        
`;





        const [result] = await pool.query(query);

        res.render('personas/listservice', { personas: result });

        console.log("Servicios recientes:", result);
        return result;
    } catch (error) {
        console.error("Error obteniendo servicios:", error);
    }
});

router.get('/editservice/:id', async (req, res) => {
    try {

        const { id } = req.params;// obtenemos el id del servicio

        const [serviciosRowsx] = await pool.query('SELECT * FROM servicios WHERE id_servicio  = ?', [id]);


        const [serviciosRows] = await pool.query(`SELECT *, DATE_FORMAT(f_in, '%Y-%m-%d') AS f_in ,
             DATE_FORMAT(f_sal, '%Y-%m-%d') AS f_sal , DATE_FORMAT(fer, '%Y-%m-%d') AS fer  ,
              DATE_FORMAT(fpabono, '%Y-%m-%d') AS fpabono ,
               DATE_FORMAT(fpfinal, '%Y-%m-%d') AS fpfinal , DATE_FORMAT(fprevision, '%Y-%m-%d') AS fprevision  FROM servicios WHERE id_servicio = ?`, [id]);


        // Es una buena práctica desestructurar el array para obtener la fila, si esperas solo una.
        const servicio = serviciosRows[0]; // Si esperas un solo servicio

        const idcliente = servicio.id_cliente // obtenemos el id del cliente


        const [clientesRowsx] = await pool.query('SELECT * FROM clientes WHERE id_cliente  = ?', [idcliente]);
        //const [clientesRowsZ] = await pool.query('SELECT * , DATE_FORMAT(f_in, ' % Y -% m -% d') AS f_in   FROM clientes WHERE id_cliente  = ?', [idcliente]);
        const [clientesRows] = await pool.query(`SELECT *, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE id_cliente = ?`, [idcliente]);

        const cliente = clientesRows[0];
        // res.render('personas/edit', { clientex: cliente });

        console.log("Servicio:", servicio);
        console.log("cliente:", cliente);

        res.render('personas/editservice', {
            servicio: servicio, // La variable 'servicio' estará disponible en Handlebars
            cliente: cliente    // La variable 'cliente' estará disponible en Handlebars
            // Puedes añadir más variables aquí si las necesitas
        });

        // res.redirect('/');


    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit', { persona: personaEdit });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/edit/:id', async (req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const { id } = req.params;
        const editPersona = { name, lastname, age };
        await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
        res.redirect('/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function buscarIdPorCedula(cedula) {

}

// Exporta la función para obtener el id_cliente
// export function getIdCliente() {
//     return var_id_cliente;
// }

function formatPhoneNumber(phone) {
    // Elimina cualquier carácter que no sea dígito
    const digits = phone.replace(/\D/g, '');

    // Verifica que tenga 8 dígitos, de lo contrario devuelve el original o lanza un error
    if (digits.length !== 8) {
        // Puedes ajustar este comportamiento según tus necesidades
        //  const textoSinEspacios = phone.replace(/ /g, '');
        return phone.replace(/ /g, '');// elimina solo los espacios
    }

    // Inserta un guion después de los primeros 4 dígitos
    return digits.replace(/(\d{4})(\d{4})/, '$1-$2');
}





export default router;







function validarYCorregirTelefono(numero) {
    // Expresión regular para verificar si el número tiene el formato correcto (XXXX-XXXX)

    // numero = numero.trim().replace(/\s+/g, ' '); //quita espacio al inicio y final y mas de un espacio intermedios

    numero = numero.replace(/\s+/g, '');

    const regexFormatoCorrecto = /^\d{4}-\d{4}$/;

    // Si ya tiene el formato correcto, lo devolvemos tal cual
    if (regexFormatoCorrecto.test(numero)) {
        return numero;
    }

    // Expresión regular para detectar si el número tiene 8 dígitos seguidos
    const regexSoloNumeros = /^\d{8}$/;

    if (regexSoloNumeros.test(numero)) {
        // Insertamos el guion en la posición correcta
        return numero.slice(0, 4) + "-" + numero.slice(4);
    }

    // Si no cumple ninguna de las condiciones, devolver null o mensaje de error
    return null; // O puedes devolver un mensaje indicando que el formato es inválido

    /* 
    // Ejemplo de uso:
    console.log(validarYCorregirTelefono("1234-5678")); // Output: 1234-5678 (ya está correcto)
    console.log(validarYCorregirTelefono("12345678"));  // Output: 1234-5678 (corrige el formato)
    console.log(validarYCorregirTelefono("123-56789")); // Output: null (no válido) */



}


