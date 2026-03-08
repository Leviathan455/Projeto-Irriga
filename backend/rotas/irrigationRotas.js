const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const irrigationControle = require("../controles/irrigationControle");
const jwtUtil = require("../JWT/jwt");

// Validação
const validateIrrigation = [
    body("pivotId").isUUID().withMessage("pivotId deve ser um UUID válido"),
    body("applicationAmount").isFloat().withMessage("applicationAmount deve ser um número"),
    body("irrigationDate").isISO8601().withMessage("irrigationDate deve ser uma data válida (YYYY-MM-DD)"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.get("", jwtUtil.verificarToken, irrigationControle.getAllIrrigations);

router.get("/:id", jwtUtil.verificarToken, irrigationControle.getIrrigationById);

router.post("", validateIrrigation, jwtUtil.verificarToken, irrigationControle.createIrrigation);

router.delete("/:id", jwtUtil.verificarToken, irrigationControle.deleteIrrigation);

module.exports = router;