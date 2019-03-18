const mongoose = require('mongoose');

const DatosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombres: {
        type: String,
        required: 'Nombres es requerido'
    },
    apellidos: {
        type: String,
        required: 'Nombres es requerido',
    },
    identificacion:{
        type:String
    },
    fechaNacimiento: {
        type: Date,
        required: 'Fecha de Nacimiento es requerido',
    },
    estado: {
        type: [{
            type: String,
            enum: ['activo', 'inactivo', 'finalizado']
        }],
        default: 'activo'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('personas', DatosSchema);