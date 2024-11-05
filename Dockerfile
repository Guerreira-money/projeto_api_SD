# Usa uma imagem Node.js
FROM node:22.11.0-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --omit=dev

# Copia o diretório `src` para dentro do contêiner
COPY src/ /app/src

# Expõe a porta do servidor
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]
