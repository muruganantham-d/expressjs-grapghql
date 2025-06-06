import { gql } from 'apollo-server-express';

const userTypeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!, age: Int, role: String): User
    signInUser(email: String!, password: String!): AuthPayload
  }
`;

export default userTypeDefs;
