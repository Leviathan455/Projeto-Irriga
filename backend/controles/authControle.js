const authService = require("../service/AuthService");
const jwtUtil = require("../JWT/jwt");

async function register(req, res) {

    try {
   
        const { username, password } = req.body;

        const user = await authService.register(username, password);

        res.status(201).json(user);

    } catch (error) {

        res.status(400).json({ error: error.message });

    }

}

async function login(req, res) {

    try {

        const { username, password } = req.body;

        const user = await authService.login(username, password);

        const token = jwtUtil.generateToken(user);

        res.json({ token });

    } catch (error) {

        res.status(401).json({ error: error.message });

    }

}

module.exports = {
    register,
    login
};