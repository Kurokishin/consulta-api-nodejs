# Avalização da sprint 2

# Sumário
* [`Conceitos iniciais`](#conceitos-iniciais)
* [`Objetivo`](#objetivo)
* [`Recursos  utilizados`](#recursos-utilizados)
* [`Considerações iniciais`](#considerações-iniciais)
* [`Desenvolvimento`](#desenvolvimento)
* [`Docker`](#docker)
* [`Conclusão`](#conclusão)

## Conceitos
* API
    * Conjunto de regras que definem como computadores ou aplicações se comunicam entre si

* Node.js
    * Permite com que JavaScript seja executado sem a utilização de um navegador, além de facilitar na integração de um back end

* Docker
    * Plataforma que garante a construção, *deploy*, execução e atualização de contêineres

---

## Objetivo
* Consumir uma API por meio de um front-end e utilizar um back-end com Node.js

---

## Recursos utilizados
* Obrigatório
    * [`API`](https://weatherstack.com)
    * [`Node.js`](https://nodejs.org/en/)
* Opcional
    * [`Docker`](https://www.docker.com/)
---
## Considerações iniciais
A API utilizada tem a função de mostrar a temperatura em uma determinada cidade.
- Para utilizá-la é necessário uma chave de acesso que será adicionada junto a URL. A mesma só é possível de ser obtida por meio da criação de uma conta em que informações básicas como email e senha são inseridos.
- O *endpoint* utilizado nesse projeto para realizar as requisições foi o *current* que garante a obtenção atual dos dados do clima.
---
## Desenvolvimento
1. Criação da pasta onde o projeto ficará armazenado. Como por exemplo **weather**

2. Na pasta criada, inicie o projeto com o Node.js e preencha o formulário inicial com o que desejas
```js
npm init
```
3. Utilize o comando abaixo para baixar as dependências necessárias contidas no arquivo *package.json*
```js
npm install
```
> **Express** facilita o processo de criar um servidor

> **Axios** faz requisições tanto 
para o cliente quanto para o servidor

> **Body-parser** _middleware_ que converte o corpo da requisição

4. Para executar o código basta utilizar no diretório do projeto a seguinte instrução:
```js
node app.js
```
### Explicação do código
**index.html**
* Responsável por receber o *input* do usuário numa barra de pesquisa e enviar a requisição pelo método POST para o servidor
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weatherstack</title>
</head>
<body>
    <form action="/" method="post">
        <p>Informe a cidade</p>
        <input name="cityName">
        <button type="submit">Send</button>
    </form>
</body>
</html>
```
**app.js**
* Recebe as requisições do front-end por meio do método GET e envia a resposta por meio de outro POST
* Por fim, define a porta em que todo o serviço funcionará
```js
const app = require('express')();
const bodyParser = require('body-parser');
const axios = require('axios');

// Middleware
app.use(bodyParser.urlencoded({extended: false}));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Consumindo API no console
// axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=Dallas`)
//     .then(response => {
//         const apiResponse = response.data;
//         console.log(`A temperatura atual no ${apiResponse.location.name} é ${apiResponse.current.temperature}℃`);
//     }).catch(error => {
//         console.log(error);
//     });

// Enviando resposta para a requisição
app.post('/', async function (req, res) {
    const url = 'http://api.weatherstack.com/current'
    const params = {
        access_key: '0f6571c8c8ecec500b6575eddd0b114f',
        query: req.body.cityName,
        units: 'm'
        };
    const {data} = await axios(url, {params});
    res.send(
        `<p>A temperatura atual no ${req.body.cityName} é ${data.current.temperature} ℃</p>
        <a href = '/'>Back</a>`
        );

});

// Porta
app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});
```
---
## Docker
Opcionalmente, é possível executar o código em um contêiner. Para tal basta seguir os seguintes passos:
1. Criar um arquivo **Dockerfile** contendo esta estrutura:
```Dockerfile
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
```
2. Adicionar o *start* no *package.json* para mostrar ao docker o que é necessário ser executado
```json
{
  "name": "weather",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Rafael",
  "license": "ISC",
  "dependencies": {
    "axios": "^1.2.1",
    "body-parser": "^1.20.1",
    "express": "^4.18.2"
  }
}
```
3. Construir a imagem
```
docker build -t img-api-nodejs .
```
> A opção **-t** tem a função de nomear a imagem e o **.** indica onde o **Dockerfile** está localizado, que nesse caso é o diretório atual.

- Para listar todas as imagens criadas basta rodar o comando (a imagem mais recente se localiza no topo):
```
docker images
```
4. Executar um contêiner com a imagem criada
```
docker run -dp 8000:4000 --name docker-api-nodejs img-api-nodejs
```
> Opções
> - -d = roda o contêiner em background
> - -p = especifica as portas do host:contêiner
---

## Conclusão
* Nessa avaliação eu fui capaz de aprender como consumir uma API por meio do Nodejs. As dificuldades que tive foram tanto técnicas, como dúvidas sobre algumas estruturas do JavaScript quanto abstratas (gestão de tempo e cansaço).
* Apesar da entrega atrasada, o processo para a construção desse projeto me ensinou que é preciso respeitar o corpo e descansar, pois independentemente do quão fácil uma tarefa possa parecer, a mesma se torna mais desafiadora com a mente cansada.
