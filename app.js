const express = require('express');
const cors = require('cors');
const config = require('./config');
const path = require('path');

const app = express();

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fotos', express.static(path.join(__dirname, 'fotos')));


var corsOptions = {
    origin: '*',
    optionsSucessStatus: 200
}
// Utilización de Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del puerto
app.set('port', config.app.port);

// Registro de rutas
const datosRoutes = require('./rutas');
app.use('/api/datos', datosRoutes); // Rutas relacionadas con datos

module.exports = app;


