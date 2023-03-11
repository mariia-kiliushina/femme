import {useState, useEffect} from 'react';
import {ImageSourcePropType, ScrollView, StyleSheet, View} from 'react-native';
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Typography} from 'components/Typography';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {MainCalendar} from 'components/Calendar';
import {PressableRoundIcon} from 'components/PressableRoundIcon';
import {useGetSymptomsQuery} from 'api/symptoms';
import {useGetUserQuery} from 'api/users';
import {useGetMoodsQuery} from 'api/mood/index';
import {useGetMedicationCoursesQuery} from 'api/medication-course';
import {useGetPeriodIntensitiesQuery} from 'api/period-intensity';
import {
  useGetPeriodRecordsQuery,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
  useGetPeriodRecordQuery,
} from 'api/periods';
import {Symptom, Mood, PeriodIntensity} from 'api/types';
import {formatDateToString} from 'src/helpers/formatDate';
import {LAYOUT} from 'constants/layout';

import good from 'assets/moods/good.png';
import sad from 'assets/moods/sad.png';
import noFlow from 'assets/flows/no-flows.png';
import light from 'assets/flows/light.png';
import medium from 'assets/flows/medium.png';
import heavy from 'assets/flows/heavy.png';
import acne from 'assets/symptoms/acne.png';
import headache from 'assets/symptoms/headache.png';
import crumps from 'assets/symptoms/crumps.png';
import foodCraving from 'assets/symptoms/food-craving.png';
import bodyHeat from 'assets/symptoms/body-heat.png';
import decreasedLibido from 'assets/symptoms/decreased-libido.png';
import discharges from 'assets/symptoms/discharges.png';
import fatigue from 'assets/symptoms/fatigue.png';
import spotting from 'assets/symptoms/spotting.png';
import moodSwings from 'assets/symptoms/mood-swings.png';

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
  const getPeriodByDateQueryResponse = useGetPeriodRecordQuery({
    variables: {date: selectedDateString},
  });
  const getMedicationCoursesQueryResponse = useGetMedicationCoursesQuery();

  const periodRecordOfSelectedDay =
    getPeriodByDateQueryResponse.data?.periodRecord;

  const symptomsNamesArray =
    symptomsQueryResult.data?.symptoms.map((symptom) => symptom.name) || [];

  const periodIntensitiesSlugsArray =
    periodIntensitiesQueryResult.data?.periodIntensities.map(
      (period) => period.slug,
    ) || [];

  const medicationCoursesNamesArray =
    getMedicationCoursesQueryResponse.data?.medicationCourses.map(
      (medicationCourse) => medicationCourse.name,
    ) || [];

  const moodsSlugsArray =
    moodsQueryResult.data?.moods.map((mood) => mood.slug) || [];

  const symptomsImg: Record<
    (typeof symptomsNamesArray)[number],
    ImageSourcePropType
  > = {
    acne,
    crumps,
    discharges,
    fatigue,
    headache,
    spotting,
    'body heat': bodyHeat,
    'decreased libido': decreasedLibido,
    'food craving': foodCraving,
    'mood swings': moodSwings,
  };

  const periodIntensitiesSlugsMock: Record<
    (typeof periodIntensitiesSlugsArray)[number],
    ImageSourcePropType
  > = {
    'no-flow': noFlow,
    light,
    medium,
    heavy,
  };

  const moodsSlugsMock: Record<
    (typeof moodsSlugsArray)[number],
    ImageSourcePropType
  > = {
    good,
    sad,
  };

  const [createPeriodRecordMutation] = useCreatePeriodRecordMutation({
    refetchQueries: [
      {
        query: GetPeriodRecordsDocument,
      },
    ],
  });

  const {control, handleSubmit, reset} = useForm<FormValues>({
    defaultValues: {
      symptomsIds: [],
    },
  });

  const {t} = useTranslation();

  useEffect(() => {
    const symptomsIdsArrayByDate =
      periodRecordOfSelectedDay?.symptoms.map((symptom) => symptom.id) || [];

    const initialData = {
      intensitySlug: periodRecordOfSelectedDay?.intensity.slug,
      moodSlug: periodRecordOfSelectedDay?.mood.slug,
      symptomsIds: symptomsIdsArrayByDate || [],
    };

    reset(initialData);
  }, [reset, periodRecordOfSelectedDay]);

  if (getAuthorizedUserQueryResult.data === undefined) return null;
  if (getPeriodsQueryResponse.data === undefined) return null;

  const createRecord = (formValues: FieldValues) => {
    createPeriodRecordMutation({
      variables: {
        date: selectedDateString,
        intensitySlug: formValues.intensitySlug,
        moodSlug: formValues.moodSlug,
        symptomsIds: formValues.symptomsIds,
      },
    });
    console.log({
      variables: {
        date: selectedDateString,
        intensitySlug: formValues.intensitySlug,
        moodSlug: formValues.moodSlug,
        symptomsIds: formValues.symptomsIds,
      },
    });
  };

  return (
    <Container
      viewType="scroll"
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.paddingHorizontalWrapper}>
        <MainCalendar
          selectedDateString={selectedDateString}
          setSelectedDateString={setSelectedDateString}
          periodRecords={getPeriodsQueryResponse.data?.periodRecords}
        />
      </View>

      <View>
        <Typography>{medicationCoursesNamesArray}</Typography>
      </View>

      <Typography style={styles.recordFieldText}>{t('intensity')}</Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {periodIntensitiesQueryResult.data?.periodIntensities.map(
          (periodIntensity) => (
            <Controller
              key={periodIntensity.slug}
              name={'intensitySlug'}
              control={control}
              render={({field}) => (
                <PressableRoundIcon
                  key={periodIntensity.slug}
                  onPress={() => field.onChange(periodIntensity.slug)}
                  image={periodIntensitiesSlugsMock[periodIntensity.slug]}
                  marked={field.value === periodIntensity.slug}
                />
              )}
            />
          ),
        )}
      </ScrollView>

      <Typography style={styles.recordFieldText}>{t('mood')}</Typography>

      <View style={styles.buttonWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {moodsQueryResult.data?.moods.map((mood) => (
            <Controller
              key={mood.slug}
              name={'moodSlug'}
              control={control}
              render={({field}) => (
                <PressableRoundIcon
                  key={mood.slug}
                  onPress={() => field.onChange(mood.slug)}
                  image={moodsSlugsMock[mood.slug]}
                  marked={field.value === mood.slug}
                />
              )}
            />
          ))}
        </ScrollView>
      </View>

      <Typography style={styles.recordFieldText}>{t('symptoms')}</Typography>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        {symptomsQueryResult.data?.symptoms.map((symptom) => (
          <Controller
            key={symptom.id}
            name="symptomsIds"
            control={control}
            render={({field}) => (
              <PressableRoundIcon
                key={symptom.id}
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
                image={symptomsImg[symptom.name]}
                marked={field.value.includes(symptom.id)}
              />
            )}
          />
        ))}
      </ScrollView>

      <Button
        style={styles.formSubmitButton}
        onPress={handleSubmit(createRecord)}
        title={t('save')}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 0,
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  formSubmitButton: {
    marginTop: 8,
    marginHorizontal: LAYOUT.paddingHorizontal,
  },
  paddingHorizontalWrapper: {
    paddingHorizontal: LAYOUT.paddingHorizontal,
  },
  scrollView: {
    flexGrow: 1,
    flexDirection: 'row',
    columnGap: 10,
    marginVertical: 8,
    paddingHorizontal: LAYOUT.paddingHorizontal,
    justifyContent: 'flex-start',
  },
  recordFieldText: {
    marginLeft: LAYOUT.paddingHorizontal,
  },
});
