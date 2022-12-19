import { StyleSheet, ImageSourcePropType, Pressable, Text, Image, View } from 'react-native';
import React, { FC } from 'react';
import COLORS from 'src/constants/colors';

type Props = {
  type?: 'primary' | 'secondary' | 'disabled' | 'danger' | 'outlined' | 'flat';
  size?: keyof typeof textStyles;
  title?: string;
  onPress: () => void;
  style?: any;
  imageSrc?: ImageSourcePropType;
  imageStyle?: any;
};

const MyButton: FC<Props> = (props) => {
  const { style, imageStyle, title, imageSrc, onPress, type = 'primary', size = 'medium' } = props;
  const { defaultButton, primary, secondary, disabled, danger, outlined, flat } = buttonStyles;
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

  // const customTextColorStyle = (type: string) => {
  //   const whiteColorList = ['primary', 'secondary', 'danger'];
  //   if (whiteColorList.includes(type)) return whiteText;
  //   if (type === 'disabled') return disabledText;
  //   return blueText;
  // };
  const combinedViewStyles = StyleSheet.flatten([defaultButton, customTypeStyle(type)]);

  return (
    <View style={[viewStyles.container, style]}>
      <Pressable onPress={onPress}>
        <View style={[combinedViewStyles, style]}>
          {title && <Text style={{}}>{title}</Text>}
          {imageSrc && <Image source={imageSrc} style={imageStyle} />}
        </View>
      </Pressable>
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
    fontWeight: 500,
    height: 50,
    width: 200,
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
  // whiteText: {
  //   color: 'white',
  // },
  // blueText: {
  //   color: COLORS.colorPrimary,
  // },
  // disabledText: {
  //   color: COLORS.colorGreyscaleSecondaryGrey,
  // },
  14: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  18: {
    fontSize: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  22: {
    fontSize: 22,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});

export default MyButton;
