import {FC, PropsWithChildren} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {authorizationToken} from 'src/state';
import {Platform} from 'react-native';

const PROD_HOST = 'https://women-health-server.onrender.com/graphql';

const DEV_HOST =
  Platform.OS === 'ios'
    ? 'http://localhost:3080/graphql'
    : 'http://192.168.100.2:3080/graphql';

const Host = __DEV__ ? DEV_HOST : PROD_HOST;

const httpLink = createHttpLink({uri: Host});

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

  // const authorizationTokenValue = useReactiveVar(authorizationToken);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
