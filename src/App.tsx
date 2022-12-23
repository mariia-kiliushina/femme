import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from 'src/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ScreenNavigation} from './navigation/stack';
import {FC} from 'react';
import {AuthorizationContextProvider} from './components/AuthorizationContextProvider';
import {ApolloContextProvider} from './components/ApolloContextProvider';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AuthorizationContextProvider>
        <ApolloContextProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <ScreenNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApolloContextProvider>
      </AuthorizationContextProvider>
    </Provider>
  );
};

export default App;
