const express = require('express');
const router  = express.Router();
const db      = require('../db');

router.post('/generar-plan', async (req, res) => {
  const { ingredientes, preferencias } = req.body;

  if (!ingredientes || ingredientes.length === 0)
    return res.status(400).json({ error: 'Selecciona al menos un ingrediente' });

  try {
    // 1. Buscar en MySQL los productos disponibles
    const condiciones = ingredientes.map(i => `p.nombre LIKE '%${i}%'`).join(' OR ');
    const [productos] = await db.query(`
      SELECT p.nombre, p.precio, p.unidad, p.imagen_url, t.nombre AS tienda
      FROM productos_tienda p
      JOIN tiendas t ON p.tienda_id = t.id
      WHERE (${condiciones}) AND p.disponible = TRUE
      ORDER BY p.nombre, p.precio ASC
    `);

    // 2. Construir contexto para Groq con precios reales
    const productosTexto = productos.map(p =>
      `- ${p.nombre} | $${p.precio} por ${p.unidad} | Disponible en: ${p.tienda}`
    ).join('\n');

    // 3. Prompt para Groq
    const prompt = `
Eres un asistente de cocina para familias ecuatorianas.
Tienes disponibles estos productos con precios reales de supermercados en Ecuador:

${productosTexto}

Preferencias del usuario: "${preferencias || 'comida casera ecuatoriana'}"

Genera un plan de comidas para 5 días (lunes a viernes) usando SOLO los ingredientes disponibles arriba.
Responde ÚNICAMENTE con JSON válido, sin texto adicional:

{
  "plan": [
    {
      "dia": "lunes",
      "desayuno": { "nombre": "", "ingredientes": [], "tiempo_min": 0 },
      "almuerzo": { "nombre": "", "ingredientes": [], "tiempo_min": 0 },
      "cena":     { "nombre": "", "ingredientes": [], "tiempo_min": 0 }
    }
  ],
  "lista_compras": {
    "aki":       [],
    "supermaxi": []
  },
  "ahorro_estimado": 0.00,
  "consejo": ""
}`;

    // 4. Llamar a Groq
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        model:       'llama3-8b-8192',
        temperature: 0.7,
        max_tokens:  2000,
        messages: [
          { role: 'system', content: 'Responde SIEMPRE en JSON válido sin markdown ni texto extra.' },
          { role: 'user',   content: prompt },
        ],
      }),
    });

    const groqData = await groqRes.json();
    const texto    = groqData.choices?.[0]?.message?.content || '{}';
    const limpio   = texto.replace(/```json|```/g, '').trim();
    const plan     = JSON.parse(limpio);

    res.json({ ok: true, plan, total_productos_encontrados: productos.length });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
