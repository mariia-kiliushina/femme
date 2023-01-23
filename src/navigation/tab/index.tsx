import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from 'screens/Home';
import {Settings} from 'screens/Settings';
import {COLORS} from 'src/constants/colors';
import {TabsParamList} from 'src/navigation/types';
import {Pressable, Text} from 'react-native';

export const Main = () => {
  const Tab = createBottomTabNavigator<TabsParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primaryDark,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Pressable>
              <Text>Icon</Text>
            </Pressable>
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: () => (
            <Pressable>
              <Text>Icon</Text>
            </Pressable>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
