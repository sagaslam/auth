/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { GraphQLError } from 'graphql';

const users = [
  {
    id: '1',
    username: 'uitest1@mitigatecyber.com',
    userid: 'DL',
    email: 'uitest1@mitigatecyber.com',
    mfaStatus: false,
    password: 'password1',
  },
  {
    id: '2',
    username: 'uitest2@mitigatecyber.com',
    userid: 'FL',
    email: 'uitest2@mitigatecyber.com',
    mfaStatus: true,
    code: 1234,
    password: 'password2',
  },
];

const resolvers = {
  Query: {
    getAllUsers: () => users,
    getUser: (_, { username }, context) => {
      console.log(username);
      const userFound = users.find((user) => user.username === username);

      if (userFound) {
        context.session.update(userFound);
        //console.log('user returned ' + userFound);
        return userFound;
      }
    },
    getLoggedInUser: (_, __, context) => {
      //console.log('logged in user' + context.session.retrieveFromToken());
      const sess = context.session.retrieveFromToken();
      console.log(sess);
      //const { userid, iat } = context.session.retrieveFromToken();
      //console.log(userid, iat);
      //return userid;

      const userid = 'DL';
      return {
        id: userid,
        lastLogin: 'Date(iat)',
        username: users.find((user) => user.userid === userid).username,
        email: users.find((user) => user.userid === userid).email,
      };

      //return JSON.stringify(context.session.retrieveFromToken());
    },
  },

  Mutation: {
    UserAuth: (obj, { username, password, code }, context) => {
      console.log(username, password, code);
      const usermatched = users.find(
        (user) => user.password === password && user.username === username
      );

      // console.log('matched user' + usermatched);

      if (usermatched) {
        if ((code !== null && usermatched.code === code) || code === null) {
          const sessionToken = context.session.update(usermatched);

          return {
            token: sessionToken,
            payload: {
              exp: Date.now() + 2 * (60 * 60 * 1000), // expires 2hrs
              origIat: Date.now(),
              username,
            },
            refreshExpiresIn: Date.now() + 168 * (60 * 60 * 1000), // expires in 1 week
          };
        }
      }

      console.log('no match');
      throw new GraphQLError('Please enter valid credentials', {
        extensions: {
          code: 'USER_NOT_FOUND',
        },
      });
    },
  },
};

// const USER_AUTH = gql`
// mutation UserAuth($username: String!, $password: String!, $code: String) {
//   userAuth(username: $username, password: $password, code: $code) {
//     token
//     payload
//     refreshExpiresIn
//   }
// }

export default resolvers;
