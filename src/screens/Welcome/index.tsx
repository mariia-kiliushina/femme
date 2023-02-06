import {StyleSheet, Image, View} from 'react-native';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {Typography} from 'components/Typography';
import {RootStackScreenProps} from 'src/navigation/types';
import girlWithFlowers from 'assets/girl-welcome-screen.png';

export const Welcome = ({navigation}: RootStackScreenProps<'Welcome'>) => {
  const onSignIn = () => {
    navigation.navigate('Sign In');
  };

  return (
    <Container contentContainerStyle={styles.container}>
      <View>
        <Image
          resizeMode="contain"
          source={girlWithFlowers}
          style={styles.image}
        />
      </View>
      <Typography fontSize="36">Welcome to Femme</Typography>
      <Button type="primary" title="Sign In" onPress={onSignIn} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 20,
  },
  image: {
    width: '100%',
  },
});
