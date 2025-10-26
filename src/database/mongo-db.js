import { connect } from "mongoose";

export default async function conectarMongoDB () {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Conexão com o MongoDB realizada com sucesso.");
    } catch (err) {
        console.error("Erro ao conectar com o MongoDB.");
        process.exit(1);
    }
}