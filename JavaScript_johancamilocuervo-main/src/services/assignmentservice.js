const pilotModel = require('../models/pilotmodel');
const airplaneModel = require('../models/airplanemodel');
const assignmentModel = require('../models/assignmentModel');

const createAssignment = async (assignmentData) => {
    const { idPiloto, idAvion } = assignmentData;
    
    // Validar existencia del piloto
    const pilots = await pilotModel.getAllPilots();
    const pilotExists = pilots.find(p => p.id === idPiloto);
    if (!pilotExists) {
        throw new Error(`El piloto con ID ${idPiloto} no existe en el sistema.`);
    }

    // Validar existencia del avión
    const airplanes = await airplaneModel.getAllAirplanes();
    const airplaneExists = airplanes.find(a => a.id === idAvion);
    if (!airplaneExists) {
        throw new Error(`El avión con ID ${idAvion} no existe en el parque aéreo.`);
    }

    // Si todo es válido, proceder a guardar la asignación
    return await assignmentModel.saveAssignment(assignmentData);
};

module.exports = { createAssignment };