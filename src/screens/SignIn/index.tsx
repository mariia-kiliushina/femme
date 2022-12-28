import {StyleSheet, View, Text} from 'react-native';
import Button from 'components/Button';
import COLORS from 'src/constants/colors';
import {FieldValues, useForm} from 'react-hook-form';
import ControlledInput from 'components/ControlledInput';
import {GoBackButton} from 'components/GoBackButton';
import {RootStackScreenProps} from 'src/navigation/types';
import {useAuthorizeMutation} from 'src/api/authorization';
import EncryptedStorage from 'react-native-encrypted-storage';
import {authorizationToken} from 'src/state';

export const SignIn = ({navigation}: RootStackScreenProps<'Sign In'>) => {
  const [authorize] = useAuthorizeMutation();

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({});

  const onSignIn = async (formValues: FieldValues) => {
    console.log('formValues >>', formValues);
    const res = await authorize({
      variables: {username: formValues.login, password: formValues.password},
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
    <View style={styles.container}>
      <View style={styles.inputsWrapper}>
        <Text style={styles.text}>Sign In</Text>
        <ControlledInput
          style={styles.input}
          control={control}
          name="login"
          type="e-mail"
          placeholder="Email or username"
          rules={{required: 'Username is required'}}
        />
        <ControlledInput
          style={styles.input}
          control={control}
          name="password"
          type="password"
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
      </View>
      <View style={styles.goBack}>
        <GoBackButton type="flat" onPress={navigation.goBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  button: {
    marginVertical: 30,
    alignSelf: 'flex-end',
  },
  inputsWrapper: {
    height: '100%',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  input: {width: '90%', marginBottom: 40, fontSize: 39},
  text: {
    color: COLORS.colorGreyscaleContent,
    fontSize: 32,
    alignSelf: 'flex-start',
    marginBottom: 50,
    marginLeft: 20,
  },
  goBack: {position: 'absolute', top: 100, left: 20},
});
