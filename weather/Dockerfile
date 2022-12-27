# Representa o nome da imagem e a sua versão
FROM node:latest

# Contém o diretório do software no contêiner
WORKDIR /app

# Copia os arquivos do 'package.json' para o diretório do aplicativo '/app'
COPY package.json /app

# Executa o comando informado para instalar as dependências informadas no package.json
RUN npm install

# Copia os arquivos restante para o diretório mencionado do contêiner
COPY . /app

# Script para executar o aplicativo
CMD ["npm", "start"]