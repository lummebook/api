import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

// Cria um modelo de usuário (ID, nome, email, senha, se é vendedor e seu CPF)
const schemaUsuario = new Schema({
    idUsuario: {
        type: String, // Tipo 'string'
        default: () => randomUUID() // ID gerado automaticamente
    },
    nome: {
        type: String,
        required: true, // Campo obrigatório
    },
    email: {
        type: String,
        required: true,
        lowercase: true, // Deixa em minúsculas
        unique: true // Campo único
    },
    senha: {
        type: String,
        required: true,
        minLength: 8, // Oito caracteres mínimos
    },
    eVendedor: {
        type: Boolean, // Tipo boolean
        default: false // Valor padrão é 'false'
    },
    cpf: {
        type: String,
        required: false,
    },
});

const UsuarioModel = model("Usuario", schemaUsuario);
export default UsuarioModel;