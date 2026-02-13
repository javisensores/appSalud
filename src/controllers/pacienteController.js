const pacienteRepository = require('../repositories/pacienteRepository');
const basculaRepository = require('../repositories/basculaRepositoty');
const termometroRepository = require('../repositories/termometroRepository');

const obtenerPaciente = async (req, res) => {
   
      const id = req.params.id;
      if (!id) {
          return res.status(400).send('El ID del paciente es obligatorio');
      } 
            const paciente = await pacienteRepository.buscarPorId(id);
      if (!paciente) {
          return  res.render('buscar', { 
              title: 'App Salud',
              message: 'ERROR : Paciente no encontrado',});

       }
// Obtener último pesaje y temperatura para mostrar valores derivados
            const ultimoPesaje = await basculaRepository.obtenerUltimoPesaje(id);
            const ultimaTemp = await termometroRepository.obtenerUltimaTemperatura(id);

            // Calcular IMC y descripción
            let imc = null;
            let imcDesc = '';
            if (ultimoPesaje && ultimoPesaje.peso && ultimoPesaje.altura) {
                imc = Number((Number(ultimoPesaje.peso) / (Number(ultimoPesaje.altura) * Number(ultimoPesaje.altura))).toFixed(2));
                if (imc < 16) imcDesc = 'Infrapeso (delgadez severa)';
                else if (imc < 17) imcDesc = 'Infrapeso (delgadez moderada)';
                else if (imc < 18.5) imcDesc = 'Infrapeso (delgadez aceptable)';
                else if (imc < 25) imcDesc = 'Peso normal';
                else if (imc < 30) imcDesc = 'Sobrepeso';
                else if (imc < 35) imcDesc = 'Obeso (Tipo I)';
                else if (imc < 40) imcDesc = 'Obeso (Tipo II)';
                else imcDesc = 'Obeso (Tipo III)';
            }

            // Calcular equivalentes de temperatura
            let tempValue = null;
            let tempUnit = null;
            let tempEquivalent = null;
            if (ultimaTemp) {
                tempValue = Number(ultimaTemp.temperatura);
                tempUnit = ultimaTemp.unidad || 'celsius';
                if (tempUnit === 'celsius') {
                    tempEquivalent = Number((tempValue * 9/5 + 32).toFixed(2));
                } else {
                    tempEquivalent = Number(((tempValue - 32) * 5/9).toFixed(2));
                }
            }

//Si existe el paciente, lo mostramos
             res.render('buscar', {
                     title: 'App Salud',
                     paciente,
                     message: 'Paciente encontrado',
                     ultimoPesaje,
                     imc,
                     imcDesc,
                     ultimaTemp,
                     tempValue,
                     tempUnit,
                     tempEquivalent
             });
          
 };

const crearPaciente = async (req, res) => {
    const { nombre, apellidos, fechaDeNacimiento } = req.body;
    if (!nombre || !apellidos || !fechaDeNacimiento) {
        return res.render('index', {
            title: 'App Salud',
            pacientes: await pacienteRepository.listar(),
            message: 'ERROR: Todos los campos son obligatorios' });
        }
    // guardar el nuevo paciente
    await pacienteRepository.guardar({ nombre, apellidos, fechaDeNacimiento  });
    const pacientes = await pacienteRepository.listar();
    res.render('index', {
        title: 'App Salud',
        pacientes,
        message: 'Paciente creado correctamente' });
    
};


const mostrarFormularioActualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const paciente = await pacienteRepository.buscarPorId(id);
    if (!paciente) {
        return res.redirect('/paciente/pacientes');
    }
 res.render('actualizarPaciente', {
    title: 'App Salud',
    paciente,
    message: ''
 });
};

const actualizarPaciente = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellidos, fechaDeNacimiento } = req.body;
    if (!nombre || !apellidos || !fechaDeNacimiento) {
        const paciente = await pacienteRepository.buscarPorId(id);
        return res.render('actualizarPaciente', {
            title: 'App Salud',
            paciente,
            message: 'ERROR: Todos los campos son obligatorios' });
    }
// Construir el objeto paciente completo
    const pacienteActualizado = {
        id,
        nombre,
        apellidos,
        fechaDeNacimiento
    };

    await pacienteRepository.actualizar(pacienteActualizado);
    res.redirect('/paciente/pacientes');
};

const eliminarPaciente = async (req, res) => {
  const id = req.params.id;
  const eliminado = await pacienteRepository.eliminar(id);
  const pacientes = await pacienteRepository.listar(id);
  const message = eliminado ? 'Paciente eliminado correctamente' : 'ERROR: No se pudo eliminar el paciente';
    res.render('index', {
        title: 'App Salud',
        pacientes,
        message
    });
};
    

const listarPacientes = async (req, res) => {
        const pacientes = await pacienteRepository.listar();
        res.render('index', {
            title: 'App Salud',
            pacientes,
            message: 'Bienvenidos a la App Salud'
        });
};

module.exports = {
    obtenerPaciente,
    crearPaciente,
    actualizarPaciente,
    eliminarPaciente,
    listarPacientes,
    mostrarFormularioActualizarPaciente
};