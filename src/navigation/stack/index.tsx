import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Welcome} from 'screens/Welcome';
import {SignIn} from 'screens/SignIn';
import {SignUp} from 'screens/SignUp';
// import Main from 'src/navigation/tab';
// import ForgotPassword from 'screens/ForgotPassword';
import {RootStackParamList} from 'src/navigation/types';

export function ScreenNavigation() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Sign Up" component={SignUp} />
      {/* <Stack.Screen name="Main" component={Main} /> */}
      {/* <Stack.Screen name="Forgot Password" component={ForgotPassword} /> */}
    </Stack.Navigator>
  );
}
