import {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Typography} from 'components/Typography';
import {PressableOpacity} from 'components/PressableOpacity';
import {VisibilityOn, VisibilityOff, IconsType} from 'assets/svg';
import {COLORS} from 'constants/colors';
import {LAYOUT} from 'constants/layout';

const INPUT_HORIZONTAL_PADDING = 12;
const INPUT_VERTICAL_PADDING = 5;

const icons: IconsType = {
  visibilityOn: VisibilityOn,
  visibilityOff: VisibilityOff,
};

export type TInputProps = TextInputProps & {
  label?: string;
  errorText?: string | undefined;
  onPress?: () => void;
  iconName?: string;
  onIconPress?: () => void;
  iconColor?: string;
  editable?: boolean;
};

export const Input = ({
  label,
  errorText,
  editable = true,
  style,
  onIconPress,
  iconName,
  iconColor,
  ...props
}: TInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    isFocused && styles.focused,
    editable && Boolean(errorText) && styles.error,
    !editable && styles.disabled,
    style,
  ]);

  const Icon = iconName ? icons[iconName] : null;

  const renderIcon = () => {
    if (Icon) {
      if (onIconPress) {
        return (
          <PressableOpacity style={styles.iconWrapper} onPress={onIconPress}>
            <Icon
              color={iconColor}
              width={LAYOUT.iconSize}
              height={LAYOUT.iconSize}
            />
          </PressableOpacity>
        );
      } else {
        return (
          <View style={styles.iconWrapper}>
            <Icon
              color={iconColor}
              width={LAYOUT.iconSize}
              height={LAYOUT.iconSize}
            />
          </View>
        );
      }
    }
  };
  return (
    <View>
      {label && (
        <Typography color={COLORS.greyscaleContent} textStyle={styles.label}>
          {label}
        </Typography>
      )}
      <View style={styles.wrapper}>
        <>
          <TextInput
            autoCapitalize="none"
            style={flattenStyle}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            {...props}
          />
          {renderIcon()}
        </>
      </View>
      <Typography textStyle={styles.errorText}>
        {editable && errorText}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  textInput: {
    height: 52,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.greyscaleSecondaryGrey,
    paddingLeft: INPUT_HORIZONTAL_PADDING,
    paddingRight: INPUT_HORIZONTAL_PADDING + LAYOUT.iconSize,
    paddingVertical: INPUT_VERTICAL_PADDING,
    backgroundColor: COLORS.greyscaleWhite,
  },
  focused: {
    borderColor: COLORS.supportingErrorred,
  },
  label: {
    marginVertical: 8,
  },
  error: {
    borderColor: COLORS.supportingErrorred,
  },
  disabled: {
    borderColor: COLORS.greyscaleSecondaryGrey,
  },
  errorText: {
    height: 20,
    color: COLORS.supportingErrorred,
    marginTop: 8,
  },
  iconWrapper: {
    height: '100%',
    position: 'absolute',
    right: INPUT_HORIZONTAL_PADDING,
    justifyContent: 'center',
  },
});
