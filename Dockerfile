FROM node:22.11.0-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar dependências
COPY package*.json ./ 

# Instala as dependências do projeto
RUN npm install --omit=dev

# Copia todo o código para o contêiner
COPY ./src /app/src

# Expõe a porta padrão do servidor 
EXPOSE 3000

# Define o comando para iniciar o serviço, com a possibilidade de personalizar o script a partir do docker-compose.yml
CMD ["node", "src/index.js"]
