import {FlatList, StyleSheet, View} from 'react-native';
import {
  useGetPeriodRecordsQuery,
  useUpdatePeriodRecordMutation,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
} from 'api/periods';
import {useGetUserQuery} from 'api/users';
import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {Input} from 'components/Inputs';
import {Container} from 'components/Container';
import {COLORS} from 'constants/colors';

export const Home = () => {
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
    <Container style={styles.style}>
      <Input label="Flow intensity" />
      <Input label="Mood" />

      <Button onPress={createRecord} title="Add record" />
      <Button onPress={updateRecord} title="Update the 1st record" />

      <View style={styles.listWrapper}>
        <FlatList
          data={getPeriodsQueryResponse.data.periodRecords.slice(0, 16)}
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
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  style: {
    backgroundColor: COLORS.colorPrimaryLight,
  },
  listWrapper: {
    flex: 1,
  },
  listItem: {
    borderColor: 'grey',
    borderWidth: 1,
  },
});
