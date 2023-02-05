import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {MainCalendar} from 'components/Calendar';
import {useGetSymptomsQuery} from 'api/symptoms';
import {useGetUserQuery} from 'api/users';
import {useGetMoodsQuery} from 'api/mood/index';
import {useGetPeriodIntensitiesQuery} from 'api/period-intensity';
import {
  useGetPeriodRecordsQuery,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
} from 'api/periods';
import {formatDateToString} from 'src/helpers/formatDate';

export const Home = () => {
  const [selectedPeriodIntensity, setselectedPeriodIntensitySlug] =
    useState('');
  const [selectedMoodSlug, setSelectedMoodSlug] = useState('');
  const [selectedSymptomsIds, setSelectedSymptomsIds] = useState<number[]>([]);

  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatDateToString(new Date()),
  );
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

  // const [updatePeriodRecordMuatation] = useUpdatePeriodRecordMutation({
  //   refetchQueries: [
  //     {
  //       query: GetPeriodRecordsDocument,
  //     },
  //   ],
  // });

  if (getPeriodsQueryResponse.data === undefined) return null;
  if (getAuthorizedUserQueryResult.data === undefined) return null;

  const createRecord = () => {
    createPeriodRecordMuatation({
      variables: {
        date: selectedDateString,
        moodSlug: selectedMoodSlug,
        intensitySlug: selectedPeriodIntensity,
        symptomsIds: selectedSymptomsIds,
      },
    });
  };

  return (
    <Container viewType="scroll">
      <MainCalendar
        selectedDateString={selectedDateString}
        setSelectedDateString={setSelectedDateString}
        periodRecords={getPeriodsQueryResponse.data?.periodRecords}
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
      <Button
        style={styles.formSubmitButton}
        onPress={createRecord}
        title="Save"
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flexDirection: 'row',
  },
  formSubmitButton: {
    marginVertical: 15,
  },
});
