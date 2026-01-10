const express = require('express');
const router = express.Router();

const pacienteController = require('../controllers/pacienteController');

router
.get('/pacientes/:id', pacienteController.obtenerPaciente)  
.post('/pacientes', pacienteController.crearPaciente)       
.put('/pacientes/:id', pacienteController.actualizarPaciente)
.get('/pacientes/editar/:id', pacienteController.mostrarFormularioActualizarPaciente)
.delete('/pacientes/:id', pacienteController.eliminarPaciente) 
.get('/pacientes', pacienteController.listarPacientes);

module.exports = router;