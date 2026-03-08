const pivotService = require("../service/pivotService");

function createPivot(req, res) {

    try {

        const { description, flowRate, minApplicationDepth } = req.body;

        const pivot = pivotService.createPivot(
            description,
            flowRate,
            minApplicationDepth,
            req.user.id,
        );

        res.status(201).json(pivot);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

function getAllPivots(req, res) {

    try {
        console.log("Listando pivots do usuário:", req.user);
        const pivots = pivotService.getAllPivots(req.user.id);

        res.json(pivots);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

function getPivotById(req, res) {

    try {

        const pivot = pivotService.getPivotById(req.params.id);

        if (!pivot) {
            return res.status(404).json({ error: "Pivot não encontrado" });
        }

        res.json(pivot);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

function updatePivot(req, res) {

    try {

        const { description, flowRate, minApplicationDepth } = req.body;

        const pivot = pivotService.updatePivot(
            req.params.id,
            description,
            flowRate,
            minApplicationDepth
        );

        res.json(pivot);

    } catch (error) {

        res.status(404).json({ error: error.message });

    }

}

function deletePivot(req, res) {

    try {

        pivotService.deletePivot(req.params.id);

        res.json({ message: "Pivot removido" });

    } catch (error) {

        res.status(404).json({ error: error.message });

    }

}

module.exports = {
    createPivot,
    getAllPivots,
    getPivotById,
    updatePivot,
    deletePivot
};