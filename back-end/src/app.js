const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

//settings
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(
    fileUpload({
      tempFileDir: "/temp", // put temp directory path here      
    })
  );
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//routes
app.use('/api', require('./routes/index.routes'));
app.use('/api/images', require('./routes/images.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));

module.exports = app;