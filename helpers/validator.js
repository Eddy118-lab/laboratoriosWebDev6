const esImagenValida = (archivo) => {
    const extensionesPermitidas = ['.jpg', '.jpeg', '.png'];
    const extensionArchivo = archivo.originalname.slice((archivo.originalname.lastIndexOf(".") - 1 >>> 0) + 2);
    return extensionesPermitidas.includes(`.${extensionArchivo.toLowerCase()}`);
};

module.exports = { esImagenValida };