import {FlatList, StyleSheet, View} from 'react-native';
import COLORS from 'src/constants/colors';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';
import {
  useGetPeriodRecordsQuery,
  useUpdatePeriodRecordMutation,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
} from 'api/periods';
import {useGetUserQuery} from 'api/users';
import {PressableOpacity} from 'components/PressableOpacity';
import {Typography} from 'components/Typography';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

export const Home = () => {
  const authorizationTokenValue = useReactiveVar(authorizationToken);

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});
  const getPeriodsQueryResponse = useGetPeriodRecordsQuery();

  const [createPeriodRecordMuatation] = useCreatePeriodRecordMutation({
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

  const records = getPeriodsQueryResponse.data.periodRecords;

  const updateRecord = () => {
    updatePeriodRecordMuatation({
      variables: {
        id:
          (getPeriodsQueryResponse &&
            getPeriodsQueryResponse?.data &&
            records[0].id) ||
          1,
        date: '0001-12-23',
        moodSlug: 'good',
        intensitySlug: 'medium',
        symptomsIds: [1, 2],
      },
    });
  };

  return (
    <View style={styles.container}>
      <Typography>Hello WORLD</Typography>
      <Typography>ID:{authorizedUser.id}</Typography>
      <Typography>Username:{authorizedUser.username}</Typography>
      <PressableOpacity onPress={onLogOut} style={styles.button}>
        <Typography>Log out</Typography>
        <Typography>{authorizationTokenValue}</Typography>
      </PressableOpacity>
      <Typography>Token:</Typography>
      <PressableOpacity
        onPress={() => authorizationToken(DEFAULT_AUTHORIZATION_TOKEN)}
        style={styles.button}
      >
        <Typography>Reset token to default</Typography>
      </PressableOpacity>
      <FlatList
        data={getPeriodsQueryResponse.data.periodRecords.slice(0, 5)}
        renderItem={({item}) => (
          <View style={styles.listItem}>
            <View>
              <Typography>{item.date}</Typography>
            </View>
            <View>
              <Typography>{item.mood.slug}</Typography>
            </View>
            <View>
              <Typography>{item.intensity.slug}</Typography>
            </View>
          </View>
        )}
      />
      <PressableOpacity onPress={createRecord}>
        <Typography>Add record</Typography>
      </PressableOpacity>
      <PressableOpacity onPress={updateRecord}>
        <Typography> Update the 1st record</Typography>
      </PressableOpacity>
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
