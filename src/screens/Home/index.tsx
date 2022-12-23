import {Pressable, StyleSheet, Text, View} from 'react-native';
import {GoBackButton} from 'src/components/GoBackButton';
import {useGetUserQuery} from 'src/api/users';
import COLORS from 'src/constants/colors';
import {TabScreenProps} from 'src/navigation/types';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useContext} from 'react';
import {
  authorizationContext,
  DEFAULT_AUTHORIZATION_TOKEN,
} from 'src/components/AuthorizationContextProvider';

export const Home = ({navigation}: TabScreenProps<'Home'>) => {
  const {setAuthorizationToken} = useContext(authorizationContext);
  const {data, error} = useGetUserQuery({variables: {id: 0}});
  console.log('error >>', error);

  const onLogOut = async () => {
    await EncryptedStorage.removeItem('authorizationToken');
    setAuthorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
  };

  return (
    <View style={styles.container}>
      <Text>Hello WORLD</Text>
      <Text>ID:{data?.user.id}</Text>
      <Text>Username:{data?.user.username}</Text>
      <GoBackButton type="flat" onPress={navigation.goBack} />
      <Pressable onPress={onLogOut} style={styles.button}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    columnGap: 20,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.colorPrimaryLight,
    padding: 15,
    borderRadius: 10,
  },
});
