const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM recetas');
        res.json({ ok: true, recetas: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { usuario_id, nombre, descripcion, porciones, tiempo_min, categoria } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO recetas (usuario_id, nombre, descripcion, porciones, tiempo_min, categoria) VALUES (?, ?, ?, ?, ?, ?)',
            [usuario_id || 1, nombre, descripcion, porciones, tiempo_min, categoria]
        );
        res.json({ ok: true, insertId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;