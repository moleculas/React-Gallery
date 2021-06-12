const fs = require('fs');


verificaArchivo = (req, res, next) => {
  const { file } = req.files; 
  const path = `../front-end/public/files/${file.name}`; 
   try {
    if (fs.existsSync(path)) {
      //res.status(400).send({ message: "si existe el archivo" });
     res.locals.nombreImagen='Copia-'+file.name      
     
    }else{
      //res.status(400).send({ message: "no existe el archivo" });
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