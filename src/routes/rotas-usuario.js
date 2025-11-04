import { Router } from "express";
import UsuarioServices from "../services/usuario-services.js";

const usuarioServices = new UsuarioServices();
const usuarioRotas = Router();

// Rota para criar um usuário
usuarioRotas.post("/", async (req, res) => {
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

// Rota para retornar um usuário por ID
usuarioRotas.get("/", async (req, res) => {
    try {
        // Procura o usuário pelo ID
        const usuarioRetornado = await usuarioServices.retornarUsuarioPorId(req.body.idUsuario);
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
usuarioRotas.patch("/", async (req, res) => {
    try {
        // Atualiza o usuário pelo ID
        const usuarioAtualizado = await usuarioServices.atualizarUsuario(req.body.idUsuario, req.body.data);
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
usuarioRotas.delete("/", async (req, res) => {
    try {
        // Deleta o usuário pelo ID
        const usuarioDeletado = await usuarioServices.deletarUsuario(req.body.idUsuario);
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