import {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {Container} from 'components/Container';

import {useGetSymptomsQuery} from 'api/symptoms';
import {useGetUserQuery} from 'api/users';
import {useGetMoodsQuery} from 'api/mood/index';
import {useGetPeriodIntensitiesQuery} from 'api/period-intensity';
import {
  useGetPeriodRecordsQuery,
  useUpdatePeriodRecordMutation,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
} from 'api/periods';

export const Home = () => {
  const [selectedPeriodIntensity, setselectedPeriodIntensitySlug] =
    useState('');
  const [selectedMoodSlug, setSelectedMoodSlug] = useState('');
  const [selectedSymptomsIds, setSelectedSymptomsIds] = useState<number[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const symptomsQueryResult = useGetSymptomsQuery();
  const moodsQueryResult = useGetMoodsQuery();
  const periodIntensitiesQueryResult = useGetPeriodIntensitiesQuery();

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
    const selectedDateFormatted = `${selectedDate.getFullYear()}-${(
      selectedDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${selectedDate.getUTCDate()}`;

    createPeriodRecordMuatation({
      variables: {
        date: selectedDateFormatted,
        moodSlug: selectedMoodSlug,
        intensitySlug: selectedPeriodIntensity,
        symptomsIds: selectedSymptomsIds,
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
    <Container>
      <DatePicker
        mode="date"
        date={selectedDate}
        onDateChange={setSelectedDate}
      />
      <Typography>Intensity</Typography>
      <View style={styles.buttonWrapper}>
        {periodIntensitiesQueryResult.data?.periodIntensities.map(
          (periodIntensity) => (
            <Button
              key={periodIntensity.slug}
              type={
                selectedPeriodIntensity === periodIntensity.slug
                  ? 'secondary'
                  : 'outlined'
              }
              onPress={() =>
                setselectedPeriodIntensitySlug(periodIntensity.slug)
              }
              title={periodIntensity.slug}
            />
          ),
        )}
      </View>
      <Typography>Moods</Typography>
      <View style={styles.buttonWrapper}>
        {moodsQueryResult.data?.moods.map((mood) => (
          <Button
            key={mood.slug}
            type={selectedMoodSlug === mood.slug ? 'secondary' : 'outlined'}
            onPress={() => setSelectedMoodSlug(mood.slug)}
            title={mood.slug}
          />
        ))}
      </View>
      <Typography>Symptoms</Typography>
      <View style={styles.buttonWrapper}>
        {symptomsQueryResult.data?.symptoms.map((symptom) => (
          <Button
            key={symptom.id}
            type={
              selectedSymptomsIds.includes(symptom.id)
                ? 'secondary'
                : 'outlined'
            }
            title={symptom.name}
            onPress={() => {
              if (selectedSymptomsIds.includes(symptom.id)) {
                const updatedSymptomsIds = selectedSymptomsIds.filter(
                  (symptomId) => {
                    return symptomId !== symptom.id;
                  },
                );
                setSelectedSymptomsIds(updatedSymptomsIds);
              } else {
                const updatedSymptomsIds = [...selectedSymptomsIds, symptom.id];
                setSelectedSymptomsIds(updatedSymptomsIds);
              }
            }}
          />
        ))}
      </View>
      <Button onPress={createRecord} title="Add record" />
      <Button onPress={updateRecord} title="Update the 1st record" />
      <View style={styles.listWrapper}>
        <FlatList
          data={getPeriodsQueryResponse.data.periodRecords.slice(0, 16)}
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Typography>{item.date}</Typography>
              <Typography>{item.mood.slug}</Typography>
              <Typography>{item.intensity.slug}</Typography>
              <Typography>
                {item.symptoms.map((s) => s.name).join(', ')}
              </Typography>
            </View>
          )}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
  },
  listWrapper: {
    flex: 1,
  },
  listItem: {
    borderColor: 'grey',
    borderWidth: 1,
  },
});
