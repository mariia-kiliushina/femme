import {useTranslation} from 'react-i18next';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from 'screens/Home';
import {Profile} from 'screens/Profile';
import {COLORS} from 'constants/colors';
import {TabsParamList} from 'src/navigation/types';
import {CalendarIcon, ProfileIcon} from 'assets/svg';

export const Main = () => {
  const Tab = createBottomTabNavigator<TabsParamList>();
  const {t} = useTranslation();

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
          tabBarLabel: t('calendar') || undefined,
          tabBarIcon: ({focused}) => (
            <CalendarIcon
              color={focused ? COLORS.primary : COLORS.greyscaleContent}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: t('profile') || undefined,
          tabBarIcon: ({focused}) => (
            <ProfileIcon
              color={focused ? COLORS.primary : COLORS.greyscaleContent}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
