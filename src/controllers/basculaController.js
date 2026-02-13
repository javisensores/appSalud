const basculaRepository = require('../repositories/basculaRepositoty');
const pacienteRepository = require('../repositories/pacienteRepository');

// Listar historial de pesajes para un paciente
const listarPesajes = async (req, res) => {
  try {
    const pacienteId = req.params.pacienteId;
    const paciente = await pacienteRepository.buscarPorId(pacienteId);
    if (!paciente) return res.status(404).send('Paciente no encontrado');

    const pesajes = await basculaRepository.listarPorPaciente(pacienteId);
    // Calcular IMC para el último registro si existe
    let imc = null;
    let imcDesc = '';
    if (pesajes && pesajes.length > 0) {
      const last = pesajes[0];
      if (last.peso && last.altura) {
        imc = Number((Number(last.peso) / (Number(last.altura) * Number(last.altura))).toFixed(2));
        // Clasificación simple
        if (imc < 16) imcDesc = 'Infrapeso (delgadez severa)';
        else if (imc < 17) imcDesc = 'Infrapeso (delgadez moderada)';
        else if (imc < 18.5) imcDesc = 'Infrapeso (delgadez aceptable)';
        else if (imc < 25) imcDesc = 'Peso normal';
        else if (imc < 30) imcDesc = 'Sobrepeso';
        else if (imc < 35) imcDesc = 'Obeso (Tipo I)';
        else if (imc < 40) imcDesc = 'Obeso (Tipo II)';
        else imcDesc = 'Obeso (Tipo III)';
      }
    }

    res.render('bascula/historial', {
      title: `Historial Báscula - ${paciente.nombre} ${paciente.apellidos}`,
      paciente,
      pesajes,
      imc,
      imcDesc
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener historial de pesajes');
  }
};

const mostrarFormularioCrear = async (req, res) => {
  const pacienteId = req.params.pacienteId;
  const paciente = await pacienteRepository.buscarPorId(pacienteId);
  if (!paciente) return res.status(404).send('Paciente no encontrado');
  res.render('bascula/crear', { title: 'Registrar peso', paciente });
};

const crearPeso = async (req, res) => {
  try {
    const pacienteId = req.params.pacienteId;
    const { peso, altura } = req.body;
    await basculaRepository.crear(pacienteId, peso, altura);
    res.redirect(`/bascula/${pacienteId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al registrar peso');
  }
};

const mostrarFormularioEditar = async (req, res) => {
  try {
    const id = req.params.id;
    const registro = await basculaRepository.obtenerPorId(id);
    if (!registro) return res.status(404).send('Registro no encontrado');
    const paciente = await pacienteRepository.buscarPorId(registro.paciente_id);
    res.render('bascula/editar', { title: 'Editar peso', paciente, registro });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
};

const actualizarPeso = async (req, res) => {
  try {
    const id = req.params.id;
    const { peso, altura } = req.body;
    await basculaRepository.actualizar(id, peso, altura);
    const registro = await basculaRepository.obtenerPorId(id);
    res.redirect(`/bascula/${registro.paciente_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar');
  }
};

const eliminarPeso = async (req, res) => {
  try {
    const id = req.params.id;
    const registro = await basculaRepository.obtenerPorId(id);
    if (!registro) return res.status(404).send('Registro no encontrado');
    await basculaRepository.eliminar(id);
    res.redirect(`/bascula/${registro.paciente_id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar');
  }
};

module.exports = {
  listarPesajes,
  mostrarFormularioCrear,
  crearPeso,
  mostrarFormularioEditar,
  actualizarPeso,
  eliminarPeso
};
