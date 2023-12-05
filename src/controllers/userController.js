const bcrypt = require('bcrypt');
const query = require('../utils/query');
const getUserIdFromToken = require('../utils/getUserIdFromToken');

module.exports = {
    getUser: async (req, res) => {
        const id = getUserIdFromToken(req);

        try {
            const user = await query.getUserById(id);
            delete user.senha;

            return res.status(200).json(user);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    createUser: async (req, res) => {
        const { nome, email, senha } = req.body;

        try {
            const existsUserEmail = await query.existsUserEmail(email);

            if (existsUserEmail)
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

            const cryptPass = await bcrypt.hash(senha, 10);
            const user = await query.createUser(nome, email, cryptPass);

            return res.status(201).json(user);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    updateUser: async (req, res) => {
        const { nome, email, senha } = req.body;
        const id = getUserIdFromToken(req);

        try {
            const existsUserEmail = await query.existsUserEmail(email);
            const currentEmail = await query.getEmailById(id);

            if (existsUserEmail && currentEmail !== email)
                return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' });

            const cryptPass = await bcrypt.hash(senha, 10);
            await query.updateUser(id, nome, email, cryptPass);

            return res.status(204).send();
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}
