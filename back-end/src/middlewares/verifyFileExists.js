const fs = require('fs');

verificaArchivo = (req, res, next) => {
  const { file } = req.files; 
  const path = `../front-end/public/files/${file.name}`; 
   try {
    if (fs.existsSync(path)) {     
     res.locals.nombreImagen='Copia-'+file.name      
     
    }else{      
      res.locals.nombreImagen=file.name      
    }
    next();
  } catch(err) {
    res.status(500).send({ message: 'error' });
    return;    
  }   
};

const verifyFileExists = {
  verificaArchivo
};
module.exports = verifyFileExists;