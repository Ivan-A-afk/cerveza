const express = require("express");
const db = require("./pg-con-master");

const app = express();
const PORT = process.env.PORT || 8081;

// Ruta de prueba para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando en Render con PostgreSQL");
});

// Ruta para probar la conexión a la DB
app.get("/db-test", async (req, res) => {
  try {
    const result = await db.one("SELECT NOW() AS now");
    console.log("✅ Conexión exitosa a la DB:", result.now);
    res.send(`✅ Conectado a la DB. Hora en DB: ${result.now}`);
  } catch (error) {
    console.error("❌ Error conectando a la DB:", error.message);
    res.status(500).send("❌ Error conectando a la DB: " + error.message);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});