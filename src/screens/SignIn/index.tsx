import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from 'components/Button';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {RootStackScreenProps} from 'src/navigation/types';
import {useAuthorizeMutation} from 'src/api/authorization';
import {authorizationToken} from 'src/state';
import {Container} from 'components/Container';
import {Input} from 'components/Inputs/Input';
import {InputPassword} from 'components/Inputs/InputPassword';
import {Typography} from 'components/Typography';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ModalWindow} from 'components/Modal';

type FormValues = {username: string; password: string};

export const SignIn = ({route}: RootStackScreenProps<'Sign In'>) => {
  const hasJustRegistered = Boolean(route.params?.defaultUserName);
  const defaultUserName = route.params?.defaultUserName;
  const [modalVisible, setModalVisible] = useState(hasJustRegistered);
  const [authorize] = useAuthorizeMutation();
  const {t} = useTranslation();

  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      username: defaultUserName ? defaultUserName : '',
    },
  });

  const onSignIn = async (formValues: FieldValues) => {
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

  const usernamePlaceholder = t('username');
  const passwordPlaceholder = t('password');

  return (
    <Container>
      <Typography fontSize="24" style={styles.text}>
        {t('sign in')}
      </Typography>
      <Controller
        name={'username'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <Input
            placeholder={usernamePlaceholder}
            value={value}
            onChange={onChange}
            errorText={error?.message}
            withErrorPlaceholder
          />
        )}
      />
      <Controller
        name={'password'}
        control={control}
        render={({field: {value, onChange}, fieldState: {error}}) => (
          <InputPassword
            placeholder={passwordPlaceholder}
            value={value}
            onChange={onChange}
            errorText={error?.message}
            withErrorPlaceholder
          />
        )}
      />

      <Button
        type="primary"
        title={t('sign in')}
        onPress={handleSubmit(onSignIn)}
      />
      {modalVisible && (
        <ModalWindow
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <View style={styles.modalView}>
            <Typography fontSize="24" textStyle={styles.modalText}>
              Congratulations
            </Typography>
            <Typography fontSize="18" textStyle={styles.modalText}>
              You have succesfully registered in Femme
            </Typography>
            <Button title="Continue" onPress={() => setModalVisible(false)} />
          </View>
        </ModalWindow>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
  },
  modalText: {
    textAlign: 'center',
  },
  modalView: {
    justifyContent: 'center',
    flex: 1,
    rowGap: 10,
  },
});
