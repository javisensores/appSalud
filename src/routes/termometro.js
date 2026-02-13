const express = require('express');
const router = express.Router();
const termometroController = require('../controllers/termometroController');

router.get('/:pacienteId', termometroController.listarTemperaturas);
router.get('/:pacienteId/crear', termometroController.mostrarFormularioCrear);
router.post('/:pacienteId', termometroController.crearTemperatura);
router.get('/editar/:id', termometroController.mostrarFormularioEditar);
router.put('/:id', termometroController.actualizarTemperatura);
router.delete('/:id', termometroController.eliminarTemperatura);

module.exports = router;
