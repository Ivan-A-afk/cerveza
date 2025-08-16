const express = require("express");
const app = express();
const routes = require('./routes');
const cors = require("cors");
const port = process.env.PORT || 8081;
const db = require("./pg-con-master");



db.connect()
  .then((obj) => {
    // Can check the server version here (pg-promise v10.1.0+):
    const serverVersion = obj.client.serverVersion;
    console.log(`Conectado a la base de datos,version: ${serverVersion}`);
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

app.use(cors({
  origin: ['https://proyecto-tesis-9e33d.web.app'] // tu frontend en Firebase
}));
app.use(express.json());
app.get("/", (req, res) => res.send('API cervezas v1'));
app.use('/api', routes)

app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
