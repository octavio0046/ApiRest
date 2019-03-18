const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const controller = require('../controllers/');

router.get('/',controller.getall)
.post('/',controller.postData);

// router.get('/:id',controller.getId)
// .delete('/:id', controller.eliminar)
// .patch('/:id',controller.actualizar);

module.exports = router;