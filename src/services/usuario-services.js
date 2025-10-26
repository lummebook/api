import UsuarioModel from "../models/usuario-model.js";
import { hash } from "bcrypt";

// Classe para veificar os dados e comunicar com o MongoDB
export default class UsuarioServices {
    async retornarUsuarioPorId(idUsuario) {
        // Retorna o usuário do MongoDB
        const data = await UsuarioModel.findOne({ idUsuario }).lean();

        // Se usuário não existir, retornar 'null' (vazio)
        if (!data) {
            return null;
        }
        // Se ele existir, retorna o usuário excluindo seu '_id', '__v' e sua senha
        else {
            const { _id, __v, senha, ...usuario } = data;
            return usuario;
        }
    }

    async criarUsuario(infoUsuario) {
        // Criptografia da senha para segurança
        const senhaCriptografada = await hash(infoUsuario.senha, 12);
        // Atualiza os dados do usuário para ter a senha criptografada
        const novaInfoUsuario = { ...infoUsuario, senha: senhaCriptografada };

        // Retorna o usuário criado (pode dar erro dependendo dos dados, como um email já registrado)
        const { _id, __v, senha, ...usuario } = (
            await UsuarioModel.create(novaInfoUsuario)
        ).toObject();
        return usuario;
    }
}
