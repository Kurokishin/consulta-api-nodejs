const app = require('express')();
// const express = require('express');
// const app = express();
//const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

//const url = 'http://api.weatherstack.com/current?'

// let params = new URLSearchParams({
//     access_key: '0f6571c8c8ecec500b6575eddd0b114f',
//     query: 'New York',
//     units: 'm'
// });

app.use(bodyParser.urlencoded({extended: false}));

// const params = {
//     access_key: '0f6571c8c8ecec500b6575eddd0b114f',
//     query: 'Crato',
//     units: 'm',
// }

const access_key = '0f6571c8c8ecec500b6575eddd0b114f'
// query: 'Crato',
// units: 'm',

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
//https://api.weatherstack.com/current/0f6571c8c8ecec500b6575eddd0b114f/${req.body.entrada}

// axios.get(`http://api.weatherstack.com/current?access_key=${access_key}&query=Dallas`)
//     .then(response => {
//         const apiResponse = response.data;
//         console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//     }).catch(error => {
//         console.log(error);
//     });

// app.post('/', (req, res) => {
//     getRequest()
//     res.send(`<p>Current temperature in ${req.body.entrada} is ${response.current.temperature} ℃</p>
//             <a href = '/'>Voltar</a>`)

// });

app.post('/', async function (req, res) {
    const {data} = await axios(
        `http://api.weatherstack.com/forecast?access_key=${access_key}&query=${req.body.cityName}`
        );
    res.send(
        `<p>Current temperature in ${req.body.cityName} is ${data.current.temperature} ℃</p><a href = '/'>Back</a>`
        );

});

// router.get('/', (req, res) => {
//     res.send(`<h1>Hello, the temperature is ${url, params}`)
// }) 
// fetch(`http://api.weatherstack.com/current?${params}`)
// .then(res => res.json()).then(console.log);

// axios.get('http://api.weatherstack.com/current', {params})
//   .then(response => {
//     const apiResponse = response.data;
//     console.log(`A temperatura atual do ${apiResponse.location.name} é ${apiResponse.current.temperature}℃`);
//   }).catch(error => {
//     console.log(error);
//   });

// app.post('/', (req, res) => {
//     .then(response => {
//         const apiResponse = response.data;
//         res.send(`<p>Current temperature in ${req.body.entrada} is ${apiResponse.current.temperature} ℃</p>`)    
//     })
// });

app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});