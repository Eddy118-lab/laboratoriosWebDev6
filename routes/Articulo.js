const express = require("express");
const router = express.Router();
const ArticuloController = require("../controllers/Articulo");

// Rutas CRUD
router.post("/insert", ArticuloController.upload.single('imagen'), ArticuloController.crearArticulo);
router.get("/find", ArticuloController.obtenerArticulos);
router.put("/update/:id", ArticuloController.actualizarArticulo);
router.delete("/delete/:id", ArticuloController.eliminarArticulo);

module.exports = router;