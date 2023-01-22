import {ViewStyle} from 'react-native';
import {FC} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Input} from '../Inputs';

type Props = {
  control: Control<any, any>;
  name: string;
  placeholder: string;
  rules: {};
  style?: ViewStyle;
};

const ControlledInput: FC<Props> = (props) => {
  const {name, control, placeholder, rules, style} = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <Input
          style={style}
          placeholder={placeholder}
          value={value ? value : ''}
          onBlur={onBlur}
          onChange={onChange}
          errorText={error?.message}
        />
      )}
    />
  );
};

export default ControlledInput;
