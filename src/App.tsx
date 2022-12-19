import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from 'src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './helpers/apolloClient';
import {ScreenNavigation} from './navigation/stack';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <NavigationContainer>
            <ScreenNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  );
}
