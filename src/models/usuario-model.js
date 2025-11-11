import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

// Cria um modelo de usuário (ID, nome, email, senha, se é vendedor e seu CPF)
const schemaUsuario = new Schema({
    idUsuario: {
        type: String, // Tipo 'string'
        default: () => randomUUID() ,// ID gerado automaticamente
        unique: true // Campo único
    },
    nome: {
        type: String, // Tipo 'string'
        required: true, // Campo obrigatório
    },
    email: {
        type: String, // Tipo 'string'
        required: true, // Campo obrigatório
        lowercase: true, // Deixa em minúsculas
        unique: true // Campo único
    },
    senha: {
        type: String, // Tipo 'string'
        required: true, // Campo obrigatório
        minLength: 8, // Oito caracteres mínimos
    },
});

// Exporta a ligação (model) para trabalhar com usuários
const UsuarioModel = model("Usuario", schemaUsuario);
export default UsuarioModel;