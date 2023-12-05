const { getCategories } = require('../utils/query');

module.exports = {
    getCategories: async (req, res) => {
        try {
            const categories = await getCategories();

            return res.status(200).json(categories);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}   