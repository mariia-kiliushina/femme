import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ScreenNavigation} from './navigation/stack';
import {FC, useEffect} from 'react';
import {ApolloContextProvider} from './ApolloContextProvider';
import {authorizationToken} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import 'components/Calendar/config';
import 'src/translation/i18n';

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
