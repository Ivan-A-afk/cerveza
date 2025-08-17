const express = require("express");
const db = require("./pg-con-master");

const app = express();
const PORT = process.env.PORT || 8081;

// Ruta de prueba: servidor online
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando en Render con PostgreSQL");
});

// Ruta de prueba: conexión DB
app.get("/db-test", async (req, res) => {
  try {
    // Aquí probamos la conexión ejecutando una consulta simple
    const result = await db.one("SELECT version() AS version");
    console.log("✅ Conectado a la base de datos, versión:", result.version);
    res.send("✅ Conectado a la base de datos, versión: " + result.version);
  } catch (error) {
    console.error("❌ Error conectando a la DB:", error.message);
    res.status(500).send("❌ Error conectando a la DB: " + error.message);
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});