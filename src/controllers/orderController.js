const query = require('../utils/query');
const transport = require('../data/email');
const htmlCompiler = require('../utils/htmlCompiler');

module.exports = {
    getOrders: async (req, res) => {
        const { cliente_id } = req.query;
        let orders;

        try {
            if (cliente_id) {
                const customer = await query.getCustomerById(cliente_id);

                if (!customer) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

                orders = await query.getOrdersByCustomerId(cliente_id);
            }
            orders = orders ?? await query.getAllOrders();

            const ordersWithProducts = await Promise.all(orders.map(async (order) => {
                const orderProducts = await query.getOrderProductsByOrderId(order.id);

                return { pedido: order, pedido_produtos: orderProducts }
            }));

            return res.status(200).json(ordersWithProducts);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    },

    createOrder: async (req, res) => {
        const { cliente_id, observacao, pedido_produtos } = req.body;
        let totalOrderValue = 0;

        try {
            const customer = await query.getCustomerById(cliente_id);

            if (!customer) return res.status(404).json({ mensagem: 'Cliente não encontrado.' });

            for (let pedido_produto of pedido_produtos) {
                const product = await query.getProductById(pedido_produto.produto_id);

                if (!product) return res.status(404).json({ mensagem: 'Produto não encontrado.' });

                if (product.quantidade_estoque < pedido_produto.quantidade_produto)
                    return res.status(404).json({ mensagem: `Quantidade insuficiente do produto de ID ${pedido_produto.produto_id}.` });

                totalOrderValue += pedido_produto.quantidade_produto * product.valor;
            }

            const order = await query.createOrder(observacao, totalOrderValue, cliente_id);

            const orderProducts = await Promise.all(pedido_produtos.map(async (pedido_produto) => {
                const product = await query.getProductById(pedido_produto.produto_id);
                let totalPerProduct = pedido_produto.quantidade_produto * product.valor;

                const createdOrderProducts = await query.createOrderProducts(
                    order.id,
                    product.id,
                    pedido_produto.quantidade_produto,
                    totalPerProduct
                );

                await query.reduceProductQuantity(product.id, pedido_produto.quantidade_produto);

                return createdOrderProducts;
            }));

            const orderWithProducts = { pedido: order, pedido_produtos: orderProducts };

            const html = await htmlCompiler('./src/templates/orderConfirmation.html', {
                nomeUsuario: customer.nome,
                emailUsuario: customer.email,
                ruaUsuario: customer.rua,
                numeroUsuario: customer.numero,
                cepUsuario: customer.cep,
                bairroUsuario: customer.bairro,
                cidadeUsuario: customer.cidade,
                estadoUsuario: customer.estado,
                valorPedido: totalOrderValue / 100,
                idPedido: order.id,
            });

            await transport.sendMail({
                from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
                to: `${customer.nome} <${customer.email}>`,
                subject: `Confirmação de Compra - Pedido #${order.id}`,
                text: `Confirmação de Compra - Pedido #${order.id}`,
                html,
            });

            return res.status(201).json(orderWithProducts);
        } catch (error) {

            return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
        }
    }
}
