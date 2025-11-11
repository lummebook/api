import { Router } from "express";
import UsuarioServices from "../services/usuario-services.js";

// Objetos para configurar as rotas
const usuarioServices = new UsuarioServices();
const usuarioRotas = Router();

// Rota para criar um usuário
usuarioRotas.post("/auth/cadastrar", async (req, res) => {
    // Tenta executar a criação do usuário no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Cria um usuário com as informações da requisição
        const usuarioCriado = await usuarioServices.criarUsuario(req.body.data);

        // Retorna o usuário criado
        return res.status(201).json(usuarioCriado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para verificar o usuário
usuarioRotas.post("/auth/conectar", async (req, res) => {
    // Tenta executar a verificação do usuário no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Verifica o usuário com as informações da requisição
        const usuarioVerificado = await usuarioServices.verificarUsuario(
            req.body.data
        );

        // Se der errado, retorna null
        if (!usuarioVerificado) {
            return res.status(400).json(null);
        }

        // Retorna o usuário verificado
        return res.status(200).json(usuarioVerificado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para retornar um usuário por ID
usuarioRotas.get("/:idUsuario", async (req, res) => {
    // Tenta executar o retorno do usuário no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Procura o usuário pelo ID
        const usuarioRetornado = await usuarioServices.retornarUsuarioPorId(
            req.params.idUsuario
        );

        // Se não for encontrado, retorna null
        if (!usuarioRetornado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioRetornado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para atualizar um usuário
usuarioRotas.patch("/:idUsuario", async (req, res) => {
    // Tenta executar a atualização do usuário no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Atualiza o usuário pelo ID
        const usuarioAtualizado = await usuarioServices.atualizarUsuario(
            req.params.idUsuario,
            req.body.data
        );

        // Se não for encontrado, retorna null
        if (!usuarioAtualizado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioAtualizado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para deletar um usuário
usuarioRotas.delete("/:idUsuario", async (req, res) => {
    // Tenta executar a remoção do usuário no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Deleta o usuário pelo ID
        const usuarioDeletado = await usuarioServices.deletarUsuario(
            req.params.idUsuario
        );

        // Se não for encontrado, retorna null
        if (!usuarioDeletado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioDeletado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

export default usuarioRotas;
