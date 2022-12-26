const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.urlencoded({extended: false}));

const params = {
    access_key: '0f6571c8c8ecec500b6575eddd0b114f',
    query: 'Crato',
    units: 'm',
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

axios.get('http://api.weatherstack.com/current?', {params})
  .then(response => {
    const apiResponse = response.data;
    console.log(`A temperatura atual do ${apiResponse.location.name} é ${apiResponse.current.temperature}℃`);
    axios.post('/', {
        apiResponse: apiResponse
    })
  }).catch(error => {
    console.log(error);
  });

app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});