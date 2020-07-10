const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

//crear usuario
// api/usuarios
router.post('/', usuarioController.crearUsuario);
module.exports = router;
