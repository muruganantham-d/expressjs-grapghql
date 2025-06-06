import { gql } from 'apollo-server-express';

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type Query {
    getProducts: [Product]
    getProduct(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, price: Float!, stock: Int!): Product
    updateProduct(id: ID!, name: String, price: Float, stock: Int): Product
    deleteProduct(id: ID!): String
  }
`;

export default productTypeDefs;
