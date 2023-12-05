const query = require("../utils/query");

module.exports = {
    getCustomers: async (req, res) => {
        try {
            const customers = await query.getCustomers();

            return res.status(200).json(customers);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    getCustomer: async (req, res) => {
        const { id } = req.params;

        try {
            const customer = await query.getCustomerById(id);

            if (!customer) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

            return res.status(200).json(customer);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    createCustomer: async (req, res) => {
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

        try {
            const existsCustomerEmail = await query.existsCustomerEmail(email);

            if (existsCustomerEmail)
                return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });

            const existsCustomerCpf = await query.existsCustomerCpf(cpf);

            if (existsCustomerCpf)
                return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });

            const customer = await query.createCustomer(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);

            return res.status(201).json(customer);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    updateCustomer: async (req, res) => {
        const { id } = req.params;
        const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

        try {
            const customer = await query.getCustomerById(id);

            if (!customer) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });

            const existsCustomerEmail = await query.existsCustomerEmail(email);

            if (existsCustomerEmail && customer.email !== email)
                return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' });

            const existsCustomerCpf = await query.existsCustomerCpf(cpf);

            if (existsCustomerCpf && customer.cpf !== cpf)
                return res.status(400).json({ mensagem: 'Já existe cliente cadastrado com o CPF informado.' });

            const updatedCustomer = await query.updateCustomer(
                id,
                nome,
                email,
                cpf,
                cep ?? customer.cep,
                rua ?? customer.rua,
                numero ?? customer.numero,
                bairro ?? customer.bairro,
                cidade ?? customer.cidade,
                estado ?? customer.estado
            );

            return res.status(200).json(updatedCustomer);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}