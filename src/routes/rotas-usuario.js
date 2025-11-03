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
        // Retorna vazio caso um erro aconteça
        return res.status(500).json(null);
    }
});

// Rota para retornar um usuário por email
usuarioRotas.get("/", async (req, res) => {
    try {
        // Procura o usuário pelo email
        const usuarioRetornado = await usuarioServices.retornarUsuarioPorEmail(req.body.data);
        // Se não for encontrado, retorna null
        if (!usuarioRetornado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioRetornado);
    }
    catch (erro) {
        // Retorna vazio caso um erro aconteça
        return res.status(500).json(null);
    }
});

// Rota para atualizar um usuário
usuarioRotas.patch("/", async (req, res) => {
    try {
        // Atualiza o usuário pelo email
        const usuarioAtualizado = await usuarioServices.atualizarUsuario(req.body.email, req.body.data);
        // Se não for encontrado, retorna null
        if (!usuarioAtualizado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioAtualizado);
    }
    catch (erro) {
        // Retorna vazio caso um erro aconteça
        return res.status(500).json(null);
    }
});

// Rota para deletar um usuário
usuarioRotas.delete("/", async (req, res) => {
    try {
        // Deleta o usuário pelo email
        const usuarioDeletado = await usuarioServices.deletarUsuario(req.body.email);
        // Se não for encontrado, retorna null
        if (!usuarioDeletado) {
            return res.status(404).json(null);
        }

        // Retorna o usuário encontrado
        return res.status(200).json(usuarioDeletado);
    }
    catch (erro) {
        // Retorna vazio caso um erro aconteça
        return res.status(500).json(null);
    }
});


export default usuarioRotas;