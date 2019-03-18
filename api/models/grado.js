const mongoose = require('mongoose');

const GradosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: 'Nombre es requerido'
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
    jornada: {
        type: [{
            type: String,
            enum: ['matutina', 'vespertina', 'nocturna'],
            required:true
        }]
        
    },
    plan: {
        type: [{
            type: String,
            enum: ['diario','fin de semana']
        }],
        required:true
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

module.exports = mongoose.model('grados', GradosSchema);