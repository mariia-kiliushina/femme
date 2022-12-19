import {StyleSheet, View, Text, Image, useWindowDimensions} from 'react-native';
import Button from 'components/Button';
import COLORS from 'src/constants/colors';
import girlWithFlowers from 'assets/girl-flowers-removebg.png';
import {RootStackScreenProps} from 'src/navigation/types';

export const Welcome = ({navigation}: RootStackScreenProps<'Welcome'>) => {
  const {height, width} = useWindowDimensions();

  const onSignIn = () => {
    navigation.navigate('Sign In');
  };
  const onSignUp = () => {
    navigation.navigate('Sign Up');
  };

  return (
    <View style={styles.container}>
      <Image
        source={girlWithFlowers}
        style={[styles.image, {height: height * 0.5, width: width}]}
      />
      <Text style={styles.welcomeText}>Welcome to Femme</Text>
      <View style={styles.buttonsContainer}>
        <Button type="primary" title="Sign In" onPress={onSignIn} />
        <Text style={styles.text}>or</Text>
        <Button type="primary" title="Sign Up" onPress={onSignUp} />
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 100,
    position: 'relative',
    top: 0,
    left: 0,
  },
  image: {
    position: 'relative',
    top: -80,
    left: 0,
  },
  welcomeText: {
    color: COLORS.colorSupportingDarkBlue,
    fontSize: 40,
    position: 'relative',
    top: -40,
    left: 0,
  },
  text: {
    color: COLORS.colorSupportingDarkBlue,
    fontSize: 20,
  },
});
