import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {FC, PropsWithChildren, useContext} from 'react';
import {authorizationContext} from './AuthorizationContextProvider';

const httpLink = createHttpLink({uri: 'http://localhost:3080/graphql'});

export const ApolloContextProvider: FC<PropsWithChildren> = ({children}) => {
  const {authorizationToken} = useContext(authorizationContext);

  const authorizationLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: authorizationToken,
      },
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authorizationLink.concat(httpLink),
  });

  console.log(
    'authorizationToken inside ApolloContextProvider  >>',
    authorizationToken,
  );

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
