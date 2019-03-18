
const mongoose = require('mongoose');
const curso = require('../models/curso');
const grado = require('../models/grado');

exports.getall = (req, res, next) => {
    curso.find()
       .select('_id nombre plan descripcion horarioInicio horarioFin grado  estado created_at ')
       .populate('grado',['nombre','descripcion']) 
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
    curso.findById(idNumbre)
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
    
    grado.findById(req.body.grado)
    .then()
    .catch(err=>{
        res.status(500).json({
            message: 'grado no existe',
            error:err
        })
    });

    var ObjectId = mongoose.Types.ObjectId; 
    const result = new curso({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        horarioInicio: req.body.horarioInicio,
        horarioFin: req.body.horarioFin,
        grado: new ObjectId(req.body.grado)
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
    curso.remove({ _id: idNumbre })
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

    curso.update({ _id: idNumbre }, { $set: updateOps })
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