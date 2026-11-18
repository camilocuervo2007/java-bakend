const airplaneModel = require('../models/airplanemodel');

const getAllAirplanes = async () => await airplaneModel.getAll();

const getAirplaneById = async (id) => {
    const airplane = await airplaneModel.getById(id);
    if (!airplane) throw new Error(`El avión con ID ${id} no fue encontrado.`);
    return airplane;
};

const registerAirplane = async (data) => {
    if (!data.modelo || !data.matricula) {
        throw new Error("El modelo y la matrícula son obligatorios para la aeronave.");
    }
    return await airplaneModel.save(data);
};

const updateAirplane = async (id, data) => {
    await getAirplaneById(id);
    return await airplaneModel.update(id, data);
};

const deleteAirplane = async (id) => {
    await getAirplaneById(id);
    return await airplaneModel.remove(id);
};

module.exports = { getAllAirplanes, getAirplaneById, registerAirplane, updateAirplane, deleteAirplane };