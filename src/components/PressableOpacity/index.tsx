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
      style={({pressed}) => [
        pressed && styles.pressed,
        styles.pressableBasicStyle,
        style,
      ]}
      {...restProps}
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
