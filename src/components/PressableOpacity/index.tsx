import {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  ViewStyle,
  StyleProp,
  PressableProps,
} from 'react-native';

interface Props extends PressableProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const PressableOpacity = ({children, style, ...restProps}: Props) => {
  return (
    <Pressable
      style={({pressed}) => [pressed && styles.pressed, style]}
      {...restProps}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
});
