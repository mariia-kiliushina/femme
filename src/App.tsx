import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ScreenNavigation} from './navigation/stack';
import {FC, useEffect} from 'react';
import {ApolloContextProvider} from './components/ApolloContextProvider';
import {authorizationToken} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';

const App: FC = () => {
  useEffect(() => {
    EncryptedStorage.getItem('authorizationToken').then(
      (authorizationTokenFromStorage) => {
        if (authorizationTokenFromStorage === null) {
          return;
        }
        authorizationToken(authorizationTokenFromStorage);
      },
    );
  }, []);
  return (
    <ApolloContextProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <ScreenNavigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloContextProvider>
  );
};

export default App;
