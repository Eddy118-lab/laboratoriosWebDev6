const { conexion } = require("./basededatos/conexion.js");
const express = require("express");
const cors = require("cors");

// Inicializar la APP
console.log("Mi API Rest arrancada");

// Inicializar la BD
conexion();

// Crear un servidor Node
const app = express();
const puerto = 3900;

// Configurar los CORS
app.use(cors());

// Convertir body a objeto JS
app.use(express.json());

// Cargar las rutas
const articuloRoutes = require("./routes/Articulo");
app.use("/api", articuloRoutes);

// Escuchar peticiones del servidor
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto: " + puerto);
});
