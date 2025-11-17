import UsuarioModel from "../models/usuario-model.js";
import LivroModel from "../models/livro-model.js";
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
    async verificarUsuario({ email, senha }) {
        // busca usuário pelo email
        const usuario = await UsuarioModel.findOne({ email }).lean();
        // Se o usuário não existir, retorna 'null'
        if (!usuario) {
            return null;
        }

        // Verifica se a senha digitada é igual a guardada
        const sucesso = await compare(senha, usuario.senha);
        // Se não for, retorna 'null'
        if (!sucesso) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senhaUsuario, ...usuarioRetornado } = usuario;
        return usuarioRetornado;
    }

    // Função para retornar usuário por ID
    async retornarUsuarioPorId(idUsuario) {
        // Busca o usuário pelo ID
        const usuario = await UsuarioModel.findOne({ idUsuario }).lean();
        // Se o usuário não existir, retorna 'null'
        if (!usuario) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senha, ...usuarioRetornado } = usuario;
        return usuarioRetornado;
    }

    // Função para adicionar um livro no carrinho
    async adicionarLivroAoCarrinho(idUsuario, idLivro) {
        // Busca o usuário pelo ID e atualiza o carrinho
        const usuarioAtualizado = await UsuarioModel.findOneAndUpdate(
            { idUsuario, carrinho: { $ne: idLivro } },
            { $push: { carrinho: idLivro } },
            { new: true }
        ).lean();

        // Se o usuário não existir, retorna 'null'
        if (!usuarioAtualizado) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senha, ...usuarioRetornado } = usuarioAtualizado;
        return usuarioRetornado;
    }

    // Função para remover um livro do carrinho
    async removerLivroDoCarrinho(idUsuario, idLivro) {
        // Busca o usuário pelo ID e atualiza o carrinho
        const usuarioAtualizado = await UsuarioModel.findOneAndUpdate(
            { idUsuario },
            { $pull: { carrinho: idLivro } },
            { new: true }
        ).lean();

        // Se o usuário não existir, retornar 'null'
        if (!usuarioAtualizado) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senha, ...usuarioRetornado } = usuarioAtualizado;
        return usuarioRetornado;
    }

    // Função para retornar todos os livros do carrinho do usuário
    async retornarLivrosDoCarrinho(idUsuario) {
        // Busca o usuário pelo ID
        const usuario = await UsuarioModel.findOne({ idUsuario }).lean();

        // Se o usuário não existir, retorna 'null'
        if (!usuario) {
            return null;
        }

        // Retornar apenas os IDs dos livros
        const livros = await LivroModel.find({
            idLivro: { $in: usuario.carrinho },
        }).lean();
        const livrosRetornados = livros.map(({ _id, __v, ...livro }) => livro);
        return livrosRetornados;
    }

    // Função para atualizar usuário
    async atualizarUsuario(idUsuario, novaInfo) {
        // Busca o usuário pelo ID e atualiza se achar
        const usuarioNovo = await UsuarioModel.findOneAndUpdate(
            { idUsuario },
            novaInfo,
            { new: true }
        ).lean();
        // Se o usuário não existir, retorna 'null'
        if (!usuarioNovo) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senha, ...usuarioRetornado } = usuarioNovo;
        return usuarioRetornado;
    }

    // Função para deletar usuário
    async deletarUsuario(idUsuario) {
        // Busca o usuário pelo ID e deleta se achar
        const usuarioDeletado = await UsuarioModel.findOneAndDelete({
            idUsuario,
        }).lean();
        // Se o usuário não existir, retorna 'null'
        if (!usuarioDeletado) {
            return null;
        }

        // Omite informações importantes
        const { _id, __v, senha, ...usuarioRetornado } = usuarioDeletado;
        return usuarioRetornado;
    }
}
