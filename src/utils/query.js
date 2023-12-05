const knex = require('../data/database');

module.exports = {
    // Queries para a tabela de usuários
    createUser: async (nome, email, senha) =>
        await knex('usuarios')
            .insert({ nome, email, senha })
            .returning(['id', 'nome', 'email'])
            .then((result) => result[0]),

    updateUser: async (id, nome, email, senha) =>
        await knex('usuarios').update({ nome, email, senha }).where({ id }),

    getUserById: async (id) => await knex('usuarios').where({ id }).first(),

    getUserByEmail: async (email) =>
        await knex('usuarios').where({ email }).first(),

    getEmailById: async (id) =>
        await knex('usuarios')
            .select('email')
            .where({ id })
            .then((result) => result[0].email),

    existsUserEmail: async (email) =>
        await knex('usuarios')
            .where({ email })
            .count()
            .then((result) => result[0].count > 0),

    // Queries para a tabela de categorias
    getCategories: async () => await knex('categorias').select('*'),

    existsCategoryId: async (id) =>
        await knex('categorias')
            .where({ id })
            .count()
            .then((result) => result[0].count > 0),

    // Queries para a tabela de produtos
    createProduct: async (descricao, quantidade_estoque, valor, categoria_id, produto_imagem) =>
        await knex('produtos')
            .insert({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem })
            .returning('*')
            .then((result) => result[0]),

    updateProduct: async (id, descricao, quantidade_estoque, valor, categoria_id, produto_imagem) =>
        await knex('produtos')
            .update({ descricao, quantidade_estoque, valor, categoria_id, produto_imagem })
            .where({ id })
            .returning('*')
            .then((result) => result[0]),

    getProducts: async () =>
        await knex('produtos').select('*'),

    getProductById: async (id) =>
        await knex('produtos').where({ id }).first(),

    getProductsByCategoryId: async (categoria_id) =>
        await knex('produtos').where({ categoria_id }),

    deleteProduct: async (id) =>
        await knex('produtos').where({ id }).delete(),

    reduceProductQuantity: async (id, quantidade) => await knex('produtos')
        .where({ id })
        .decrement('quantidade_estoque', quantidade),

    // Queries para a tabela de cLientes
    createCustomer: async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) =>
        await knex('clientes')
            .insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado })
            .returning('*')
            .then((result) => result[0]),

    updateCustomer: async ({id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado}) =>
        await knex('clientes')
            .update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado, })
            .where({ id })
            .returning('*')
            .then((result) => result[0]),

    getCustomers: async () => await knex('clientes').select('*'),

    getCustomerById: async (id) =>
        await knex('clientes').where({ id }).first(),

    existsCustomerEmail: async (email) =>
        await knex('clientes')
            .where({ email })
            .count()
            .then((result) => result[0].count > 0),

    existsCustomerCpf: async (cpf) =>
        await knex('clientes')
            .where({ cpf })
            .count()
            .then((result) => result[0].count > 0),

    //Queries para a tabela de pedidos
    createOrder: async (observacao, valor_total, cliente_id) =>
        await knex('pedidos')
            .insert({ observacao, valor_total, cliente_id })
            .returning('*')
            .then((result) => result[0]),

    getAllOrders: async () => await knex('pedidos'),

    getOrdersByCustomerId: async (cliente_id) => await knex('pedidos').where({ cliente_id }),

    // Queries para a tabela de pedido_produtos
    createOrderProducts: async (pedido_id, produto_id, quantidade_produto, valor_produto) =>
        await knex('pedido_produtos')
            .insert({ pedido_id, produto_id, quantidade_produto, valor_produto, })
            .returning('*')
            .then((result) => result[0]),

    getOrderProductsByOrderId: async (pedido_id) =>
        await knex('pedido_produtos').where({ pedido_id }),

    getOrderProductsByProductId: async (produto_id) =>
        await knex('pedido_produtos').where({ produto_id }),
}
