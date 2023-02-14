import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useReactiveVar} from '@apollo/client';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {TabScreenProps} from 'src/navigation/types';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import {useGetUserQuery} from 'api/users';
import {COLORS} from 'constants/colors';
import {LANGUAGES} from 'src/translation/i18n';
import EncryptedStorage from 'react-native-encrypted-storage';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

const clearStorage = async () => {
  await EncryptedStorage.clear();
};

export const Profile = ({}: TabScreenProps<'Profile'>) => {
  const {t, i18n} = useTranslation();

  const changeLanguage = (language: keyof typeof LANGUAGES) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        EncryptedStorage.setItem('language', language);
      })
      .catch(console.log);
  };

  const authorizationTokenValue = useReactiveVar(authorizationToken);
  authorizationTokenValue;

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});

  if (getAuthorizedUserQueryResult.data === undefined) return null;

  return (
    <Container>
      <Button title={t('log out')} onPress={onLogOut} />
      <Button
        title="Выбрать русский язык"
        onPress={() => changeLanguage(LANGUAGES.ru)}
        style={i18n.language === LANGUAGES.ru ? styles.selectedLang : {}}
      />
      <Button
        title="Change to Eng"
        onPress={() => changeLanguage(LANGUAGES.en)}
        style={i18n.language === LANGUAGES.en ? styles.selectedLang : {}}
      />
      <Button title="Clear storage" onPress={clearStorage} />
    </Container>
  );
};

const styles = StyleSheet.create({
  selectedLang: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
});
