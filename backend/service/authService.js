const bcrypt = require("bcrypt");
const users = require("../modelos/userModel");
const { v4: uuidv4 } = require("uuid");

async function register(username, password) {

    const userExists = users.find(u => u.username === username);

    if (userExists) {
        throw new Error("Usuário já existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: uuidv4(),
        username,
        password: hashedPassword
    };

    users.push(newUser);

    return newUser;
}

async function login(username, password) {

    const user = users.find(u => u.username === username);

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        throw new Error("Senha inválida");
    }

    return user;
}

module.exports = {
    register,
    login
};