const express = require('express');
const conectarDB = require('./config/db');

//crear el serer
const app = express();
// conectar a la base de datos
conectarDB();

//habilitar express.json antes hecho con bodyparset
app.use(express.json({ extended: true }));

//puerto de la app
const PORT = process.env.PORT || 4000;

//importar Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));

//arrancar la app
app.listen(PORT, () => {
  console.log(`el servidor funcionaen ${PORT}`);
});
