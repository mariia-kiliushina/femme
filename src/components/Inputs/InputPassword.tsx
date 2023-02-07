import {useState} from 'react';
import {COLORS} from 'constants/colors';
import {Input, TInputProps} from './Input';

export const InputPassword = ({...props}: TInputProps) => {
  const [visible, setIsVisible] = useState(false);

  const toggleisibiity = () => {
    setIsVisible((prev) => !prev);
  };
  const iconName = visible ? 'visibilityOn' : 'visibilityOff';

  return (
    <Input
      autoCapitalize="none"
      iconName={iconName}
      onIconPress={toggleisibiity}
      onBlur={toggleisibiity}
      iconColor={COLORS.greyscaleContent}
      secureTextEntry={!visible}
      {...props}
    />
  );
};
