const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 8081;
const db = require("./pg-con-master");

// 🔹 Habilitar CORS primero
app.use(cors({
  origin: [
    "http://localhost:4200",
    "https://tesis-8c265.web.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🔹 Probar la conexión a la base de datos
(async () => {
  try {
    const result = await db.one("SELECT version() AS version");
    console.log("✅ Conectado a la base de datos, versión:", result.version);
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error.message || error);
  }
})();

// Rutas
app.get("/", (req, res) => res.send("API cervezas v1"));
app.use("/api", routes);

// 🔹 Endpoint de prueba DB
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
