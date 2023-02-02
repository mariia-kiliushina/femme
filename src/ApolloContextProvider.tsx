import {FC, PropsWithChildren} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  useReactiveVar,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {authorizationToken} from 'src/state';
import {Platform} from 'react-native';

const ANDROID_DEV_HOST = '192.168.100.4';
const PROD_HOST = 'https://women-health-server.onrender.com/graphql';

const DEV_HOST = Platform.OS === 'ios' ? 'localhost' : ANDROID_DEV_HOST;
const Host = __DEV__ ? DEV_HOST : PROD_HOST;

const httpLink = createHttpLink({uri: `http://${Host}:3080/graphql`});

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
