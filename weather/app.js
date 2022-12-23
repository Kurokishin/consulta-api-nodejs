const express = require('express');
const app = express();
//const router = express.Router();
const bodyParser = require('body-parser');
const axios = require('axios');

const url = 'http://api.weatherstack.com/current?'

const access_key= '0f6571c8c8ecec500b6575eddd0b114f'
//query: 'New York'
const units= 'm'

// let params = new URLSearchParams({
//     access_key: '0f6571c8c8ecec500b6575eddd0b114f',
//     query: 'New York',
//     units: 'm'
// });

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', async function (req, res) {
    const{response} = await axios(`https://api.weatherstack.com/current?${access_key}/${req.body.entrada}/${units}`)
    res.send(`<p>Current temperature in ${req.body.entrada} is ${response.current.temperature}℃</p>`)
    // .then(response => {
    //   const apiResponse = response.data;
    //   res.send(`<p>Current temperature in ${req.body.apiResponse.location.name} is ${data.apiResponse.current.temperature}℃</p>`);
    // }).catch(error => {
    //   console.log(error)
    // })
})

// router.get('/', (req, res) => {
//     res.send(`<h1>Hello, the temperature is ${url, params}`)
// }) 
// fetch(`http://api.weatherstack.com/current?${params}`)
// .then(res => res.json()).then(console.log);

app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});

// axios.get('https://api.weatherstack.com/current?', {params})
//   .then(response => {
//     const apiResponse = response.data;
//     console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
//   }).catch(error => {
//     console.log(error);
//   });