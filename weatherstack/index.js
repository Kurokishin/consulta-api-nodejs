const axios = require("axios");
const express = require("express");
const app = express();

//let apiKey = "0f6571c8c8ecec500b6575eddd0b114f";
//const url = "http://api.weatherstack.com/current?access_key=" + apiKey + "&query=New York",
const url = "http://api.weatherstack.com/current";

const params = {
    apiKey: "0f6571c8c8ecec500b6575eddd0b114f",
    query: "New York"
}
    // options = {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({

    //     })
    // };

//fetch(url, options).then(res => res.json()).then(console.log)
axios.get(url, {params})
.then(response => {
    const apiResponse = response.data;
    console.log("A temperatura atual em " + apiResponse.location.name+ " is " + apiResponse.current.temperature + "ºC");
}).catch(error => {
    console.log(error);
})

app.get("/",(req,res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});