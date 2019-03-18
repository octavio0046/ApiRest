const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: 'Nombre es requerido'
    },
    grado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'grados'
    },
    descripcion: {
        type: String
    },
    horarioInicio: {
        type: String,
        required: true
    },
    horarioFin: {
        type: String,
        required: true
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

module.exports = mongoose.model('cursos', CursoSchema);