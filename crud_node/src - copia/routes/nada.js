// para agregar  un cliente
router.post('/cadd', async (req, res) => {
    // console.log("recibiendo al guardar:", req.body);
    // console.log(req.body);
    try {


        const { name, telefono, correo, fecha, cedula, nota, saldo, variable_oculta } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 
        const newcliente = {
            name, telefono, correo, fecha, cedula, nota, saldo  //  , telefono, correo, fecha, cedula, nota, gasto
        }

        //const tel_cliente = id_cliente exist_client

        if (!variable_oculta) {    // cliente existe ?
            // Si cedula es null, undefined o una cadena vacía, muestra un mensaje de error o redirige a una página de error
            // return res.status(400).json({ error: 'El campo cédula es obligatorio' });
            // si es nulo quiere decir que no existe el cliente y hay que guardarlo como un cliente nuevo

            // await pool.query('INSERT INTO clientes SET ?', [newcliente]);

            const query = "INSERT INTO clientes SET ?";
            await pool.query(query, [newcliente]);
            console.log("cliente nuevo creado:", name);

            res.redirect('/');
        } else {
            //el cliente si existe y se debe actualizar el cliente y tenemos su id para hacerlo



            //const editPersona = { name, lastname, age };
            // await pool.query('UPDATE personas SET ? WHERE id = ?', [editPersona, id]);
            // const query = "UPDATE personas SET ? WHERE id = ?";
            // await pool.query(query, [id_cliente]);

            const query = 'UPDATE personas SET ? WHERE telefono = ?';
            const valoresActualizacion = [newcliente, telefono];

            const [results] = await pool.query(query, valoresActualizacion);

            console.log("cliente actualizado:", name);
            if (results.affectedRows === 0) {
                return res.status(404).json({ mensaje: 'Cliente no encontrado' });
            }


            res.redirect('/list');

        }


    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});



if (!id_cliente) {
    // Si cedula es null, undefined o una cadena vacía, muestra un mensaje de error o redirige a una página de error
    // return res.status(400).json({ error: 'El campo cédula es obligatorio' });
    // si es nulo quiere decir que no existe el cliente y hay que guardarlo como un cliente nuevo
} else {
    //el cliente si existe y se debe actualizar el cliente y tenemos su id para hacerlo


}



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

// const query = "SELECT name,saldo,telefono,cedula, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
const query = "SELECT name,saldo,telefono,cedula,id_cliente, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
const [rows] = await pool.query(query, [telefono]);

const query = "SELECT name,saldo,telefono,cedula,id_cliente, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE telefono = ?";
const [rows] = await pool.query(query, [telefono]);





//const { telefono } = req.params; // Obtiene el número de teléfono de los parámetros de la URL
//const { nombre, apellido, edad, estatus } = req.body; // Obtiene los datos de actualización del cuerpo de la solicitud

const { name, telefono, correo, fecha, cedula, nota, saldo } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 


try {

    const query = "SELECT * FROM clientes WHERE telefono = ?";
    const [rows] = await pool.query(query, [telefono]);



    const clienteActualizado = { nombre, apellido, edad, estatus }; // Crea un objeto con los datos actualizados
    // Consulta de actualización con sentencia preparada para prevenir inyección SQL
    const consultaActualizacion = 'UPDATE personas SET ? WHERE telefono = ?';
    const valoresActualizacion = [clienteActualizado, telefono];



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
