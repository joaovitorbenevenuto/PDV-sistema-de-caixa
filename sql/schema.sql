CREATE DATABASE pdv;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    cep VARCHAR(8),
    rua TEXT,
    numero TEXT,
    bairro TEXT,
    cidade TEXT,
    estado TEXT
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    quantidade_estoque INT NOT NULL,
    valor INTEGER NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    produto_imagem TEXT
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id),
    observacao TEXT,
    valor_total INTEGER NOT NULL
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER REFERENCES pedidos(id),
    produto_id INTEGER REFERENCES produtos(id),
    quantidade_produto INTEGER NOT NULL,
    valor_produto INTEGER NOT NULL
);