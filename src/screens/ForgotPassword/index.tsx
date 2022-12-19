// import Button from 'components/Button';
// import COLORS from 'src/constants/colors';
// import ControlledInput from 'components/ControlledInput';
import {RootStackScreenProps} from 'src/navigation/types';

export const ForgotPassword = ({}: RootStackScreenProps<'Sign In'>) => {
  // const {
  //   control,
  //   handleSubmit,
  //   formState: {errors},
  // } = useForm();

  // return (
  //   <ScrollView showsVerticalScrollIndicator={false}>
  //     <View style={styles.container}>
  //       <View style={styles.inputsContainer}>
  //         <Text style={styles.text}>Welcome to Femme</Text>
  //         <ControlledInput
  //           control={control}
  //           name="username"
  //           type="e-mail"
  //           placeholder="Enter your email/username"
  //           rules={{required: 'Username is required'}}
  //         />

  //         <Button title="Reset password" onPress={() => console.log('Reset')} />
  //       </View>
  //       <View style={{position: 'absolute', top: 100, left: 20}}>
  //         <GoBackButton type="flat" onPress={() => navigation.goBack()} />
  //       </View>
  //     </View>
  //   </ScrollView>
  // );
  return null;
};

// const styles = StyleSheet.create({
//   container: {
//     height: 500,
//     width: 500,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     columnGap: 20,
//   },
//   inputsContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     rowGap: 25,
//   },
//   image: {
//     height: 300,
//     width: 300,
//   },
//   imageContainer: {
//     backgroundColor: COLORS.colorSupportingBeige,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//   },
//   text: {
//     color: COLORS.colorGreyscaleContent,
//     fontSize: 24,
//   },
// });
