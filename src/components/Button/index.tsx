import {StyleSheet, ViewStyle} from 'react-native';
import {COLORS} from 'src/constants/colors';
import {LAYOUT} from 'src/constants/layout';
import {PressableOpacity} from 'components/PressableOpacity';
import {Typography} from 'components/Typography';

interface Props {
  type?: 'primary' | 'secondary' | 'outlined';
  disabled?: boolean;
  style?: ViewStyle;
  title: string;
  onPress: any;
}

export const Button = ({
  style,
  title,
  disabled = false,
  type = 'primary',
  onPress,
}: Props) => {
  const buttonStyle = disabled ? styles[`${type}Disabled`] : styles[type];

  const textStyle = disabled
    ? styles[`${type}TextDisabled`]
    : styles[`${type}Text`];

  return (
    <PressableOpacity
      style={[styles.button, buttonStyle, style]}
      onPress={onPress}
    >
      {title && (
        <Typography weight="bold" textStyle={textStyle}>
          {title}
        </Typography>
      )}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: LAYOUT.borderRadius,
    maxHeight: 50,
    padding: 10,
    marginBottom: 10,
    flex: 1,
  },
  /*eslint-disable react-native/no-unused-styles */
  primary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  outlined: {
    backgroundColor: COLORS.greyscaleWhite,
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },
  primaryText: {
    color: COLORS.greyscaleWhite,
  },
  primaryTextDisabled: {
    color: COLORS.greyscaleLineGrey,
  },
  outlinedText: {
    color: COLORS.secondary,
  },
  secondaryText: {
    color: COLORS.greyscaleWhite,
  },
  secondaryTextDisabled: {
    color: COLORS.greyscaleLineGrey,
  },
  outlinedTextDisabled: {
    color: COLORS.greyscaleLineGrey,
  },
  primaryDisabled: {
    backgroundColor: COLORS.greyscaleBackgroundGrey,
  },
  secondaryDisabled: {
    backgroundColor: COLORS.greyscaleBackgroundGrey,
  },
  outlinedDisabled: {
    borderColor: COLORS.greyscaleBackgroundGrey,
    borderWidth: 2,
  },
  /*eslint-enable react-native/no-unused-styles */
});
