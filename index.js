const express = require('express');

//crear el serer
const app = express();

//puerto de la app
const PORT = process.env.PORT || 4000;

//arrancar la app
app.listen(PORT, () => {
  console.log(`el servidor funcionaen ${PORT}`);
});
