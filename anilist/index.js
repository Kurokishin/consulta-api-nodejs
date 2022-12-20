const {ApolloServer} = require("apollo-server-express");
//const {typeDefs} = require("./Schema/TypeDefs");
//const {resolvers} = require("./Schema/Resolvers");
const express = require("express");
const { query } = require("express");
const app = express();
const {gql} = require("apollo-server-express");
const axios = require("axios");


let typeDefs = gql`
query { # Define which variables will be used in the query (id)
Media (search: "naruto", type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

let resolvers = {
    id: naruto
};

const server = new ApolloServer({typeDefs, resolvers});

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            typeDefs: typeDefs,
            resolvers: resolvers
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

async () => {
    await server.start();
    server.applyMiddleware({app});
};

app.get("/",(req,res) => res.send("Response from the GET request"));
app.listen({port: 4000}, () => {
    console.log(`Server running on localhost:4000${server.graphqlPath}`);
});