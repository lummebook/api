import UsuarioModel from "../models/usuario-model.js";
import { hash } from "bcrypt";
import usuarioRotas from "../routes/rotas-usuario.js";

// Classe para veificar os dados e comunicar com o MongoDB
export default class UsuarioServices {
    // Função para criar usuário
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

    // Função para retornar usuário por email
    async retornarUsuarioPorId(idUsuario) {
        // Busca o usuário pelo email
        const usuario = await UsuarioModel.findOne({idUsuario}).lean();
        // Se o usuário não existir, retorna null
        if (!usuario) {
            return null;
        }

        // Omite informações importantes
        const {_id, __v, senha, ...usuarioRetornado} = usuario;
        return usuarioRetornado;
    }

    // Função para atualizar usuário
    async atualizarUsuario(idUsuario, novaInfo) {
        // Busca o usuário pelo email e atualiza se achar
        const novoUsuario = await UsuarioModel.findOneAndUpdate({idUsuario}, novaInfo, {new: true}).lean();
        // Se o usuário não existir, retorna null
        if (!novoUsuario) {
            return null
        }

        // Omite informações importantes
        const {_id, __v, senha, ...usuarioRetornado} = novoUsuario;
        return usuarioRetornado;
    }

    // Função para deletar usuário
    async deletarUsuario (idUsuario) {
        // Busca o usuário pelo ID e deleta se achar
        const usuarioDeletado = await UsuarioModel.findOneAndDelete({idUsuario}).lean();
        // Se o usuário não existir, retorna null
        if (!usuarioDeletado) {
            return null
        }

        // Omite informações importantes
        const {_id, __v, senha, ...usuarioRetornado} = usuarioDeletado;
        return usuarioRetornado;
    }
}
