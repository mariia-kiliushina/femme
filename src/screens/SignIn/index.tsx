import {StyleSheet, View, Text} from 'react-native';
import Button from 'components/Button';
import COLORS from 'src/constants/colors';
import {useForm} from 'react-hook-form';
import ControlledInput from 'components/ControlledInput';
import {authenticateUser, clearAll, IUser} from 'src/store/sliceUser';
import {useAppDispatch} from 'src/hooks';
import {GoBackButton} from 'components/GoBackButton';
import {RootStackScreenProps} from 'src/navigation/types';

export const SignIn = ({navigation}: RootStackScreenProps<'Sign In'>) => {
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm();

  const onSignIn = (userData: IUser) => {
    console.log('userData');
    console.log(userData);

    dispatch(clearAll());
    setTimeout(() => dispatch(authenticateUser(userData)), 1000);
    setTimeout(
      () =>
        navigation.navigate('Main', {
          screen: 'Home',
        }),
      2000,
    );
  };
  const onSignUp = () => {
    navigation.navigate('Sign Up');
  };
  const onForgotPassword = () => {
    navigation.navigate('Forgot Password');
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
          style={{alignSelf: 'flex-end'}}
          type="flat"
          title="Forgot password?"
          onPress={onForgotPassword}
        />
        <Button
          style={{marginVertical: 30, alignSelf: 'flex-end'}}
          type="primary"
          title="Sign In"
          //@ts-ignore
          onPress={handleSubmit(onSignIn)}
        />
        <View style={styles.registerWrapper}>
          <Text style={styles.newToText}>New to Femme?</Text>
          <Button
            style={{width: 50}}
            type="flat"
            title="Register"
            onPress={onSignUp}
          />
        </View>
      </View>
      <View style={{position: 'absolute', top: 100, left: 20}}>
        <GoBackButton type="flat" onPress={() => navigation.goBack()} />
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
  registerWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  newToText: {
    fontSize: 18,
  },
});
