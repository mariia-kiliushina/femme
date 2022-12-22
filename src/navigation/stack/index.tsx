import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from 'screens/Welcome';
import {SignIn} from 'screens/SignIn';
import {SignUp} from 'screens/SignUp';
import {Profile} from 'screens/Profile';
// import Main from 'src/navigation/tab';
// import ForgotPassword from 'screens/ForgotPassword';
import {RootStackParamList} from 'src/navigation/types';
import {FC} from 'react';
import {useGetUserQuery} from 'src/api/users';

export const ScreenNavigation: FC = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const authorizedUserResponse = useGetUserQuery({variables: {id: 0}});

  const isNotAuthorized =
    authorizedUserResponse.error !== undefined &&
    authorizedUserResponse.error.graphQLErrors.some((error) => {
      // @ts-ignore
      return error.extensions?.response?.statusCode === 401;
    });
  const isAuthorized = !isNotAuthorized;

  console.log('isAuthorized >>', isAuthorized);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Welcome"
    >
      {isAuthorized ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Sign Up" component={SignUp} />
        </>
      )}
    </Stack.Navigator>
  );
};
