# PDV Frente de Caixa



## Sobre o projeto

Seja bem vindo ao sistema de ponto de venda (PDV)

Um sistema de PDV (Ponto de Venda) é uma ferramenta de software essencial para estabelecimentos comerciais. Ele permite o registro de vendas, aceita diferentes formas de pagamento, emite recibos e gerencia o estoque. Além disso, fornece relatórios detalhados de vendas e pode se integrar a outras ferramentas de negócios.

## Uso básico
API funciona na URL: http://localhost:3000 ou no link Backend. Antes de iniciar é necessário fazer o clone do repositório, baixar as dependências e por fim configurar um arquivo .env no diretorio raiz do projeto conforme o exemplo abaixo, ou pde usar a insomnia para testar os endpoint pelo link https://pdv-26iz.onrender.com

git clone https://github.com/exemplo-backend/exemplo-backend-git

npm install ou npm i - Para baixar todas as dependências

PORT=

DB_HOST= 

DB_PORT=

DB_USER=

DB_PASS=

DB_NAME=

JWT_PASS=

## após a confiiguração basta apenas chamar as seguintes rotas:

GET /categoria - Lista todos as categorias

POST /usuario - Cadastra um novo usuário

POST /login - Login com email e senha

PUT /usuario - Atualiza o perfil do usuário

POST /produto - Cadastra um novo produto

PUT /produto/:id - Atualiza dados do produto

GET /produto - Lista todos os produtos

GET /produto/:id - Detalha um produto

DELETE /produto/:id - Exclui um produto

POST /cliente - Cadastra um novo cliente

PUT /cliente/:id - Atualiza dados do cliente

GET /cliente - Lista todos os clientes

GET /cliente/:id - Detalha um cliente

As rotas de cadastrar e atualizar produto permitem o upload de imagens do produto, através de login na plataforma Blackblaze.
 
## Tecnologias usadas
<ul><li>node</li>
<li>Express</li>

<li>nodemon</li>

<li>crypt</li>

<li>insomnia</li>

<li>dotenv</li>

<li>joi</li>

<li>jsonwebtoken</li>

<li>knex</li>

<li>pg</li>

<li>javascript</li></ul>

## Testes
Postman ou Insomnia

## Video
<a href=https://clipchamp.com/watch/Mk9FTG24WYd>Veja testes dos endponits</a>
