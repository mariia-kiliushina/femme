import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from 'screens/Profile';
import {PressableOpacity} from 'components/PressableOpacity';
import {COLORS} from 'constants/colors';
import {TabsParamList} from 'src/navigation/types';
import {Home, FemaleUser} from 'assets/svg';

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
            <PressableOpacity>
              <Home color={COLORS.greyscaleContent} />
            </PressableOpacity>
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <PressableOpacity>
              <FemaleUser color={COLORS.greyscaleContent} />
            </PressableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
