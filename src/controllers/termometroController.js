const termometroRepository = require('../repositories/termometroRepository');
const pacienteRepository = require('../repositories/pacienteRepository');

// Listar historial de temperaturas de un paciente
const listarTemperaturas = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const paciente = await pacienteRepository.buscarPorId(pacienteId);
        
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }
        
        const temperaturas = await termometroRepository.listarPorPaciente(pacienteId);

        // Añadir datos derivados: equivalente, clasificación y fecha formateada
        const temperaturasDerivadas = (temperaturas || []).map(t => {
            const tempVal = Number(t.temperatura);
            const unidad = t.unidad || 'celsius';
            let equivalente = null;
            if (unidad === 'celsius') equivalente = Number((tempVal * 9/5 + 32).toFixed(2));
            else equivalente = Number(((tempVal - 32) * 5/9).toFixed(2));

            // Clasificación simple de fiebre (en Celsius)
            const tempC = unidad === 'celsius' ? tempVal : (tempVal - 32) * 5/9;
            let estado = 'normal';
            if (tempC >= 38 && tempC < 39) estado = 'fiebre';
            else if (tempC >= 39) estado = 'fiebre-alta';

            // Formatear fecha de forma segura
            let fechaDisplay = 'Fecha desconocida';
            try {
                let fd = t.fecha;
                if (!(fd instanceof Date)) {
                    // convertir 'YYYY-MM-DD HH:MM:SS' a ISO
                    fd = new Date(String(fd).replace(' ', 'T'));
                }
                if (!isNaN(fd.getTime())) fechaDisplay = fd.toLocaleString('es-ES');
            } catch (e) {
                fechaDisplay = 'Fecha desconocida';
            }

            return Object.assign({}, t, { equivalente, estado, fechaDisplay });
        });

        res.render('termometro/historial', {
            title: `Historial de Temperaturas - ${paciente.nombre} ${paciente.apellidos}`,
            paciente,
            temperaturas: temperaturasDerivadas
        });
    } catch (error) {
        console.error('Error al listar temperaturas:', error);
        res.status(500).send('Error al obtener el historial de temperaturas');
    }
};

// Mostrar formulario para crear temperatura
const mostrarFormularioCrear = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const paciente = await pacienteRepository.buscarPorId(pacienteId);
        
        if (!paciente) {
            return res.status(404).send('Paciente no encontrado');
        }
        
        res.render('termometro/crear', {
            title: 'Registrar Temperatura',
            paciente
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al cargar el formulario');
    }
};

// Crear temperatura
const crearTemperatura = async (req, res) => {
    try {
        const { pacienteId } = req.params;
        const { temperatura, unidad } = req.body;
        
        await termometroRepository.crear(pacienteId, temperatura, unidad);
        res.redirect(`/termometro/${pacienteId}`);
    } catch (error) {
        console.error('Error al crear temperatura:', error);
        res.status(500).send('Error al registrar la temperatura');
    }
};

// Mostrar formulario para editar temperatura
const mostrarFormularioEditar = async (req, res) => {
    try {
        const { id } = req.params;
        const temperatura = await termometroRepository.obtenerPorId(id);
        
        if (!temperatura) {
            return res.status(404).send('Temperatura no encontrada');
        }
        
        const paciente = await pacienteRepository.buscarPorId(temperatura.paciente_id);
        
        res.render('termometro/editar', {
            title: 'Editar Temperatura',
            paciente,
            temperatura
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al cargar el formulario');
    }
};

// Actualizar temperatura
const actualizarTemperatura = async (req, res) => {
    try {
        const { id } = req.params;
        const { temperatura, unidad } = req.body;
        
        const temp = await termometroRepository.obtenerPorId(id);
        if (!temp) {
            return res.status(404).send('Temperatura no encontrada');
        }
        
        await termometroRepository.actualizar(id, temperatura, unidad);
        res.redirect(`/termometro/${temp.paciente_id}`);
    } catch (error) {
        console.error('Error al actualizar temperatura:', error);
        res.status(500).send('Error al actualizar la temperatura');
    }
};

// Eliminar temperatura
const eliminarTemperatura = async (req, res) => {
    try {
        const { id } = req.params;
        const temperatura = await termometroRepository.obtenerPorId(id);
        
        if (!temperatura) {
            return res.status(404).send('Temperatura no encontrada');
        }
        
        const pacienteId = temperatura.paciente_id;
        await termometroRepository.eliminar(id);
        res.redirect(`/termometro/${pacienteId}`);
    } catch (error) {
        console.error('Error al eliminar temperatura:', error);
        res.status(500).send('Error al eliminar la temperatura');
    }
};

module.exports = {
    listarTemperaturas,
    mostrarFormularioCrear,
    crearTemperatura,
    mostrarFormularioEditar,
    actualizarTemperatura,
    eliminarTemperatura
};