const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

//settings
app.set('port', process.env.PORT || 4000)


app.use(
    fileUpload({
      tempFileDir: "/temp", 
    })
  );
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//rutas
app.use('/api', require('./routes/index.routes'));
app.use('/api/images', require('./routes/images.routes'));
app.use('/api/usuarios', require('./routes/auth.routes'));

module.exports = app;
