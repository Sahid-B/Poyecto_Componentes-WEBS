const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM lista_compras');
        res.json({ ok: true, compras: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { plan_id, nombre_ingrediente, cantidad_total, unidad } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO lista_compras (plan_id, nombre_ingrediente, cantidad_total, unidad) VALUES (?, ?, ?, ?)',
            [plan_id, nombre_ingrediente, cantidad_total, unidad]
        );
        res.json({ ok: true, insertId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;