const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //extraer password
  const { nombre, password } = req.body;

  try {
    //verificar si no existe usuario registrado
    let usuario = await Usuario.findOne({ nombre });
    if (!usuario) {
      return res.status(400).json({ msg: ' El usuario NO existe' });
    }
    // si existe usuario verificar password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password Incorrecto' });
    }
    //si todo esta ok crear y firmar el jwt
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    // firmar el token jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        //mensaje de confirmacion
        res.json({ token });
      },
    );
  } catch (error) {}
};
