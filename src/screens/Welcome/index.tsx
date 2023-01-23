import {StyleSheet, Text, Image, useWindowDimensions} from 'react-native';
import {Button} from 'components/Button';
import {COLORS} from 'src/constants/colors';
import girlWithFlowers from 'assets/girl-flowers-removebg.png';
import {RootStackScreenProps} from 'src/navigation/types';
import {Container} from 'components/Container';

export const Welcome = ({navigation}: RootStackScreenProps<'Welcome'>) => {
  const {height, width} = useWindowDimensions();

  const onSignIn = () => {
    navigation.navigate('Sign In');
  };

  return (
    <Container>
      <Image
        source={girlWithFlowers}
        style={[styles.image, {height: height * 0.5, width: width}]}
      />
      <Text style={styles.welcomeText}>Welcome to Femme</Text>
      <Button type="primary" title="Sign In" onPress={onSignIn} />
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    top: -80,
    left: 0,
  },
  welcomeText: {
    color: COLORS.supportingDarkBlue,
    fontSize: 40,
    position: 'relative',
    top: -40,
    left: 0,
  },
});
