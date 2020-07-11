// rutas para autenticar usuario
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controller/authController');

//crear usuario
// api/auth
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser minimo de 3 caracteres').isLength({
      min: 3,
    }),
  ],
  authController.autenticarUsuario,
);
module.exports = router;
