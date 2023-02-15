import {StyleSheet, Image, View} from 'react-native';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {Typography} from 'components/Typography';
import {useTranslation} from 'react-i18next';
import {RootStackScreenProps} from 'src/navigation/types';
import girlWithFlowers from 'assets/girl-welcome-screen.png';

export const Welcome = ({navigation}: RootStackScreenProps<'Welcome'>) => {
  const onSignIn = () => {
    navigation.navigate('Sign In');
  };

  const {t} = useTranslation();

  return (
    <Container contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          source={girlWithFlowers}
          style={styles.image}
        />
      </View>
      <Typography
        fontSize="36"
        adjustsFontSizeToFit={true}
        numberOfLines={1}
        style={styles.welcomeText}
      >
        {t('welcome to femme')}
      </Typography>
      <Button type="primary" title={t('sign in')} onPress={onSignIn} />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 10,
  },
  imageContainer: {
    maxHeight: '60%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    alignSelf: 'center',
    textAlign: 'center',
  },
});
