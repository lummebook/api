import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import conectarMongoDB from './database/mongo-db.js';
import cors from 'cors';
import usuarioRotas from './routes/rotas-usuario.js';
import livroRotas from './routes/rotas-livro.js';

async function main () {
    await conectarMongoDB(); // Conecta com o MongoDB
    const app = express(); // Inicia o servidor
    const PORT = process.env.PORT | 8080;

    // Configurações do servidor
    app.use(express.json());
    app.use(cors());

    // Configurações das rotas
    app.use("/usuarios", usuarioRotas);
    app.use("/livros", livroRotas);

    // Inicia o servidor
    app.listen(PORT, () => console.log(`Server iniciado na porta ${PORT}.`));
}

main();