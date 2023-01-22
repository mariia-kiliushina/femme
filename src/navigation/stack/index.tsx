import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from 'screens/Welcome';
import {SignIn} from 'screens/SignIn';
import {Main} from 'src/navigation/tab/index';
import {RootStackParamList} from 'src/navigation/types';
import {FC} from 'react';
import {useGetUserQuery} from 'src/api/users';
import {StyleSheet, Text, View} from 'react-native';
import {checkIsAuthorized} from '../../helpers/checkIsAuthorized';

export const ScreenNavigation: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const authorizedUserResponse = useGetUserQuery({variables: {id: 0}});

  if (authorizedUserResponse.loading) {
    return (
      <View style={styles.loader}>
        <Text>LOADING</Text>
      </View>
    );
  }

  const isAuthorized = checkIsAuthorized({
    authorizedUserResponse,
  });

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome"
    >
      {isAuthorized ? (
        <>
          <Stack.Screen name="Main" component={Main} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Sign In" component={SignIn} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  loader: {flex: 1, backgroundColor: 'blue'},
});
