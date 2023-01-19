import {ReactNode} from 'react';
import {StyleSheet, Pressable, ViewStyle} from 'react-native';
import COLORS from 'src/constants/colors';

interface Props {
  type?: 'primary' | 'secondary' | 'disabled';
  onPress: () => void;
  style?: ViewStyle;
  children: ReactNode;
}

export const PressableOpacity = ({
  type = 'primary',
  onPress,
  children,
  style,
}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        pressed && styles.pressed,
        styles.pressableBasicStyle,
        opacityTypesStyles[type],
        style,
      ]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableBasicStyle: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  pressed: {
    opacity: 0.8,
  },
});

const opacityTypesStyles = StyleSheet.create({
  /*eslint-disable react-native/no-unused-styles */
  primary: {
    backgroundColor: COLORS.colorPrimary,
  },
  secondary: {
    backgroundColor: COLORS.colorSecondary,
  },
  disabled: {
    backgroundColor: COLORS.colorGreyscaleBackgroundGrey,
  },
  /*eslint-enable react-native/no-unused-styles */
});
