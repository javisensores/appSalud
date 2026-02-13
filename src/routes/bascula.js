const express = require('express');
const router = express.Router();
const basculaController = require('../controllers/basculaController');

router.get('/:pacienteId', basculaController.listarPesajes);
router.get('/:pacienteId/crear', basculaController.mostrarFormularioCrear);
router.post('/:pacienteId', basculaController.crearPeso);
router.get('/editar/:id', basculaController.mostrarFormularioEditar);
router.put('/:id', basculaController.actualizarPeso);
router.delete('/:id', basculaController.eliminarPeso);

module.exports = router;
