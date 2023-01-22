import {StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {LAYOUT} from 'src/constants/layout';
import {PressableOpacity} from 'components/PressableOpacity';
import {Typography} from 'components/Typography';

interface Props {
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  title: string;
}

export const Button = ({style, title, onPress, type = 'primary'}: Props) => {
  return (
    <PressableOpacity
      style={[styles.button, styles[type], style]}
      onPress={onPress}
    >
      {title && (
        <Typography color={COLORS.colorGreyscaleWhite}>{title}</Typography>
      )}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: LAYOUT.borderRadius,
    height: 50,
    padding: 10,
  },
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
