import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import COLORS from 'src/constants/colors';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';
import {useGetPeriodRecordsQuery} from 'src/api/periods';
import {useGetUserQuery} from 'src/api/users';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

export const Home = () => {
  const authorizationTokenValue = useReactiveVar(authorizationToken);

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});
  const getPeriodsQueryResponse = useGetPeriodRecordsQuery();

  if (getPeriodsQueryResponse.data === undefined) return null;
  if (getAuthorizedUserQueryResult.data === undefined) return null;

  const authorizedUser = getAuthorizedUserQueryResult.data.user;

  return (
    <View style={styles.container}>
      <Text>Hello WORLD</Text>
      <Text>ID:{authorizedUser.id}</Text>
      <Text>Username:{authorizedUser.username}</Text>
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
      <FlatList
        data={getPeriodsQueryResponse.data.periodRecords}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View>
              <Text>{item.date}</Text>
            </View>
            <View>
              <Text>{item.mood.slug}</Text>
            </View>
            <View>
              <Text>{item.intensity.slug}</Text>
            </View>
          </View>
        )}
      />
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
  listItem: {
    borderColor: 'grey',
    borderWidth: 1,
    height: 100,
  },
});
