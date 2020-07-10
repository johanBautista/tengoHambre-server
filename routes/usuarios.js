const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');
const { check } = require('express-validator');

//crear usuario
// api/usuarios
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 3 caracteres').isLength({
      min: 3,
    }),
  ],
  usuarioController.crearUsuario,
);
module.exports = router;
