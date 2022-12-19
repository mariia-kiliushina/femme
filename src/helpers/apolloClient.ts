import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

// if (
//   process.env.MODE !== 'development' &&
//   process.env.MODE !== 'production' &&
//   process.env.MODE !== 'test'
// ) {
//   throw new Error(`
//     process.env.MODE has invalid value.
//     Allowed values: ["development", "production", "test"].
//     Received: ${process.env.MODE}.
//   `);
// }

// const httpLinkUriByMode = {
//   development: '/graphql',
//   production: 'https://personal-application-api.herokuapp.com/graphql',
//   test: '/graphql',
// };

const httpLink = createHttpLink({
  // uri: httpLinkUriByMode[process.env.MODE],
  uri: 'http://localhost:3080/graphql',
});

const authorizationLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huLWRvZSIsImlhdCI6MTY3MDAxMjY1MywiZXhwIjoxNjcwODc2NjUzfQ.8nvGt6Cz12YdbIoFr0pmkRqoMB362hZ7JUqiYUSAZ34',
    },
  };
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authorizationLink.concat(httpLink),
});
