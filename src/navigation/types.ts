import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Welcome: undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
  Main: NavigatorScreenParams<TabsParamList>;
  'Forgot Password': undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type TabsParamList = {
  Home: undefined;
  Settings: undefined;
  Calendar: undefined;
};

export type TabScreenProps<T extends keyof TabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

//Instead of manually annotating these APIs, you can specify a global type for your
//root navigator which will be used as the default type.

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
