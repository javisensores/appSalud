const pool = require('../db/mysql');
const Bascula = require('../models/bascula');

const listarPorPaciente = async (pacienteId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM basculas WHERE paciente_id = ? ORDER BY fecha DESC',
            [pacienteId]
        );
        return results.map(b => new Bascula(b.id, b.paciente_id, b.peso, b.altura, b.fecha));
    } catch (error) {
        console.error('Error en listarPorPaciente:', error);
        throw error;
    }
};

const obtenerPorId = async (id) => {
    try {
        const [results] = await pool.query('SELECT * FROM basculas WHERE id = ?', [id]);
        if (!results || results.length === 0) return null;
        const b = results[0];
        return new Bascula(b.id, b.paciente_id, b.peso, b.altura, b.fecha);
    } catch (error) {
        console.error('Error en obtenerPorId:', error);
        throw error;
    }
};

const crear = async (pacienteId, peso, altura) => {
    try {
        const [result] = await pool.query(
            'INSERT INTO basculas (paciente_id, peso, altura) VALUES (?, ?, ?)',
            [pacienteId, peso, altura]
        );
        return result.insertId;
    } catch (error) {
        console.error('Error en crear:', error);
        throw error;
    }
};

const actualizar = async (id, peso, altura) => {
    try {
        await pool.query(
            'UPDATE basculas SET peso = ?, altura = ? WHERE id = ?',
            [peso, altura, id]
        );
        return true;
    } catch (error) {
        console.error('Error en actualizar:', error);
        throw error;
    }
};

const eliminar = async (id) => {
    try {
        await pool.query('DELETE FROM basculas WHERE id = ?', [id]);
        return true;
    } catch (error) {
        console.error('Error en eliminar:', error);
        throw error;
    }
};

const obtenerUltimoPesaje = async (pacienteId) => {
    try {
        const [results] = await pool.query(
            'SELECT * FROM basculas WHERE paciente_id = ? ORDER BY fecha DESC LIMIT 1',
            [pacienteId]
        );
        if (!results || results.length === 0) return null;
        const b = results[0];
        return new Bascula(b.id, b.paciente_id, b.peso, b.altura, b.fecha);
    } catch (error) {
        console.error('Error en obtenerUltimoPesaje:', error);
        throw error;
    }
};

module.exports = {
    listarPorPaciente,
    obtenerPorId,
    crear,
    actualizar,
    eliminar,
    obtenerUltimoPesaje
};