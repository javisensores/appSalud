const pool = require('../db/mysql');
const Termometro = require('../models/termometro');

const listarPorPaciente = async (pacienteId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM temperaturas WHERE paciente_id = ? ORDER BY fecha DESC',
            [pacienteId]
        );
        return results.map(t => new Termometro(t.id, t.paciente_id, t.temperatura, t.unidad, t.fecha));
    } catch (error) {
        console.error('Error en listarPorPaciente:', error);
        throw error;
    }
};

const obtenerPorId = async (id) => {
    try {
        const [results] = await pool.query('SELECT * FROM temperaturas WHERE id = ?', [id]);
        if (!results || results.length === 0) return null;
        const t = results[0];
        return new Termometro(t.id, t.paciente_id, t.temperatura, t.unidad, t.fecha);
    } catch (error) {
        console.error('Error en obtenerPorId:', error);
        throw error;
    }
};

const crear = async (pacienteId, temperatura, unidad = 'celsius') => {
    try {
        const [result] = await pool.query(
            'INSERT INTO temperaturas (paciente_id, temperatura, unidad) VALUES (?, ?, ?)',
            [pacienteId, temperatura, unidad]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error en crear:', error);
        throw error;
    }
};

const actualizar = async (id, temperatura, unidad) => {
    try {
        await pool.query(
            'UPDATE temperaturas SET temperatura = ?, unidad = ? WHERE id = ?',
            [temperatura, unidad, id]
        );
        return true;
    } catch (error) {
        console.error('Error en actualizar:', error);
        throw error;
    }
};

const eliminar = async (id) => {
    try {
        await pool.query('DELETE FROM temperaturas WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('Error en eliminar:', error);
        throw error;
    }
};

const obtenerUltimaTemperatura = async (pacienteId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM temperaturas WHERE paciente_id = ? ORDER BY fecha DESC LIMIT 1',
            [pacienteId]
        );
        if (!results || results.length === 0) return null;
        const t = results[0];
        return new Termometro(t.id, t.paciente_id, t.temperatura, t.unidad, t.fecha);
    } catch (error) {
        console.error('Error en obtenerUltimaTemperatura:', error);
        throw error;
    }
};

module.exports = {
    listarPorPaciente,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerUltimaTemperatura
};