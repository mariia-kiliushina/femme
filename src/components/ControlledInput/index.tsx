import React, { JSXElementConstructor, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import Input from '../Input';
import { Ttype } from '../Input';

type Props = {
  control: Control<FieldValues, any> | undefined;
  name: string;
  type?: Ttype;
  placeholder: string;
  rules: {};
  style?: any;
};

const ControlledInput: FC<Props> = (props) => {
  const { name, control, placeholder, type = 'default', rules, style } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Input
            style={style}
            isError={error ? true : false}
            placeholder={placeholder}
            type={type}
            value={value ? value : ''}
            onBlur={onBlur}
            onChangeText={onChange}
          />
          {error && <Text style={styles.text}>{error.message || 'Error'}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    alignSelf: 'stretch',
  },
});

export default ControlledInput;
