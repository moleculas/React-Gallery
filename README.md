# react-gallery
MERN Stack con CRUD React para la gestión de imágenes desplegado en servidor UBUNTU 20.04

## Demo

[Demo instalada en Instancia Ubuntu en AWS](http://ec2-35-180-128-197.eu-west-3.compute.amazonaws.com/)

## Instalación en servidor

-Clonar repositorio en directorio /opt 
```
git clone https://github.com/moleculas/react-gallery.git
```
-Otorgar permisos al directorio:
```
sudo chown -R *nombre usuario /opt/
```
-Instalar dependencias en front-end:
```
cd /opt/react-gallery/front-end
npm install -f
```
-Editar el archivo constantes-f.js: 

```
sudo nano /opt/react-gallery/front-end/src/constantes-f.js
```

-Desmarcar el código de producción y comentar el código de desarrollo para que quede: 
```
// desarrollo
// export const apiUrl="http://localhost:4000";
// producción
export const apiUrl="/api";
```
-Compilar aplicación:
```
npm run build
```
-Instalar dependencias en back-end:
```
cd /opt/react-gallery/back-end
npm install
```
-Editar el archivo constantes-b.js: 
```
sudo nano /opt/react-gallery/back-end/src/constantes-b.js
```
-Desmarcar el código de producción y comentar el código de desarrollo para que quede: 
```
// desarrollo
// const rutaFiles="../front-end/public/files/";
// producción
const rutaFiles="../front-end/build/files/"

module.exports=rutaFiles;
```
-Borrar la configuración por defecto de NGINX: 
```
sudo rm /etc/nginx/sites-available/default
```
-Crear configuración para NGINX: 
```
sudo nano /etc/nginx/sites-available/default
```
```
server {
  listen 80 default_server;
  server_name _;

  # react app & front-end archivos
  location / {
    root /opt/react-gallery/front-end/build;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:4000/;
  }

  # tamaño máximo de archivos a subir 10M #
  client_max_body_size 10M;

}
```
-Reiniciar servidor: 
```
sudo systemctl restart nginx
```
-Arrancar mongod (*si no está operativo*): 
```
sudo systemctl start mongod.service
```
-Arrancar el servidor node y dejarlo ejecutándose en segundo plano: 
```
cd /opt/react-gallery/back-end/src
npm run dev &
```
