import {StyleSheet, Text} from 'react-native';
import {Button} from 'components/Button';
import {COLORS} from 'src/constants/colors';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {RootStackScreenProps} from 'src/navigation/types';
import {useAuthorizeMutation} from 'src/api/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import {authorizationToken} from 'src/state';
import {Container} from 'components/Container';
import {Input} from 'components/Inputs/BaseInput';

type FormValues = {username: string; password: string};

export const SignIn = ({}: RootStackScreenProps<'Sign In'>) => {
  const [authorize] = useAuthorizeMutation();

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormValues>({
    defaultValues: {
      username: 'john-doe',
    },
  });

  const onSignIn = async (formValues: FieldValues) => {
    console.log('formValues >>', formValues);
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
      <Text style={styles.text}>Sign In</Text>
      <Controller
        name={'username'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            placeholder={'Username'}
            value={value}
            onChange={onChange}
            errorText={error?.message}
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            placeholder={'Password'}
            value={value}
            onChange={onChange}
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
    color: COLORS.greyscaleContent,
    fontSize: 32,
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
});
