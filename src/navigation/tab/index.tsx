import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from 'screens/Home';
import {Profile} from 'screens/Profile';
import {COLORS} from 'constants/colors';
import {TabsParamList} from 'src/navigation/types';
import {HomeIcon, FemaleUser} from 'assets/svg';

export const Main = () => {
  const Tab = createBottomTabNavigator<TabsParamList>();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <HomeIcon
              color={focused ? COLORS.primary : COLORS.greyscaleContent}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <FemaleUser
              color={focused ? COLORS.primary : COLORS.greyscaleContent}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
