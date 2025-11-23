import UsuarioModel from "../models/usuario-model.js";
import LivroModel from "../models/livro-model.js";
import { compare, hash } from "bcrypt";
import LivroServices from "./livro-services.js";

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
        const usuario = await UsuarioModel.findOne(
            { email },
            { _id: 0, __v: 0 }
        ).lean();

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
        const { senha: _senhaOmitida, ...usuarioVerificado } = usuario;
        return usuarioVerificado;
    }

    // Função para retornar usuário por ID
    async retornarUsuarioPorId(idUsuario) {
        // Busca o usuário pelo ID
        const usuario = await UsuarioModel.findOne(
            { idUsuario },
            { _id: 0, __v: 0, senha: 0 }
        ).lean();

        return usuario;
    }

    // Função para adicionar um livro no carrinho
    async adicionarLivroAoCarrinho(idUsuario, idLivro) {
        // Busca o usuário pelo ID
        const usuario = await UsuarioModel.findOne(
            {
                idUsuario,
            },
        );

        // Se o usuário não existir, retorna erro
        if (!usuario) {
            return { erro: "usuario_inexistente" };
        }

        // Se o livro já estiver no carrinho, retorna erro
        if (usuario.carrinho.includes(idLivro)) {
            return { erro: "livro_registrado" };
        }

        // Salva o livro no carrinho
        usuario.carrinho.push(idLivro);
        const usuarioSalvo = await usuario.save();
        const { _id, __v, senha, ...usuarioAtualizado } = usuarioSalvo.toObject();

        return usuarioAtualizado;
    }

    // Função para remover um livro do carrinho
    async removerLivroDoCarrinho(idUsuario, idLivro) {
        // Busca o usuário pelo ID e atualiza o carrinho
        const usuarioAtualizado = await UsuarioModel.findOneAndUpdate(
            { idUsuario },
            {
                $pull: { carrinho: idLivro },
            },
            { new: true, select: { _id: 0, __v: 0, senha: 0 } }
        ).lean();

        // Se o usuário não existir, retornar 'null'
        return usuarioAtualizado;
    }

    async efetuarCompra (idUsuario, idLivrosArray) {
        const livroServices = new LivroServices();
        await livroServices.efetuarCompra(idLivrosArray);

        const usuarioAtualizado = await UsuarioModel.findOneAndUpdate(
            { idUsuario },
            { $pullAll: { carrinho: idLivrosArray } },
            { new: true, select: { _id: 0, __v: 0, senha: 0 } }
        ).lean();

        return usuarioAtualizado;
    }

    // Função para retornar todos os livros do carrinho do usuário
    async retornarLivrosDoCarrinho(idUsuario) {
        // Busca o usuário pelo ID
        const usuario = await UsuarioModel.findOne(
            { idUsuario },
            { _id: 0, __v: 0, senha: 0 }
        ).lean();

        // Se o usuário não existir, retorna 'null'
        if (!usuario) {
            return null;
        }

        // Retornar apenas os livros
        const livros = await LivroModel.find(
            {
                idLivro: { $in: usuario.carrinho },
            },
            {_id: 0, __v: 0}
        ).lean();
        return livros;
    }

    // Função para atualizar usuário
    async atualizarUsuario(idUsuario, novaInfo) {
        // Busca o usuário pelo ID e atualiza se achar
        const usuarioNovo = await UsuarioModel.findOneAndUpdate(
            { idUsuario },
            novaInfo,
            { new: true, select: { _id: 0, __v: 0, senha: 0 } }
        ).lean();

        return usuarioNovo;
    }

    // Função para deletar usuário
    async deletarUsuario(idUsuario) {
        // Busca o usuário pelo ID e deleta se achar
        const usuarioDeletado = await UsuarioModel.findOneAndDelete(
            {
                idUsuario,
            },
            { select: { _id: 0, __v: 0, senha: 0 } }
        ).lean();

        return usuarioDeletado;
    }
}
