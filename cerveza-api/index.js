const express = require("express");
const app = express();
const routes = require('./routes');
const cors = require("cors");
const port = process.env.PORT || 8081;
const db = require("./pg-con-master");

// 🔹 Probar la conexión a la base de datos
(async () => {
  try {
    const result = await db.one("SELECT version() AS version");
    console.log("✅ Conectado a la base de datos, versión:", result.version);
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error.message || error);
  }
})();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:4200', // 🔹 tu front en local
    'https://proyecto-tesis-9e33d.web.app' // 🔹 tu front en Firebase
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Ruta raíz
app.get("/", (req, res) => res.send('API cervezas v1'));

// Rutas de la API
app.use('/api', routes);

// 🔹 Endpoint para probar DB desde el navegador
app.get("/db-test", async (req, res) => {
  try {
    const result = await db.one("SELECT version() AS version");
    res.json({ db_version: result.version });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
