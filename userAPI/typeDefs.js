import { GraphQLTimestamp } from 'graphql-scalars';
import { GraphQLJWT } from 'graphql-scalars';
const typeDefs = `
  scalar GraphQLTimestamp
  scalar GraphQLJWT

  type user {
    username: String
    userid : String
    email: String
    mfaStatus : Boolean
  }

  type payload {
    username : String
    exp : GraphQLTimestamp
    origIat : GraphQLTimestamp
  }

  type ObtainJSONWebToken {
    token : GraphQLJWT
    payload : payload
    refreshExpiresIn : GraphQLTimestamp
  }

  type loggedInUser {
    id: String,
    lastLogin: String
    username: String
    email: String
  }



  type Query {
    getAllUsers: [user]
    getUser(username: String): user
    getLoggedInUser: loggedInUser
  }

  type Mutation {
    UserAuth(username: String!, password: String!, code:Int): ObtainJSONWebToken
  }
`;

export default typeDefs;
