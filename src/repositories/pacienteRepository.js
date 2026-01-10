const pool = require('../db/mysql');
const Paciente = require('../models/paciente');

const listar = async () => {
   
        // Ejecutamos la consulta SQL para obtener todos los pacientes
        const [results] = await pool.query('SELECT * FROM pacientes');

        // Convertimos cada registro en una instancia del modelo Paciente
        const pacientes = results.map(p => new Paciente(
            p.id,
            p.nombre,
            p.apellidos,
            p.fechaDeNacimiento
        ));

        // Devolvemos el listado de pacientes
        return pacientes;
   
};

const guardar = async  (paciente) => {
//Ejecutamos la consulta SQL para insertar un nuevo paciente
    const [result] = await pool.query('INSERT INTO pacientes (nombre, apellidos, fechaDeNacimiento) VALUES (?, ?, ?)',
      [paciente.nombre, paciente.apellidos, paciente.fechaDeNacimiento]);
//Creamos una nueva instancia de Paciente con el ID generado
const nuevoPaciente = new Paciente(
    result.insertId,
    paciente.nombre,
    paciente.apellidos,
    paciente.fechaDeNacimiento
);  

//Devolvemos la nueva instancia de Paciente
return nuevoPaciente;
}

const buscarPorId = async (id) => {
//  Ejecutamos la consulta SQL para buscar un paciente por su ID
    const [results] = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
// Si no se encuentra el paciente, devolvemos null
    if (results.length === 0) {
        return null;
    }

    const p = results[0];
    // Creamos una instancia de Paciente con los datos obtenidos
    const paciente = new Paciente(
        p.id,
        p.nombre,
        p.apellidos,
        p.fechaDeNacimiento
    ); 
    // Devolvemos el paciente encontrado
    return paciente;



}

const actualizar = async (paciente) => {
// Ejecutamos la consulta SQL para actualizar los datos del paciente
    await pool.query('UPDATE pacientes SET nombre = ?, apellidos = ?, fechaDeNacimiento = ? WHERE id = ?',
    [paciente.nombre, paciente.apellidos, paciente.fechaDeNacimiento, paciente.id]);
// Devolvemos el paciente actualizado
    return new paciente(
        paciente.id,
        paciente.nombre,
        paciente.apellidos,
        paciente.fechaDeNacimiento
    );

}

const eliminar = async (id) => {
    //Ejecutamos la consulta SQL para eliminar el paciente por su ID
    const [result] = await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    //si no se eliminó ningún registro, devolvemos false
    if (result.affectedRows === 0) {
        return false;
    }
    // Si se eliminó el registro, devolvemos true
    return true; 
}

module.exports = {
    listar,
    guardar,
    buscarPorId,
    actualizar,   
    eliminar
};