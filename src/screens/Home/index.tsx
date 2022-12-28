import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useGetUserQuery} from 'src/api/users';
import COLORS from 'src/constants/colors';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';

export const Home = () => {
  const {data} = useGetUserQuery({variables: {id: 0}});

  const onLogOut = async () => {
    await EncryptedStorage.removeItem('authorizationToken');
    authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
  };

  const authorizationTokenValue = useReactiveVar(authorizationToken);

  return (
    <View style={styles.container}>
      <Text>Hello WORLD</Text>
      <Text>ID:{data?.user.id}</Text>
      <Text>Username:{data?.user.username}</Text>
      <Pressable onPress={onLogOut} style={styles.button}>
        <Text>Log out</Text>
        <Text>{authorizationTokenValue}</Text>
      </Pressable>
      <Text>Token:</Text>
      <Pressable
        onPress={() => authorizationToken(DEFAULT_AUTHORIZATION_TOKEN)}
        style={styles.button}
      >
        <Text>Reset token to default</Text>
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
