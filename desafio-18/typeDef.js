import { gql } from "apollo-server-express"

const typeDefs = gql`
  type Users {
    id: ID,
    username: String,
    email: String,
    password: String
  }
  type Query {
    getAllUsers: [Users]
    getUserById(id: ID): Users
  }
  type Mutation{
    createUser(username:String, email:String, password:String): Users
    deleteUser(id: ID): Users
  }
`

export default typeDefs