require('dotenv').config();
const { multerError } = require('./middlewares/multer');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(multerError);

app.listen(3000, () => console.log('Server is running...'));
