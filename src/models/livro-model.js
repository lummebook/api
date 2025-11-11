import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

// Cria um modelo de livro (ID, título, autor, preço, quantidade e ID do vendedor)
const livroSchema = new Schema({
    idLivro: {
        type: String, // Tipo 'string'
        default: () => randomUUID(), // ID gerado automaticamente
        unique: true, // Campo único
    },
    titulo: {
        type: String, // Tipo 'string'
        required: true, // Campo obrigatório
    },
    autor: {
        type: String, // Tipo 'string'
        required: true, // Campo obrigatório
    },
    preco: {
        type: Number, // Tipo 'number'
        required: true, // Campo obrigatório
        min: 0 // Valor mínimo
    },
    quantidade: {
        type: Number, // Tipo 'number'
        required: true, // Campo obrigatório
        min: 0 // Valor mínimo
    },
    idVendedor: {
        type: Schema.Types.ObjectId, // Tipo 'ObjectId'
        required: true, // Campo obrigatório
    },
}); 

// Exporta a ligação (model) para trabalhar com livros
const LivroModel = model("Livro", livroSchema);
export default LivroModel;