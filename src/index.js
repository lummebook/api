import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import conectarMongoDB from './database/mongo-db.js';
import cors from 'cors';
import usuarioRotas from './routes/rotas-usuario.js';

async function main () {
    await conectarMongoDB(); // Conecta com o MongoDB
    const app = express(); // Inicia o servidor

    // Configurações do servidor
    app.use(express.json());
    app.use(cors());

    // Configurações das rotas
    app.use("/usuarios", usuarioRotas);

    // Inicia o servidor
    app.listen(8080, () => console.log("Server iniciado na porta 8080."));
}

main();