const express = require('express');
const conectarDB = require('./config/db');

//crear el serer
const app = express();
// conectar a la base de datos
conectarDB();

//puerto de la app
const PORT = process.env.PORT || 4000;

//arrancar la app
app.listen(PORT, () => {
  console.log(`el servidor funcionaen ${PORT}`);
});
