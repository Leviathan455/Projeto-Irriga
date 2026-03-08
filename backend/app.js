const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const authRotas = require("./rotas/AuthRotas");
const pivotRotas = require("./rotas/pivotRotas");
const irrigationRotas = require("./rotas/irrigationRotas");

app.use("/auth", authRotas);
app.use("/pivots", pivotRotas);
app.use("/irrigations", irrigationRotas);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});