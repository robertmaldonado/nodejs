import { Router } from 'express'
import pool from '../database.js'

const router = Router();

//let var_id_cliente;
let var_id_cliente = null; // Variable para almacenar el id_cliente cliente actual, si es nul no existe el cliente
let id_cliente_ult = null; // id del ultimo cliente buscado, actualizado o guardado


//-------------------------------------------------
// datos del ultimo cliente
const client_actual = {
    id_cliente: null,
    nombre: null,
    apellido: null,
    email: null
};

client_actual.email = "nuevoCorreo@example.com";
//console.log(client_actual.nombre); // Imprime "Juan"
//--------------------------------------------------------------------


client_actual.nombre = "roberto";

router.get('/add', (req, res) => {
    res.render('personas/add');

    //console.log(global);
});

router.get('/cliente', (req, res) => {
    //res.render('personas/client');
    res.render('personas/client', { cliente: client_actual });
    console.log("dirigio a cliente"); // esto es para hacer pruebas
    // res.redirect(301, 'https://www.electronicarj.com'); 
    // res.redirect('https://www.electronicarj.com');  // https://electronicarj.com/app/tools/reg1.html
    //// res.redirect('https://electronicarj.com/app/tools/reg1.html');

    //console.log(global);
});

//aqi guardamos en variable en la ram datos cliente actual
router.post('/cliente', (req, res) => {
    //res.render('personas/client');
    res.render('personas/client', { cliente: client_actual });
    console.log("dirigio a cliente"); // esto es para hacer pruebas
    // res.redirect(301, 'https://www.electronicarj.com'); 
    // res.redirect('https://www.electronicarj.com');  // https://electronicarj.com/app/tools/reg1.html
    //// res.redirect('https://electronicarj.com/app/tools/reg1.html');

    //console.log(global);
});


// comentarios
router.get('/cadd', (req, res) => {
    res.render('personas/cadd');
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



// para agregar  un cliente
router.post('/cadd', async (req, res) => {
    //console.log("recibiendo al guardar:", req.body); // esto es para hacer pruebas
    // console.log(req.body);
    // console.log(var_id_cliente);
    console.log("id guardado en servidor node", var_id_cliente); // esto es para hacer pruebas
    try {

        const { name, telefono, correo, fecha, cedula, nota, saldo } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 


        const newcliente = {
            name, telefono, correo: correo || null, fecha, cedula: cedula || null, nota, saldo  //  , telefono, correo, fecha, cedula, nota, gasto
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
        const query = "SELECT name,saldo,telefono,cedula,id_cliente, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
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
        const [result] = await pool.query('SELECT * FROM personas');
        //  console.log(result); imprime en la consola del terminal no del navegador es para hacer pruebas
        res.render('personas/list', { personas: result });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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







export default router;