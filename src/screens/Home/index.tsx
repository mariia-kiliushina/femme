import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, FieldValues, useForm} from 'react-hook-form';
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
import {Symptom, Mood, PeriodIntensity} from 'api/types';
import {formatDateToString} from 'src/helpers/formatDate';

type FormValues = {
  intensitySlug: PeriodIntensity['slug'];
  moodSlug: Mood['slug'];
  symptomsIds: Symptom['id'][];
};

export const Home = () => {
  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatDateToString(new Date()),
  );
  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});
  const symptomsQueryResult = useGetSymptomsQuery();
  const moodsQueryResult = useGetMoodsQuery();
  const periodIntensitiesQueryResult = useGetPeriodIntensitiesQuery();
  const getPeriodsQueryResponse = useGetPeriodRecordsQuery();

  const [createPeriodRecordMuatation] = useCreatePeriodRecordMutation({
    refetchQueries: [
      {
        query: GetPeriodRecordsDocument,
      },
    ],
  });

  const {control, handleSubmit} = useForm<FormValues>({
    defaultValues: {
      symptomsIds: [],
    },
  });

  if (getAuthorizedUserQueryResult.data === undefined) return null;
  if (getPeriodsQueryResponse.data === undefined) return null;

  const createRecord = (formValues: FieldValues) => {
    createPeriodRecordMuatation({
      variables: {
        date: selectedDateString,
        moodSlug: formValues.moodSlug,
        intensitySlug: formValues.intensitySlug,
        symptomsIds: formValues.symptomsIds,
      },
    });
    console.log('variables');
    console.log({
      date: selectedDateString,
      moodSlug: formValues.moodSlug,
      periodIntensitySlug: formValues.periodIntensitySlug,
      symptomsIds: formValues.symptomsIds,
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
            <Controller
              key={periodIntensity.slug}
              name={'intensitySlug'}
              control={control}
              render={({field}) => (
                <Button
                  key={periodIntensity.slug}
                  onPress={() => {
                    field.onChange(periodIntensity.slug);
                  }}
                  type={
                    field.value === periodIntensity.slug
                      ? 'secondary'
                      : 'outlined'
                  }
                  title={periodIntensity.slug}
                />
              )}
            />
          ),
        )}
      </View>
      <Typography>Moods</Typography>
      <View style={styles.buttonWrapper}>
        {moodsQueryResult.data?.moods.map((mood) => (
          <Controller
            key={mood.slug}
            name={'moodSlug'}
            control={control}
            render={({field}) => (
              <Button
                key={mood.slug}
                type={field.value === mood.slug ? 'secondary' : 'outlined'}
                title={mood.slug}
                onPress={() => {
                  field.onChange(mood.slug);
                }}
              />
            )}
          />
        ))}
      </View>

      <Typography>Symptoms</Typography>

      <View style={styles.buttonWrapper}>
        {symptomsQueryResult.data?.symptoms.map((symptom) => (
          <Controller
            key={symptom.id}
            name="symptomsIds"
            control={control}
            render={({field}) => (
              <Button
                key={symptom.id}
                type={
                  field.value.includes(symptom.id) ? 'secondary' : 'outlined'
                }
                title={symptom.name}
                onPress={() => {
                  if (field.value.includes(symptom.id)) {
                    const updatedSymptomsIds = field.value.filter(
                      (symptomId) => {
                        return symptomId !== symptom.id;
                      },
                    );
                    field.onChange(updatedSymptomsIds);
                  } else {
                    field.onChange([...field.value, symptom.id]);
                  }
                }}
              />
            )}
          />
        ))}
      </View>

      <Button
        style={styles.formSubmitButton}
        onPress={handleSubmit(createRecord)}
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
