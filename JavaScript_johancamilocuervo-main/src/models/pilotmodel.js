const fs = require('fs/promises');
const path = path = require('path');
const filePath = path.join(__dirname, '../../data/pilots.json');

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
    const pilots = await readData();
    return pilots.find(p => p.id === id);
};

const save = async (pilotData) => {
    const pilots = await readData();
    const newPilot = { id: Date.now().toString(), ...pilotData };
    pilots.push(newPilot);
    await writeData(pilots);
    return newPilot;
};

const update = async (id, pilotData) => {
    const pilots = await readData();
    const index = pilots.findIndex(p => p.id === id);
    if (index === -1) return null;
    pilots[index] = { id, ...pilotData };
    await writeData(pilots);
    return pilots[index];
};

const remove = async (id) => {
    const pilots = await readData();
    const filtered = pilots.filter(p => p.id !== id);
    if (filtered.length === pilots.length) return false;
    await writeData(filtered);
    return true;
};

module.exports = { getAll, getById, save, update, remove };