const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.post('/login', async (req, res) => {
    // Placeholder login logic
    const { email, password } = req.body;
    res.json({ ok: true, message: 'Logged in as ' + email, token: 'fake-jwt-token' });
});

router.post('/register', async (req, res) => {
    // Placeholder register logic
    const { nombre, email, password } = req.body;
    res.json({ ok: true, message: 'Registered ' + email });
});

module.exports = router;