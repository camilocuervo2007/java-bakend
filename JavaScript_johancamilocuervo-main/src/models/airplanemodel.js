const fs = require('fs/promises');
const path = require('path');
const filePath = path.join(__dirname, '../../data/airplanes.json');

const readData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const writeData = async (data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const getAll = async () => await readData();

const getById = async (id) => {
    const airplanes = await readData();
    return airplanes.find(a => a.id === id);
};

const save = async (airplaneData) => {
    const airplanes = await readData();
    const newAirplane = { id: Date.now().toString(), ...airplaneData };
    airplanes.push(newAirplane);
    await writeData(airplanes);
    return newAirplane;
};

const update = async (id, airplaneData) => {
    const airplanes = await readData();
    const index = airplanes.findIndex(a => a.id === id);
    if (index === -1) return null;
    airplanes[index] = { id, ...airplaneData };
    await writeData(airplanes);
    return airplanes[index];
};

const remove = async (id) => {
    const airplanes = await readData();
    const filtered = airplanes.filter(a => a.id !== id);
    if (filtered.length === airplanes.length) return false;
    await writeData(filtered);
    return true;
};

module.exports = { getAll, getById, save, update, remove };