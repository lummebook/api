import { Router } from "express";
import UsuarioServices from "../services/usuario-services.js";

const usuarioServices = new UsuarioServices();
const usuarioRotas = Router();

// Rota para criar um usuário
usuarioRotas.post("/auth/cadastrar", async (req, res) => {
    // Tenta executar a criação do usuário
    try {
        // Cria um usuário com as informações da requisição
        const usuarioCriado = await usuarioServices.criarUsuario(req.body.data);
        // Retorna o usuário criado
        return res.status(201).json(usuarioCriado);
    } 
    // Caso um erro aconteça, cai no catch
    catch (erro) {
        // Retorna o erro caso aconteça
        return res.status(500).json(erro.message);
    }
});

// Rota para verificar o usuário
usuarioRotas.post("/auth/conectar", async (req, res) => {
    // Tenta executar a verificação do usuário
    try {
        // Verifica o usuário com as informações da requisição
        const usuarioVerificado = await usuarioServices.verificarUsuario(req.body.data);
        // Se der errado, retorna null
        if (!usuarioVerificado) {
            return res.status(400).json(null);
        }

        // Retorna o usuário verificado
        return res.status(200).json(usuarioVerificado);
    } 
    // Caso um erro aconteça, cai no catch
    catch (erro) {
        // Retorna o erro caso aconteça
        return res.status(500).json(erro.message);
    }
});

// Rota para retornar um usuário por ID
usuarioRotas.get("/:idUsuario", async (req, res) => {
    try {
        // Procura o usuário pelo ID
        const usuarioRetornado = await usuarioServices.retornarUsuarioPorId(req.params.idUsuario);
        // Se não for encontrado, retorna null
        if (!usuarioRetornado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioRetornado);
    }
    catch (erro) {
        // Retorna o erro caso aconteça
        return res.status(500).json(erro.message);
    }
});

// Rota para atualizar um usuário
usuarioRotas.patch("/:idUsuario", async (req, res) => {
    try {
        // Atualiza o usuário pelo ID
        const usuarioAtualizado = await usuarioServices.atualizarUsuario(req.params.idUsuario, req.body.data);
        // Se não for encontrado, retorna null
        if (!usuarioAtualizado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioAtualizado);
    }
    catch (erro) {
        // Retorna o erro caso aconteça
        return res.status(500).json(erro.message);
    }
});

// Rota para deletar um usuário
usuarioRotas.delete("/:idUsuario", async (req, res) => {
    try {
        // Deleta o usuário pelo ID
        const usuarioDeletado = await usuarioServices.deletarUsuario(req.params.idUsuario);
        // Se não for encontrado, retorna null
        if (!usuarioDeletado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioDeletado);
    }
    catch (erro) {
        // Retorna o erro caso aconteça
        return res.status(500).json(erro.message);
    }
});


export default usuarioRotas;