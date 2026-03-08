const irrigationService = require("../service/irrigationService");

function createIrrigation(req, res) {
    console.log("Criando irrigação...");
    try {

        const { pivotId, applicationAmount, irrigationDate } = req.body;

        const userId = req.user.id;

        const irrigation = irrigationService.createIrrigation(
            pivotId,
            applicationAmount,
            irrigationDate,
            userId
        );

        res.status(201).json(irrigation);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

function getAllIrrigations(req, res) {
    console.log("Buscando irrigação...");
    try {

        const userId = req.user.id;

        const irrigations = irrigationService.getAllIrrigations(userId);

        res.json(irrigations);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

function getIrrigationById(req, res) {

    try {

        const userId = req.user.id;

        const irrigation = irrigationService.getIrrigationById(
            req.params.id,
            userId
        );

        res.json(irrigation);

    } catch (error) {

        res.status(404).json({ error: error.message });

    }

}

function deleteIrrigation(req, res) {

    try {

        const userId = req.user.id;

        irrigationService.deleteIrrigation(
            req.params.id,
            userId
        );

        res.json({ message: "Irrigação removida" });

    } catch (error) {

        res.status(404).json({ error: error.message });

    }

}

module.exports = {
    createIrrigation,
    getAllIrrigations,
    getIrrigationById,
    deleteIrrigation
};