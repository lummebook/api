import LivroModel from "../models/livro-model.js";

export default class LivroServices {
    // Função para criar um livro
    async criarLivro(infoLivro) {
        // Se 'quantidade' não for inteira, retorna erro
        if (!Number.isInteger(infoLivro.quantidade)) {
            throw new Error("Dados inválidos inseridos.");
        }

        // Retorna o livro criado, omitindo informações importantes
        const { _id, __v, ...livroCriado } = (
            await LivroModel.create(infoLivro)
        ).toObject();
        return livroCriado;
    }

    // Função para retornar o livro pelo ID
    async retornarLivroPorID(idLivro) {
        // Busca o livro pelo ID
        const livro = await LivroModel.findOne({ idLivro }, { _id: 0, __v: 0 }).lean();
        
        return livro
    }

    // Função para retornar todos os livros registrados
    async retornarLivrosRegistrados() {
        // Buscas os livros registrados
        const livrosRegistrados = await LivroModel.find({}, { _id: 0, __v: 0 }).lean();
        
        return livrosRegistrados;
    }

    // Função para retornar todos os livros do usuário
    async retornarLivrosDoUsuario(idUsuario) {
        // Busca os livros pelo ID do usuário
        const livros = await LivroModel.find({ idVendedor: idUsuario }, { _id: 0, __v: 0 }).lean();
        
        return livros;
    }

    // Função para atualizar o livro pelo ID
    async atualizarLivro(idLivro, novaInfo) {
        // Se 'quantidade' não for inteira, retorna erro
        if (!Number.isInteger(novaInfo.quantidade)) {
            throw new Error("Dados inválidos inseridos");
        }

        // Atualiza o livro pelo ID e atualiza se achar
        const livroAtualizado = await LivroModel.findOneAndUpdate(
            { idLivro },
            novaInfo,
            {
                new: true,
            }
        ).lean();

        // Se o livro não existir, retorna 'null'
        if (!livroAtualizado) {
            return null;
        }

        // Omiti informações importantes e retorna o livro
        const { _id, __v, ...livroRetornado } = livroAtualizado;
        return livroRetornado;
    }

    // Função para efetuar a compra dos livros
    async efetuarCompra (idLivrosArray) {
        // Atualiza a quantidade
        await LivroModel.updateMany(
            { idLivro: { $in: idLivrosArray } },
            { $inc: { quantidade: -1 } },
            { new: true }
        ).lean();

        const livrosAtualizados = await LivroModel.find({ idLivro: { $in: idLivrosArray } }, { _id: 0, __v: 0 }).lean();
        return livrosAtualizados;
    }

    // Função para deletar o livro pelo ID
    async deletarLivro(idLivro) {
        // Deleta o livro pelo ID
        const livroDeletado = await LivroModel.findOneAndDelete({
            idLivro,
        }).lean();

        // Se o livro não existir, retorna 'null'
        if (!livroDeletado) {
            return null;
        }

        // Omiti informações importantes e retorna o livro
        const { _id, __v, ...livroRetornado } = livroDeletado;
        return livroRetornado;
    }
}
