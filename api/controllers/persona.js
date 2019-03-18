
const mongoose = require('mongoose');
const persona = require('../models/persona');

exports.getall = (req, res, next) => {
    persona.find()
        .select('_id nombres apellidos fechaNacimiento identificacion estado created_at ')
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
    persona.findById(idNumbre)
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
    const result = new persona({
        _id: new mongoose.Types.ObjectId(),
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        identificacion: req.body.identificacion,
        fechaNacimiento: req.body.fechaNacimiento
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
    persona.remove({ _id: idNumbre })
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

    persona.update({ _id: idNumbre }, { $set: updateOps })
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