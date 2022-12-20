const {gql} = require("apollo-server-express");


// const typeDefs = gql`
//     type Query {
//         olaMundo: String!
//     }
// `;

let typeDefs = gql`
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

module.exports = {typeDefs}


// type User {
//     name: String!
//     age: Int!
//     married: Boolean!
// }

// type Query {
//     getAllUsers: [User!]!
// }