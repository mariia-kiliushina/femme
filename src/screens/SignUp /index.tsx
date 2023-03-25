import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from 'components/Button';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {RootStackScreenProps} from 'src/navigation/types';
import {yupResolver} from '@hookform/resolvers/yup';
import {signUpSchema} from 'src/validation';
import {useCreateUserMutation} from 'api/users';
import {Container} from 'components/Container';
import {Input} from 'components/Inputs/Input';
import {InputPassword} from 'components/Inputs/InputPassword';
import {Typography} from 'components/Typography';

type FormValues = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

export const SignUp = ({navigation}: RootStackScreenProps<'Sign Up'>) => {
  const [create] = useCreateUserMutation();

  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<FormValues>({
    resolver: yupResolver(signUpSchema),
  });

  const onSignUp = async (formValues: FieldValues) => {
    const res = await create({
      variables: {username: formValues.username, password: formValues.password},
    });
    const createdUser = res.data?.createUser;
    console.log(createdUser);
    navigation.navigate('Sign In', {defaultUserName: formValues.username});
  };

  const usernamePlaceholder = t('username');
  const passwordPlaceholder = t('password');

  return (
    <Container>
      <Typography fontSize="24" style={styles.text}>
        {t('sign up')}
      </Typography>
      <Controller
        name={'username'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            label="Username"
            placeholder={usernamePlaceholder}
            value={value}
            onChange={onChange}
            errorText={error?.message}
            withErrorPlaceholder
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputPassword
            label="Password"
            placeholder={passwordPlaceholder}
            value={value}
            onChange={onChange}
            errorText={error?.message}
            withErrorPlaceholder
          />
        )}
      />
      <Controller
        name={'passwordConfirmation'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputPassword
            label="Repeat password"
            placeholder={passwordPlaceholder}
            value={value}
            onChange={onChange}
            errorText={error?.message}
            withErrorPlaceholder
          />
        )}
      />

      <Button
        type="primary"
        title={t('sign up')}
        onPress={handleSubmit(onSignUp)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
  },
});
