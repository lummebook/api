import { connect } from "mongoose";

export default async function conectarMongoDB () {
    const MONGO_URI = process.env.MONGO_URI;
    try {
        await connect(MONGO_URI);
        console.log("Conexão com o MongoDB realizada com sucesso.");
    } catch (erro) {
        console.error("Erro ao conectar com o MongoDB: ", erro);
        process.exit(1);
    }
}
