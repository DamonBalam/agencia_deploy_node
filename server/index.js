// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');

require('dotenv').config({path: 'variables.env'})


db.authenticate()
    .then(() => console.log('DB CONECTADA'))
    .catch( error => console.log(error));



// configurar express
const app = express();

// habiltiar pug
app.set('view engine','pug');
// añadir las views
app.set('views',path.join(__dirname,'./views'));

// cargar carpeta estatica public
app.use(express.static('public'));

// validar si es dev o prod
const config =  configs[app.get('env')];

// creamos la variable para el sitio
app.locals.titulo = config.nombresitio;

// muestra el año actual
app.use((req,res,next) => {
    // crear una nueva fecha
    const fecha = new Date();
    res.locals.fechaActual =  fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});

// ejecutamos el body parser
app.use(bodyParser.urlencoded({extended: true}));

// cargar rutas
app.use('/', routes());

// port y host

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;
app.listen(port,host, () => console.log('EL SERVIDOR ESTA FUNCIONANDO'));