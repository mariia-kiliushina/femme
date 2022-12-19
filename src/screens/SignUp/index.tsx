// import Button from 'components/Button';
// import ControlledInput from 'components/ControlledInput';
// import girlWithFlowers from 'assets/girl-flowers.jpeg';
// import registerUser from 'src/store/sliceUser';
import {RootStackScreenProps} from 'src/navigation/types';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import COLORS from 'src/constants/colors';

type Props = {};
// const EMAIL_REGEX =
//   /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;

export interface User {
  login: string;
  password: string;
}

export const SignUp = ({}: RootStackScreenProps<'Sign Up'>) => {
  // const dispatch = useAppDispatch();
  // const {height} = useWindowDimensions();
  // const navigation = useNavigation();
  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm();
  // const onSignUp = (userData: IUser) => {
  //   console.log('SIGN UP');
  //   console.log(userData);
  //   dispatch(registerUser(userData));
  // };
  // const onForgotPassword = () => {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.inputsContainer}>
          <Text style={styles.text}>Welcome to Femme</Text>
          {/* <ControlledInput
            style={{}}
            control={control}
            name="login"
            placeholder="Enter your username"
            rules={{required: 'Username is required'}}
          />
          <ControlledInput
            style={{}}
            control={control}
            name="password"
            type="password"
            placeholder="Enter your password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 5,
                message: 'Password should be minimum 5 characters long',
              },
            }}
          /> */}
          {/* <Button title="Sign Up" onPress={handleSubmit(onSignUp)} /> */}
          {/* <View style={{position: 'absolute', top: 100, left: 20}}>
            <GoBackButton type="flat" onPress={() => navigation.goBack()} />
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={girlWithFlowers}
              style={[styles.image, {height: height * 0.3}]}
            />
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 25,
  },
  // image: {
  //   height: 300,
  //   width: 300,
  // },
  // imageContainer: {
  //   backgroundColor: COLORS.colorSupportingBeige,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   width: '100%',
  // },
  text: {
    color: COLORS.colorGreyscaleContent,
    fontSize: 24,
  },
});
