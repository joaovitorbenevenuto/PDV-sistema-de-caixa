const joi = require('joi');

module.exports = {
    user: joi.object({
        nome: joi.string().required().messages({
            'any.required': 'O campo nome é obrigatório.',
            'string.base': 'O campo nome deve ser uma string válida.',
            'string.empty': 'O campo nome não pode ser vazio.',
        }),

        email: joi.string().email().required().messages({
            'any.required': 'O campo email é obrigatório.',
            'string.base': 'E-mail inválido.',
            'string.email': 'E-mail inválido.',
            'string.empty': 'O campo email não pode ser vazio.',
        }),

        senha: joi.string().min(6).required().messages({
            'any.required': 'O campo senha é obrigatório.',
            'string.base': 'O campo senha deve ser uma string válida.',
            'string.min': 'O campo senha deve ter no mínimo 6 caractares.',
            'string.empty': 'O campo senha não pode ser vazio.',
        }),
    }),

    login: joi.object({
        email: joi.string().email().required().messages({
            'any.required': 'O campo email é obrigatório.',
            'string.base': 'E-mail inválido.',
            'string.email': 'E-mail inválido.',
            'string.empty': 'O campo email não pode ser vazio.',
        }),

        senha: joi.string().min(6).required().messages({
            'any.required': 'O campo senha é obrigatório.',
            'string.base': 'O campo senha deve ser uma string válida.',
            'string.min': 'O campo senha deve ter no mínimo 6 caractares.',
            'string.empty': 'O campo senha não pode ser vazio.',
        }),
    }),

    customer: joi.object({
        nome: joi.string().required().messages({
            'any.required': 'O campo nome é obrigatório.',
            'string.base': 'O campo nome deve ser uma string válida.',
            'string.empty': 'O campo nome não pode ser vazio.',
        }),

        email: joi.string().email().required().messages({
            'any.required': 'O campo email é obrigatório.',
            'string.base': 'E-mail inválido.',
            'string.email': 'E-mail inválido.',
            'string.empty': 'O campo email não pode ser vazio.',
        }),

        cpf: joi.string().length(11).required().messages({
            'any.required': 'O campo cpf é obrigatório.',
            'string.base': 'O campo cpf deve ser uma string válida.',
            'string.empty': 'O campo cpf não pode ser vazio.',
            'string.length': 'O campo cpf deve ter 11 caracteres numéricos.',
        }),

        cep: joi.string().length(8).messages({
            'string.base': 'O campo cep deve ser uma string válida.',
            'string.empty': 'O campo cep não pode ser vazio.',
            'string.length': 'O campo cep deve ter 8 caracteres numéricos.',
        }),

        rua: joi.string().messages({
            'string.base': 'O campo rua deve ser uma string válida.',
            'string.empty': 'O campo rua não pode ser vazio.',
        }),

        numero: joi.string().messages({
            'string.base': 'O campo numero deve ser uma string válida.',
            'string.empty': 'O campo numero não pode ser vazio.',
        }),

        bairro: joi.string().messages({
            'string.base': 'O campo bairro deve ser uma string válida.',
            'string.empty': 'O campo bairro não pode ser vazio.',
        }),

        cidade: joi.string().messages({
            'string.base': 'O campo cidade deve ser uma string válida.',
            'string.empty': 'O campo cidade não pode ser vazio.',
        }),

        estado: joi.string().messages({
            'string.base': 'O campo estado deve ser uma string válida.',
            'string.empty': 'O campo estado não pode ser vazio.',
        }),
    }),

    product: joi.object({
        descricao: joi.string().required().messages({
            'any.required': 'O campo descricao é obrigatório.',
            'string.base': 'O campo descricao deve ser uma string válida.',
            'string.empty': 'O campo descricao não pode ser vazio.',
        }),

        quantidade_estoque: joi.number().integer().positive().required().messages({
            'any.required': 'O campo quantidade_estoque é obrigatório.',
            'number.base': 'O campo quantidade_estoque deve ser um número inteiro.',
            'number.integer': 'O campo quantidade_estoque deve ser um número inteiro.',
            'number.positive': 'O campo quantidade_estoque deve ser um número positivo.',
            'number.empty': 'O campo quantidade_estoque não pode ser vazio.',
        }),

        valor: joi.number().integer().positive().required().messages({
            'any.required': 'O campo valor é obrigatório.',
            'number.base': 'O campo valor deve ser um número inteiro.',
            'number.integer': 'O campo valor deve ser um número inteiro.',
            'number.positive': 'O campo valor deve ser um número positivo.',
            'number.empty': 'O campo valor não pode ser vazio.',
        }),

        categoria_id: joi.number().integer().positive().required().messages({
            'any.required': 'O campo categoria_id é obrigatório.',
            'number.base': 'O campo categoria_id deve um número inteiro.',
            'number.integer': 'O campo categoria_id deve um número inteiro.',
            'number.positive': 'O campo categoria_id deve ser um número positivo.',
            'number.empty': 'O campo categoria_id não pode ser vazio.',
        }),
    }),

    order: joi.object({
        cliente_id: joi.number().integer().positive().required().messages({
            'any.required': 'O campo cliente_id é obrigatório.',
            'number.base': 'O campo cliente_id deve ser um número inteiro.',
            'number.integer': 'O campo cliente_id deve ser um número inteiro.',
            'number.positive': 'O campo cliente_id deve ser um número positivo.',
            'number.empty': 'O campo cliente_id não pode ser vazio.',
        }),

        observacao: joi.string().messages({
            'string.base': 'O campo observacao deve ser uma string válida.',
            'string.empty': 'O campo observacao não pode ser vazio.',
        }),

        pedido_produtos: joi.array().items({
            produto_id: joi.number().integer().positive().required().messages({
                'any.required': 'O campo produto_id é obrigatório.',
                'number.base': 'O campo produto_id deve ser um número inteiro.',
                'number.integer': 'O campo produto_id deve ser um número inteiro.',
                'number.positive': 'O campo produto_id deve ser um número positivo.',
                'number.empty': 'O campo produto_id não pode ser vazio.',
            }),

            quantidade_produto: joi.number().integer().positive().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório.',
                'number.base': 'O campo quantidade_produto deve ser um número inteiro.',
                'number.integer': 'O campo quantidade_produto deve ser um número inteiro.',
                'number.positive': 'O campo quantidade_produto deve ser um número positivo.',
                'number.empty': 'O campo quantidade_produto não pode ser vazio.',
            }),

        }).min(1).required().messages({
            'any.required': 'O campo pedido_produtos é obrigatório.',
            'array.min': 'O array pedido_produtos deve ter no mínimo 1 item.',
        }),
    }),
};
