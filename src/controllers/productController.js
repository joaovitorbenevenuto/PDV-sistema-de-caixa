const query = require('../utils/query');
const { uploadImage, deleteImage } = require('../utils/imageService');

module.exports = {
    getProducts: async (req, res) => {
        const { categoria_id } = req.query;

        try {
            if (categoria_id) {
                const existsCategoryId = await query.existsCategoryId(categoria_id);

                if (!existsCategoryId)
                    return res.status(404).json({ mensagem: 'Categoria não encontrada.' });

                const products = await query.getProductsByCategoryId(categoria_id);

                return res.status(200).json(products);
            }

            const products = await query.getProducts();

            return res.status(200).json(products);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    getProduct: async (req, res) => {
        const { id } = req.params;

        try {
            const product = await query.getProductById(id);

            if (!product) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

            return res.status(200).json(product);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    createProduct: async (req, res) => {
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        let image;

        try {
            const existsCategoryId = await query.existsCategoryId(categoria_id);

            if (!existsCategoryId)
                return res.status(404).json({ mensagem: 'Categoria não encontrada.' });

            if (req.file) {
                const { originalname, buffer, mimetype } = req.file;
                const path = `images/${originalname}`;

                image = await uploadImage(path, buffer, mimetype);
            }
            const product = await query.createProduct(descricao, quantidade_estoque, valor, categoria_id, image);

            return res.status(201).json(product);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    updateProduct: async (req, res) => {
        const { id } = req.params;
        const { descricao, quantidade_estoque, valor, categoria_id } = req.body;
        let image;

        try {
            const product = await query.getProductById(id);

            if (!product) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

            const existsCategoryId = await query.existsCategoryId(categoria_id);

            if (!existsCategoryId) return res.status(404).json({ mensagem: 'Categoria não encontrada.' });

            if (req.file) {
                const { originalname, buffer, mimetype } = req.file;
                const path = `images/${originalname}`;

                image = await uploadImage(path, buffer, mimetype);
            }

            if (product.produto_imagem && image) await deleteImage(product.produto_imagem);

            const updatedProduct = await query.updateProduct(
                id,
                descricao,
                quantidade_estoque,
                valor,
                categoria_id,
                image ?? product.produto_imagem
            );

            return res.status(200).json(updatedProduct);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    deleteProduct: async (req, res) => {
        const { id } = req.params;

        try {
            const product = await query.getProductById(id);

            if (!product) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

            const orderProducts = await query.getOrderProductsByProductId(id);

            if (orderProducts.length > 0)
                return res.status(401).json({ mensagem: 'O produto está em uma lista de pedido, não pode ser removido.' });

            if (product.produto_imagem) await deleteImage(product.produto_imagem);

            await query.deleteProduct(id);

            return res.status(204).send();
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}
