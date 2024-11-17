# Projeto API SD

## Descrição

Este projeto é uma API desenvolvida para a disciplina de Sistemas Distribuídos na UniRitter. A API permite a manipulação de dados através de endpoints RESTful.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `src/`: Contém o código-fonte da aplicação.
  - `controllers/`: Controladores que gerenciam as requisições e respostas.
  - `models/`: Modelos que representam as entidades do banco de dados.
  - `routes/`: Definição das rotas da API.
  - `services/`: Serviços que contêm a lógica de negócio.
  - `config/`: Configurações da aplicação, como conexão com o banco de dados.

## Instalação

Para instalar as dependências do projeto, execute:

```sh
npm install
```

## Requisitos Mínimos

- Node.js v14 ou superior
- NPM v6 ou superior
- MongoDB v4 ou superior

## Objetivo Acadêmico

Este projeto tem como objetivo aplicar os conceitos de sistemas distribuídos, como comunicação entre processos, tolerância a falhas e escalabilidade, em um cenário prático de desenvolvimento de uma API.

## Objetivo do Projeto

Desenvolvimento de uma API REST que suporte uma aplicação WEB/Mobile qualquer.

## Funcionalidades

- Autenticação de Usuário

  - Capacidade de autenticação simples de usuário (email/user/senha) - ` POST /api/users/login`

- Consulta de Dados:

  - Endpoint para consulta de dados em conjuntos - `GET /api/items`
  - Endpoint para consulta de item individual por seu atributo de identificação - `GET /api/items/:id`

- Manipulação de Dados:

  - Capacidade de gravação de um novo item no cadastro/BD - `POST /api/items`
  - Capacidade de alterar um item inteiro no cadastro/BD - `PUT /api/items/:id`

- Segurança:

  - Uso de alguma ferramenta de bloqueio de acesso aos endpoints API KEYS, TOKENS, ETC

- Banco de Dados:
- Uso de um sistema de banco de dados remoto ao servidor

## Endpoints da API

#### Autenticação de Usuários

- `POST /api/users/signup` - Cadastro de usuário
- `POST /api/users/login` - Login de usuário
- `POST /api/users/logout` - Logout de usuário
- `DELETE /api/users/delete` - Deletar conta de usuário

#### Manipulação de Itens

- `GET /api/items` - Obter todos os itens
- `GET /api/items/:id` - Obter item pelo ID
- `POST /api/items` - Criar novo item
- `PUT /api/items/:id` - Atualizar item
- `DELETE /api/items/:id` - Deletar item

## Configuração do Ambiente

1. Renomeie o arquivo .env.example para .env e preencha as variáveis de ambiente necessárias:

```
PORT=3000
DB_CONNECTION_STRING=<sua_string_de_conexão_com_o_banco_de_dados>
API_KEY=<sua_api_key>
```

2. Instale as dependências do projeto:

```
npm install
```

## Executando o Projeto

#### Localmente

Para executar o projeto localmente, utilize o comando:

```
npm start
```

A aplicação estará disponível em `http://localhost:3000`

#### Usando Docker

Para construir e executar o projeto usando Docker, utilize os seguintes comandos:

```
docker compose up --build
```

A aplicação estará disponível em `http://localhost:3000`

#### Usando Swagger

Para documentar a API usando Swagger, siga os passos abaixo:

1. Instale as dependências necessárias:

```
npm install swagger-jsdoc swagger-ui-express
```

2. Adicione a configuração do Swagger no seu projeto. Crie um arquivo `swagger.js` na pasta `config` com o seguinte conteúdo:

```js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API SD",
      version: "1.0.0",
      description: "Documentação da API SD",
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;
```

3. Adicione a rota do Swagger no seu arquivo principal (por exemplo, `index.js`):

```js
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
```

4. Acesse a documentação da API em `http://localhost:3000/api-docs`.

# O que falta fazer (Sugestão):

1. Segurança

- Falta: Implementar uma ferramenta de bloqueio de acesso aos endpoints, como API Keys ou Tokens.
  - Ação: Adicionar middleware de autenticação usando JWT (Json Web Tokens) ou outra forma de autenticação segura.

2. Documentação

- Falta: Documentação detalhada da API com exemplos de requisiç��es e respostas para cada endpoint.
  - Ação: Completar a documentação no [Readme.md](/README.md) e considerar o uso de ferramentas como Swagger para documentação automática.

3. Testes

- Falta: Implementar testes unitários e de integração.
  - Ação: Criar uma pasta `tests/` e adicionar testes para os controladores, serviços e rotas usando frameworks como Jest ou Mocha.

4. Validação e Tratamento de Erros

- Falta: Melhorar a validação de entrada e o tratamento de erros
  - Ação: Adicionar validações usando bibliotecas como Joi ou express-validator e grantir que todos os endpoints retornem mensagens de erro apropriadas.

5. Desempenho e Otimização

- Falta: Revisar e otimizar consultas ao banco de dados e lógica de negócio.

  - Ação: Analisar e otimizar as consultas no `taskModel.js`e `userModel.js` para melhorar o desempenho.

  - Renato (Ação Feita):

    - `taskModel.js`: Verificar mudanças antes de atualizar, e implementar paginação.

      - updateTask: Verificar se os dados realmente mudaram antes de atualizar.
      - getAllTasks: Paginação para evitar carregar todos os docs de uma vez.

    - `userModel.js`: Unificar a verificação de email para evitar consultas duplicadas.
      - emailExistsInAuth: Unificar verificação de email p evita consultas duplicadas.
      - emailExistsInFirestore: Unificar verificação de email p evitar consutlas duplicadas.

  6. Melhorias Adicionais

  - Falta: Funcionalidades adicionais como paginação, filtros de busca, e ordenação.
    - Ação: Implementar paginação nos endpoints de listagem de itens e adicionar filtros e ordenação conforme o necessário.
