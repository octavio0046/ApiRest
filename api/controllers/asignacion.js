
const mongoose = require('mongoose');
const asignacion = require('../models/asignacion');

exports.getall = (req, res, next) => {
    asignacion.find()
        .select('_id nombres apellidos fechaNacimiento identificacion estado created_at ')
        .populate('persona', ['nombres', 'apellidos'])
        .populate('cursos.curso',['nombre','descripcion','horarioInicio','horarioFin'])
        .exec()
        .then(doc => {
            /*
            const resp = {
                count: doc.length,
                result: doc.map(doc => {
                    return {
                        id: doc._id,
                        nombre: doc.nombre,
                        direccion: doc.direccion
                    }
                })
                
            }*/
            res.status(200).json(doc);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

exports.getId = (req, res, next) => {
    const idNumbre = req.params.id
    asignacion.findById(idNumbre)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No es valido el parametro enviado' });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        });
}

exports.postData = (req, res, next) => {
    console.log(req.body);
    var ObjectId = mongoose.Types.ObjectId
    var document = mongoose.Types.DocumentArray
    
    const result = new asignacion({
        _id: new mongoose.Types.ObjectId(),
        persona: new ObjectId(req.body.persona),
        cursos: new document(req.body.cursos)
    });
    result.save()
        .then(result => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(500).json({ error: err })

        });
}

exports.eliminar = (req, res, next) => {
    const idNumbre = req.params.id
    asignacion.remove({ _id: idNumbre })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No es valido el parametro enviado' });
            }
        }).catch(err => {
            res.status(500).json({ error: err })
        });
}

exports.actualizar = (req, res, next) => {
    const idNumbre = req.params.id
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    asignacion.update({ _id: idNumbre }, { $set: updateOps })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No es valido el parametro enviado' });
            }
        }).catch(err => {
            res.status(500).json({ error: err })
        });
}