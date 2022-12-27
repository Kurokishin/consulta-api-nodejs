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
//         console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
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