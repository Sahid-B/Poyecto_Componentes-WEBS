const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM planes_semana');
        res.json({ ok: true, planes: rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { usuario_id, semana_inicio } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO planes_semana (usuario_id, semana_inicio) VALUES (?, ?)',
            [usuario_id || 1, semana_inicio]
        );
        res.json({ ok: true, insertId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;