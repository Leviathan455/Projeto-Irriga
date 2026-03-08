const pivots = require("../modelos/pivotModel");
const { v4: uuidv4 } = require("uuid");

function createPivot(description, flowRate, minApplicationDepth,userId) {

    const newPivot = {
        uuid: uuidv4(),
        description,
        flowRate,
        minApplicationDepth,
        userId
    };

    pivots.push(newPivot);

    return newPivot;
}

function getAllPivots(userId) {
     return pivots.filter(p => p.userId === userId);
     //return pivots;
}

function getPivotById(uuid) {
    return pivots.find(p => p.uuid === uuid);
}

function updatePivot(uuid, description, flowRate, minApplicationDepth) {

    const pivot = pivots.find(p => p.uuid === uuid);

    if (!pivot) {
        throw new Error("Pivot não encontrado");
    }

    pivot.description = description ?? pivot.description;
    pivot.flowRate = flowRate ?? pivot.flowRate;
    pivot.minApplicationDepth = minApplicationDepth ?? pivot.minApplicationDepth;

    return pivot;
}

function deletePivot(uuid) {

    const index = pivots.findIndex(p => p.uuid === uuid);

    if (index === -1) {
        throw new Error("Pivot não encontrado");
    }

    pivots.splice(index, 1);

    return true;
}

module.exports = {
    createPivot,
    getAllPivots,
    getPivotById,
    updatePivot,
    deletePivot
};