const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.get('/:ingrediente', async (req, res) => {
  const { ingrediente } = req.params;
  try {
    const [rows] = await db.query(`
      SELECT
        p.nombre,
        p.precio,
        p.imagen_url,
        p.unidad,
        p.categoria,
        t.nombre  AS tienda,
        t.id      AS tienda_id
      FROM productos_tienda p
      JOIN tiendas t ON p.tienda_id = t.id
      WHERE p.nombre LIKE CONCAT('%', ?, '%')
        AND p.disponible = TRUE
      ORDER BY p.precio ASC
      LIMIT 10
    `, [ingrediente]);

    const aki       = rows.filter(r => r.tienda_id === 1);
    const supermaxi = rows.filter(r => r.tienda_id === 2);
    const masBarato = (aki[0]?.precio || 999) <= (supermaxi[0]?.precio || 999) ? 'aki' : 'supermaxi';

    res.json({ aki, supermaxi, mas_barato: masBarato });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
