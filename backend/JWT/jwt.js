const jwt = require("jsonwebtoken");

const SECRET = "segredo_super";

function generateToken(user) {

    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        SECRET,
        {
            expiresIn: "1h"
        }
    );

}

function verificarToken(req, res, next) {
    //console.log("Verificando token... ", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {

        console.log("Token recebido:", token);
        const decoded = jwt.verify(token, SECRET);
        console.log("Token decodificado:", decoded);
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({ error: "Token inválido" });

    }

}

module.exports = {
    generateToken,
    verificarToken
};