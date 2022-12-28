import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  useReactiveVar,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {FC, PropsWithChildren} from 'react';
import {authorizationToken} from 'src/state';

const httpLink = createHttpLink({uri: 'http://localhost:3080/graphql'});

export const ApolloContextProvider: FC<PropsWithChildren> = ({children}) => {
  const authorizationLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: authorizationToken(),
      },
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authorizationLink.concat(httpLink),
  });

  const authorizationTokenValue = useReactiveVar(authorizationToken);

  console.log(
    'authorizationTokenValue inside ApolloContextProvider  >>',
    authorizationTokenValue,
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
