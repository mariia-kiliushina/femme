import {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Typography} from 'src/components/Typography';
import {COLORS} from 'src/constants/colors';

const INPUT_PADDING = 12;

export interface InputProps extends TextInputProps {
  label?: string;
  errorText?: string | undefined;
  onPress?: () => void;
}

export const Input = ({
  label,
  errorText,
  editable = true,
  style,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const flattenStyle = StyleSheet.flatten([
    styles.textInput,
    isFocused && styles.focused,
    editable && Boolean(errorText) && styles.error,
    !editable && styles.disabled,
    style,
  ]);

  return (
    <View>
      {label && (
        <Typography color={COLORS.greyscaleContent} textStyle={styles.label}>
          {label}
        </Typography>
      )}
      <View style={styles.wrapper}>
        <TextInput
          style={flattenStyle}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
        />
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
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: COLORS.greyscaleContent,
    paddingHorizontal: INPUT_PADDING,
    paddingVertical: 5,
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
});
