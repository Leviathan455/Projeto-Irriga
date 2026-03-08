const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const pivotControle = require("../controles/pivotControle");
const jwtUtil = require("../JWT/jwt");

//Validacao
const validatePivot = [
    body("description").isString().withMessage("Description deve ser uma string"),
    body("flowRate").isFloat().withMessage("FlowRate deve ser um número"),
    body("minApplicationDepth").isFloat().withMessage("MinApplicationDepth deve ser um número"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

router.post("/", validatePivot,jwtUtil.verificarToken, pivotControle.createPivot);

router.get("/", jwtUtil.verificarToken, pivotControle.getAllPivots);

router.get("/:id",jwtUtil.verificarToken, pivotControle.getPivotById);

router.put("/:id",validatePivot,jwtUtil.verificarToken, pivotControle.updatePivot);

router.delete("/:id",jwtUtil.verificarToken, pivotControle.deletePivot);

module.exports = router;