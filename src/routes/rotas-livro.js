import { Router } from "express";
import LivroServices from "../services/livro-services.js";

// Objetos para configurar as rotas
const livroServices = new LivroServices();
const livroRotas = Router();

// Rota para criar um livro
livroRotas.post("/", async (req, res) => {
    // Tenta executar a criação do livro no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Cria um livro com as informações da requisição
        const livroCriado = await livroServices.criarLivro(req.body.data);

        // Retorna o livro criado
        return res.status(201).json(livroCriado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para retornar um livro por ID
livroRotas.get("/:idLivro", async (req, res) => {
    // Tenta executar o retorno do livro no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // Retorna o livro pelo ID
        const livro = await livroServices.retornarLivroPorID(
            req.params.idLivro
        );

        // Se o livro não existir, retorna 'null'
        if (!livro) {
            return res.status(404).json(null);
        }

        // Retorna o livro 
        return res.status(200).json(livro);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para atualizar um livro por ID
livroRotas.patch("/:idLivro", async (req, res) => {
    // Tenta executar a atualização do livro no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // atualiza o livro pelo ID
        const livroAtualizado = await livroServices.atualizarLivro(
            req.params.idLivro,
            req.body.data,
        );

        // Se o livro não existir, retorna 'null'
        if (!livroAtualizado) {
            return res.status(404).json(null);
        }

        // Retorna o livro 
        return res.status(200).json(livroAtualizado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

// Rota para deletar um livro por ID
livroRotas.delete("/:idLivro", async (req, res) => {
    // Tenta executar a remoção do livro no 'try',
    // Caso um erro aconteça, cai no 'catch'
    try {
        // deleta o livro pelo ID
        const livroDeletado = await livroServices.deletarLivro(
            req.params.idLivro,
        );

        // Se o livro não existir, retorna 'null'
        if (!livroDeletado) {
            return res.status(404).json(null);
        }

        // Retorna o livro 
        return res.status(200).json(livroDeletado);
    } catch (erro) {
        // Mostra e retorna o erro caso aconteça
        console.log(erro.message);
        return res.status(500).json(erro.message);
    }
});

export default livroRotas;