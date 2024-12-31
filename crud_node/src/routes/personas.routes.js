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

export default router;