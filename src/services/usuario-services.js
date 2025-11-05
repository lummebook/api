import UsuarioModel from "../models/usuario-model.js";
import { compare, hash } from "bcrypt";

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

    // Função para verificar o usuário
    async verificarUsuario({email, senha}) {
        // busca usuário pelo email
        const usuario = await UsuarioModel.findOne({email}).lean();
        // Se não existir, retorna null
        if (!usuario) {
            return null;
        }

        // Verifica se a senha digitada é igual a guardada
        const sucesso = await compare(senha, usuario.senha);
        // Se não for, retorna null
        if (!sucesso) {
            return null;
        }

        // Omite informações importantes
        const {_id, __v, senhaUsuario, ...usuarioRetornado} = usuario;
        return usuarioRetornado;
    }

    // Função para retornar usuário por ID
    async retornarUsuarioPorId(idUsuario) {
        // Busca o usuário pelo ID
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
        // Busca o usuário pelo ID e atualiza se achar
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
