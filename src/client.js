import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const link = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include',
});

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: localStorage.getItem('token') ? `Bearer ${token}` : '',
//     },
//   };
// });

const client = new ApolloClient({
  //link: authLink.concat(link),
  link: link,
  cache: new InMemoryCache(),
});

export default client;
