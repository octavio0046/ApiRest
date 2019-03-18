const mongoose = require('mongoose');

const AsignacionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    persona: {
        type: mongoose.Schema.Types.ObjectId, ref: 'personas',
        required: 'persona es requerido'
    },
    cursos: [{
        text: String,
        curso: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cursos'
        }
    }],
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

module.exports = mongoose.model('asignaciones', AsignacionSchema);