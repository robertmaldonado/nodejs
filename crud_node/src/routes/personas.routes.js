import { Router } from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add', (req, res) => {
    res.render('personas/add');
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
    console.log("recibiendo al guardar:", req.body);
    // console.log(req.body);
    try {

        const { name, telefono, correo, fecha, cedula, nota, saldo } = req.body;  // , telefono, correo, fecha, cedula, nota, gasto 
        const newcliente = {
            name, telefono, correo, fecha, cedula, nota, saldo  //  , telefono, correo, fecha, cedula, nota, gasto
        }
        await pool.query('INSERT INTO clientes SET ?', [newcliente]);
        res.redirect('/');
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ruta para verificar la cédula
// Ruta para verificar la cédula
router.post('/check-cedula', async (req, res) => {
    const { cedula } = req.body;

    try {
        // Ejecutar la consulta
        //const [rows] = await pool.query("SELECT * FROM clientes WHERE cedula = ?", [cedula]);
        const query = "SELECT name,saldo, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha FROM clientes WHERE cedula = ?";
        const [rows] = await pool.query(query, [cedula]);

        console.log("recibienviado:", rows[0]);
        if (rows.length > 0) {
            // Si la cédula existe
            res.json({ exists: true, data: rows[0] });
        } else {
            // Si no existe
            res.json({ exists: false });
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







export default router;