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
