import {FlatList, StyleSheet, Text, View} from 'react-native';
import COLORS from 'src/constants/colors';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';
import {
  useGetPeriodRecordsQuery,
  useUpdatePeriodRecordMutation,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
} from 'src/api/periods';
import {useGetUserQuery} from 'src/api/users';
import {PressableOpacity} from 'src/components/PressableOpacity';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

export const Home = () => {
  const authorizationTokenValue = useReactiveVar(authorizationToken);

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});
  const getPeriodsQueryResponse = useGetPeriodRecordsQuery();

  const [createPeriodRecordMuatation, {data, error}] =
    useCreatePeriodRecordMutation({
      refetchQueries: [
        {
          query: GetPeriodRecordsDocument,
        },
      ],
    });

  const [updatePeriodRecordMuatation] = useUpdatePeriodRecordMutation({
    refetchQueries: [
      {
        query: GetPeriodRecordsDocument,
      },
    ],
  });

  if (getPeriodsQueryResponse.data === undefined) return null;
  if (getAuthorizedUserQueryResult.data === undefined) return null;

  const authorizedUser = getAuthorizedUserQueryResult.data.user;

  const createRecord = () => {
    createPeriodRecordMuatation({
      variables: {
        date: '1111-12-23',
        moodSlug: 'good',
        intensitySlug: 'medium',
        symptomsIds: [1, 2],
      },
    });
  };
  const updateRecord = () => {
    updatePeriodRecordMuatation({
      variables: {
        id: 1,
        date: '0001-12-23',
        moodSlug: 'good',
        intensitySlug: 'medium',
        symptomsIds: [1, 2],
      },
    });
  };
  return (
    <View style={styles.container}>
      <Text>Hello WORLD</Text>
      <Text>ID:{authorizedUser.id}</Text>
      <Text>Username:{authorizedUser.username}</Text>
      <PressableOpacity onPress={onLogOut} style={styles.button}>
        <Text>Log out</Text>
        <Text>{authorizationTokenValue}</Text>
      </PressableOpacity>
      <Text>Token:</Text>
      <PressableOpacity
        onPress={() => authorizationToken(DEFAULT_AUTHORIZATION_TOKEN)}
        style={styles.button}
      >
        <Text>Reset token to default</Text>
      </PressableOpacity>
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
      <PressableOpacity onPress={createRecord}>
        <Text>Add record</Text>
      </PressableOpacity>
      <PressableOpacity onPress={updateRecord}>
        <Text> Update the 1st record</Text>
      </PressableOpacity>
      <Text>{JSON.stringify(data || error)}</Text>
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
