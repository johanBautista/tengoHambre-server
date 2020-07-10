const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
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
    // mensaje confirmacion
    res.json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.log(error);
    res.status(400).send('hubo un error al crear usuario');
  }
};
