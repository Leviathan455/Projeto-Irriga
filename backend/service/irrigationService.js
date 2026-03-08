const irrigations = require("../modelos/irrigationModel");
const pivots = require("../modelos/pivotModel");
const { v4: uuidv4 } = require("uuid");

function createIrrigation(pivotId, applicationAmount, irrigationDate, userId) {

    const pivot = pivots.find(p => p.uuid === pivotId);

    if (!pivot) {
        throw new Error("Pivot não encontrado");
    }

    const newIrrigation = {
        id: uuidv4(),
        pivotId,
        applicationAmount,
        irrigationDate,
        userId
    };

    irrigations.push(newIrrigation);

    return newIrrigation;
}

function getAllIrrigations(userId) {
    return irrigations.filter(i => i.userId === userId);
}

function getIrrigationById(id, userId) {

    const irrigation = irrigations.find(
        i => i.id === id && i.userId === userId
    );

    if (!irrigation) {
        throw new Error("Irrigação não encontrada");
    }

    return irrigation;
}

function deleteIrrigation(id, userId) {

    const index = irrigations.findIndex(
        i => i.id === id && i.userId === userId
    );

    if (index === -1) {
        throw new Error("Irrigação não encontrada");
    }

    irrigations.splice(index, 1);

    return true;
}

module.exports = {
    createIrrigation,
    getAllIrrigations,
    getIrrigationById,
    deleteIrrigation
};