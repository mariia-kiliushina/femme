import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { FC } from 'react';
import COLORS from 'src/constants/colors';
import arrow_primary from 'src/assets/arrow-primary.png';

type Props = {
  type?: 'primary' | 'secondary' | 'disabled' | 'danger' | 'outlined' | 'flat';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
  style?: any;
};

export const GoBackButton: FC<Props> = (props) => {
  const { style, onPress, type = 'primary', size = 'medium' } = props;
  const { defaultButton, primary, secondary, disabled, danger, outlined, flat } = buttonStyles;
  const { small, medium, large, whiteText, blueText, disabledText } = textStyles;
  const customTypeStyle = (type: string) => {
    switch (type) {
      case 'primary':
        return primary;
        break;
      case 'secondary':
        return secondary;
        break;
      case 'disabled':
        return disabled;
        break;
      case 'danger':
        return danger;
        break;
      case 'outlined':
        return outlined;
        break;
      case 'flat':
        return flat;
        break;
      default:
        return primary;
    }
  };
  const customSizeStyle = (size: string) => {
    switch (size) {
      case 'small':
        return small;
        break;
      case 'medium':
        return medium;
        break;
      case 'large':
        return large;
        break;
      default:
        return primary;
    }
  };
  const customTextColorStyle = (type: string) => {
    const whiteColorList = ['primary', 'secondary', 'danger'];
    if (whiteColorList.includes(type)) return whiteText;
    if (type === 'disabled') return disabledText;
    return blueText;
  };
  const combinedViewStyles = StyleSheet.flatten([defaultButton, customTypeStyle(type)]);

  return (
    <View style={[viewStyles.container, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={combinedViewStyles}>
          <Image source={arrow_primary} style={{ height: 30, width: 30 }}></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const viewStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

const buttonStyles = StyleSheet.create({
  defaultButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    cursor: 'pointer',
    height: 40,
    width: 70,
  },
  primary: {
    backgroundColor: COLORS.colorPrimary,
  },
  secondary: {
    backgroundColor: COLORS.colorSecondary,
  },
  disabled: {
    backgroundColor: COLORS.colorGreyscaleBackgroundGrey,
  },
  danger: {
    backgroundColor: COLORS.colorSupportingErrorred,
  },
  outlined: {
    backgroundColor: COLORS.colorGreyscaleWhite,
    border: `2px solid ${COLORS.colorPrimary}`,
  },
  flat: {
    backgroundColor: COLORS.colorGreyscaleWhite,
  },
});

const textStyles = StyleSheet.create({
  whiteText: {
    color: 'white',
  },
  blueText: {
    color: COLORS.colorPrimary,
  },
  disabledText: {
    color: COLORS.colorGreyscaleSecondaryGrey,
  },
  small: {
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  large: {
    fontSize: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});
