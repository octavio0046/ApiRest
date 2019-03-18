const express = require('express');
var cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').load();

const RoutePersonas = require('./api/routes/persona');
const RouteGrados = require('./api/routes/grado');
const RouteCursos = require('./api/routes/curso');
const RouteAsignaciones = require('./api/routes/asignacion')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_ATLAS, { useNewUrlParser: true });
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/personas', RoutePersonas);
app.use('/grados', RouteGrados);
app.use('/cursos',RouteCursos);
app.use('/asignaciones',RouteAsignaciones);


app.use((req, res, net) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;