const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../utils/query');
const { createUserToken } = require('../data/token');

module.exports = {
    login: async (req, res) => {
        const { email, senha } = req.body;

        try {
            const user = await getUserByEmail(email);

            if (!user) return res.status(403).json({ mensagem: 'Usuário ou senha inválida.' });

            const matched = await bcrypt.compare(senha, user.senha);

            if (!matched) return res.status(403).json({ mensagem: 'Usuário ou senha inválida.' });

            const token = createUserToken({ id: user.id });

            delete user.senha;

            const userAuth = {
                usuario: user,
                token: token
            };

            return res.status(200).json(userAuth);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}
