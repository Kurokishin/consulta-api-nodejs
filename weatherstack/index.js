const express = require("express");
const app = express();

fetch("http://api.weatherstack.com/current?access_key=0f6571c8c8ecec500b6575eddd0b114f&query=New York").then(res => res.json()).then(console.log)

app.get("/",(req,res) => res.send("Response from the GET request"));
app.listen({port: 4000}, () => {
    console.log("Server running on localhost:4000");
});