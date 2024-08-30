const Articulo = require("../models/Articulo");
const { esImagenValida } = require("../helpers/validator");
const multer = require("multer");

// Configuración de Multer para la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (esImagenValida(file)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de archivo no permitido. Solo se permiten archivos .jpg, .jpeg, y .png.'));
        }
    }
});

// Crear un artículo (Create)
const crearArticulo = async (req, res) => {
    try {
        const nuevoArticulo = new Articulo(req.body);
        await nuevoArticulo.save();
        console.log("Artículo insertado correctamente");
        return res.status(201).send(`
            <div>
                <h1>Datos insertados</h1>
            </div>
        `);
    } catch (error) {
        console.log("Error al insertar el artículo");
        return res.status(400).send(`
            <div>
                <h1>Error al insertar los datos</h1>
            </div>
        `);
    }
};

// Obtener todos los artículos (Read)
const obtenerArticulos = async (req, res) => {
    try {
        const articulos = await Articulo.find();
        console.log("Artículos obtenidos correctamente");
        return res.status(200).send(`
            <div>
                <h1>Artículos encontrados</h1>
                <p>Se han encontrado ${articulos.length} artículos</p>
            </div>
        `);
    } catch (error) {
        console.log("Error al obtener los artículos");
        return res.status(500).send(`
            <div>
                <h1>Error al obtener los datos</h1>
            </div>
        `);
    }
};

// Actualizar un artículo (Update)
const actualizarArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!articulo) {
            console.log("Artículo no encontrado para actualizar");
            return res.status(404).send(`
                <div>
                    <h1>Error: Artículo no encontrado</h1>
                </div>
            `);
        }
        console.log("Artículo actualizado correctamente");
        return res.status(200).send(`
            <div>
                <h1>Actualizar</h1>
            </div>
        `);
    } catch (error) {
        console.log("Error al actualizar el artículo");
        return res.status(400).send(`
            <div>
                <h1>Error al actualizar los datos</h1>
            </div>
        `);
    }
};

// Eliminar un artículo (Delete)
const eliminarArticulo = async (req, res) => {
    try {
        const articulo = await Articulo.findByIdAndDelete(req.params.id);
        if (!articulo) {
            console.log("Artículo no encontrado para eliminar");
            return res.status(404).send(`
                <div>
                    <h1>Error: Artículo no encontrado</h1>
                </div>
            `);
        }
        console.log("Artículo eliminado correctamente");
        return res.status(200).send(`
            <div>
                <h1>Eliminar</h1>
            </div>
        `);
    } catch (error) {
        console.log("Error al eliminar el artículo");
        return res.status(500).send(`
            <div>
                <h1>Error al eliminar los datos</h1>
            </div>
        `);
    }
};

module.exports = {
    crearArticulo,
    obtenerArticulos,
    actualizarArticulo,
    eliminarArticulo,
    upload
};