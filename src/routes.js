const routes = require('express').Router();

// Controladores
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const productController = require('./controllers/productController');
const customerController = require('./controllers/customerController');
const orderController = require('./controllers/orderController');

// Intermediadores
const userAuth = require('./middlewares/userAuth');
const validator = require('./middlewares/dataValidator');
const { multer } = require('./middlewares/multer');

// Schema
const schema = require('./validator/schema');

// Rotas
routes.post('/login', validator(schema.login), loginController.login);
routes.post('/usuario', validator(schema.user), userController.createUser);

routes.get('/categoria', categoryController.getCategories);

routes.use(userAuth); // Autenticação JWT

routes.get('/usuario', userController.getUser);
routes.put('/usuario', validator(schema.user), userController.updateUser);

routes.get('/produto', productController.getProducts);
routes.get('/produto/:id', productController.getProduct);
routes.post('/produto', multer.single('produto_imagem'), validator(schema.product), productController.createProduct);
routes.put('/produto/:id', multer.single('produto_imagem'), validator(schema.product), productController.updateProduct);
routes.delete('/produto/:id', productController.deleteProduct);

routes.get('/cliente', customerController.getCustomers);
routes.get('/cliente/:id', customerController.getCustomer);
routes.post('/cliente', validator(schema.customer), customerController.createCustomer);
routes.put('/cliente/:id', validator(schema.customer), customerController.updateCustomer);

routes.get('/pedido', orderController.getOrders);
routes.post('/pedido', validator(schema.order), orderController.createOrder);

module.exports = routes;
