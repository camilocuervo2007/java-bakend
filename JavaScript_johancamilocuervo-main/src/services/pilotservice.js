const pilotModel = require('../models/pilotmodel');

const getAllPilots = async () => await pilotModel.getAll();

const getPilotById = async (id) => {
    const pilot = await pilotModel.getById(id);
    if (!pilot) throw new Error(`El piloto con ID ${id} no fue encontrado.`);
    return pilot;
};

const registerPilot = async (data) => {
    if (!data.nombre || !data.licencia) {
        throw new Error("El nombre y la licencia son obligatorios para el piloto.");
    }
    return await pilotModel.save(data);
};

const updatePilot = async (id, data) => {
    await getPilotById(id);
    return await pilotModel.update(id, data);
};

const deletePilot = async (id) => {
    await getPilotById(id);
    return await pilotModel.remove(id);
};

module.exports = { getAllPilots, getPilotById, registerPilot, updatePilot, deletePilot };