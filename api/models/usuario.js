const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
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

module.exports = mongoose.model('usuarios', UsuarioSchema);