import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ScreenNavigation} from './navigation/stack';
import {FC} from 'react';
import {AuthorizationContextProvider} from './components/AuthorizationContextProvider';
import {ApolloContextProvider} from './components/ApolloContextProvider';

const App: FC = () => {
  return (
    <AuthorizationContextProvider>
      <ApolloContextProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <ScreenNavigation />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloContextProvider>
    </AuthorizationContextProvider>
  );
};

export default App;
