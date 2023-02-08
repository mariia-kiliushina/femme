import {StyleSheet} from 'react-native';
import {Button} from 'components/Button';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {RootStackScreenProps} from 'src/navigation/types';
import {useAuthorizeMutation} from 'src/api/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import {authorizationToken} from 'src/state';
import {Container} from 'components/Container';
import {Input} from 'components/Inputs/Input';
import {InputPassword} from 'components/Inputs/InputPassword';
import {Typography} from 'components/Typography';

type FormValues = {username: string; password: string};

export const SignIn = ({}: RootStackScreenProps<'Sign In'>) => {
  const [authorize] = useAuthorizeMutation();

  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {username: '', password: ''},
  });

  const onSignIn = async (formValues: FieldValues) => {
    const res = await authorize({
      variables: {username: formValues.username, password: formValues.password},
    });
    const authorizationTokenFromServer = res.data?.authorize;
    console.log(
      'authorizationTokenFromServer >>',
      authorizationTokenFromServer,
    );
    if (authorizationTokenFromServer !== undefined) {
      await EncryptedStorage.setItem(
        'authorizationToken',
        authorizationTokenFromServer,
      );
      authorizationToken(authorizationTokenFromServer);
    }
  };

  return (
    <Container>
      <Typography fontSize="24" style={styles.text}>
        Sign In
      </Typography>
      <Controller
        name={'username'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            placeholder={'Username'}
            value={value}
            onChangeText={onChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputPassword
            placeholder={'Password'}
            value={value}
            onChangeText={onChange}
            errorText={error?.message}
          />
        )}
      />

      <Button type="primary" title="Sign In" onPress={handleSubmit(onSignIn)} />
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
  },
});
