import { Router } from "express";
import UsuarioServices from "../services/usuario-services.js";

const usuarioServices = new UsuarioServices();
const usuarioRotas = Router();

// Rota para retornar um usuário pelo seu ID
usuarioRotas.get("/:idUsuario", async (req, res) => {
    const usuario = await usuarioServices.retornarUsuarioPorId(req.params?.idUsuario);

    // Se não existir usuário, retornar um erro (404 - Item Não Encontrado)
    if (!usuario) {
        res.status(404).json(null);
    }
    // Caso exista, retorna o usuário (200 - Sucesso)
    else {
        res.status(200).json(usuario);
    }
});

// Rota para criar um usuário
usuarioRotas.post("/", async (req, res) => {
    const usuario = await usuarioServices.criarUsuario(req.body);
    res.status(200).json(usuario);
});

export default usuarioRotas;