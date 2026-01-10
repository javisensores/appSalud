const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/pacienteController');

router
.get('/pacientes/:id', pacienteController.obtenerPaciente)  // Cambiar a plural
.post('/pacientes', pacienteController.crearPaciente)       // Cambiar a plural
.put('/pacientes/:id', pacienteController.actualizarPaciente) // Cambiar a plural
.delete('/pacientes/:id', pacienteController.eliminarPaciente) // Cambiar a plural
.get('/pacientes', pacienteController.listarPacientes);

module.exports = router;