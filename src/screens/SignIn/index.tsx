import {StyleSheet, Text} from 'react-native';
import {Button} from 'components/Button';
import {COLORS} from 'src/constants/colors';
import {FieldValues, useForm} from 'react-hook-form';
import ControlledInput from 'components/ControlledInput';
import {RootStackScreenProps} from 'src/navigation/types';
import {useAuthorizeMutation} from 'src/api/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import {authorizationToken} from 'src/state';
import {Container} from 'components/Container';

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
      password: 'john-doe-password',
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
      <ControlledInput
        control={control}
        name="username"
        placeholder="Email or username"
        rules={{required: 'Username is required'}}
      />
      <ControlledInput
        control={control}
        name="password"
        placeholder="Password"
        rules={{
          required: 'Password is required',
        }}
      />

      <Button
        style={styles.button}
        type="primary"
        title="Sign In"
        onPress={handleSubmit(onSignIn)}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 30,
    alignSelf: 'flex-end',
  },
  text: {
    color: COLORS.greyscaleContent,
    fontSize: 32,
    alignSelf: 'flex-start',
    marginBottom: 50,
    marginLeft: 20,
  },
});
