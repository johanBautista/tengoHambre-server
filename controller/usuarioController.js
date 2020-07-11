const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer password
  const { nombre, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ nombre });
    if (usuario) {
      return res.status(400).json({ msg: ' El usuario ya existe' });
    }
    //crear nuevo usuario
    usuario = new Usuario(req.body);

    //hashear el password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    //guardar nuevo usuario
    await usuario.save();

    // crear y firmar el jwt
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
  } catch (error) {
    console.log(error);
    res.status(400).send('hubo un error al crear usuario');
  }
};
