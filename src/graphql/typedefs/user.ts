import { gql } from "@apollo/client";

const typeDefs = gql`
  type User {
    id: String
    name: String
    username: String
    image: String
  }

  type Query {
    searchUsers(username: String): [User]
  }

  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`;

export default typeDefs;
