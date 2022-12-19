import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { FC } from 'react';
import COLORS from 'src/constants/colors';

export type Ttype = 'password' | 'e-mail' | 'default';
type Props = {
  value?: string;
  onChangeText?: () => void;
  onBlur?: () => void;
  type?: Ttype;
  placeholder: string;
  isError?: boolean | undefined;
  style?: any;
};

const MyInput: FC<Props> = (props) => {
  const {
    style,
    placeholder,
    value,
    type = 'default',
    onChangeText,
    onBlur,
    isError = false,
  } = props;
  const getKeyboardType = (type: Ttype) => {
    switch (type) {
      case 'e-mail':
        return 'email-address';
        break;
      default:
        return 'default';
    }
  };

  return (
    <View style={[styles.bordered, style]}>
      <TextInput
        autoCapitalize="none"
        secureTextEntry={type === 'password'}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        style={[styles.input, isError ? styles.error : null]}
        placeholder={placeholder}
        keyboardType={getKeyboardType(type) || undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bordered: {
    borderBottomColor: COLORS.colorSupportingDarkBlue,
    borderBottomWidth: 1,
  },
  input: {
    margin: 0,
    height: 40,
    width: 250,
    padding: 10,
    backgroundColor: 'white',
    fontSize: 20,
  },
  error: {
    borderColor: COLORS.colorSupportingErrorred,
  },
});

export default MyInput;
