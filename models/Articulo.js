const mongoose = require("mongoose");

const ArticuloSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        required: false
    }
});

const Articulo = mongoose.model("Articulo", ArticuloSchema);

module.exports = Articulo;
