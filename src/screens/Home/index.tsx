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
import {useGetPeriodIntensitiesQuery} from 'api/period-intensity';
import {
  useGetPeriodRecordsQuery,
  GetPeriodRecordsDocument,
  useCreatePeriodRecordMutation,
  useGetPeriodRecordQuery,
  GetPeriodRecordDocument,
  useUpdatePeriodRecordMutation,
} from 'api/periods';
import {
  Symptom,
  Mood,
  PeriodIntensity,
  MedicationCourseTaking,
} from 'api/types';
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
import blueRed from 'assets/pills/blue-red.png';
import pinkGreen from 'assets/pills/pink-green.png';
import purplePink from 'assets/pills/purple-pink.png';
import blueViolet from 'assets/pills/blue-violet.png';
import yellowGreen from 'assets/pills/yellow-green.png';
import yellowRed from 'assets/pills/yellow-red.png';
import {
  useGetMedicationCoursesTakingsQuery,
  useUpdateMedicationCourseTakingMutation,
} from 'api/medication-course-taking';

type FormValues = {
  intensitySlug: PeriodIntensity['slug'];
  medicationCoursesTakingsIds: MedicationCourseTaking['id'][];
  moodSlug: Mood['slug'];
};

export const Home = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateToString(new Date()),
  );

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});
  const symptomsQueryResult = useGetSymptomsQuery();
  const moodsQueryResult = useGetMoodsQuery();
  const periodIntensitiesQueryResult = useGetPeriodIntensitiesQuery();
  const getPeriodsQueryResponse = useGetPeriodRecordsQuery();
  const getPeriodByDateQueryResponse = useGetPeriodRecordQuery({
    variables: {date: selectedDate},
  });
  const getMedicationCoursesTakingsQueryResponse =
    useGetMedicationCoursesTakingsQuery({variables: {dates: [selectedDate]}});
  const [updatePeriodRecord] = useUpdatePeriodRecordMutation();

  const periodRecordOfSelectedDay =
    getPeriodByDateQueryResponse.data?.periodRecord;

  const symptomsNames =
    symptomsQueryResult.data?.symptoms.map((symptom) => symptom.name) || [];

  const periodIntensitiesSlugs =
    periodIntensitiesQueryResult.data?.periodIntensities.map(
      (period) => period.slug,
    ) || [];

  const moodsSlugs =
    moodsQueryResult.data?.moods.map((mood) => mood.slug) || [];

  const symptomsImgMap: Record<
    (typeof symptomsNames)[number],
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
  ///TODO: ts
  const medicationCoursesImg = [
    blueRed,
    blueViolet,
    yellowGreen,
    purplePink,
    yellowRed,
    pinkGreen,
  ];

  const periodIntensitiesImgMap: Record<
    (typeof periodIntensitiesSlugs)[number],
    ImageSourcePropType
  > = {'no-flow': noFlow, light, medium, heavy};

  const moodsImgMap: Record<(typeof moodsSlugs)[number], ImageSourcePropType> =
    {good, sad};

  const [createPeriodRecordMutation] = useCreatePeriodRecordMutation({
    refetchQueries: [
      {query: GetPeriodRecordsDocument},
      {query: GetPeriodRecordDocument, variables: {date: selectedDate}},
    ],
  });

  const [updateMedicationCourseTaking] =
    useUpdateMedicationCourseTakingMutation();

  const {control, handleSubmit, reset, watch} = useForm<FormValues>({
    defaultValues: {
      intensitySlug: '',
      medicationCoursesTakingsIds: [],
      moodSlug: '',
    },
  });

  const {t} = useTranslation();

  const medicationCoursesTakingsIdsByDate =
    getMedicationCoursesTakingsQueryResponse.data?.medicationCoursesTakings
      .filter((taking) => taking.isTaken)
      .map((medicationCourseTaking) => medicationCourseTaking.id) || [];

  useEffect(() => {
    const symptomsIdsByDate =
      periodRecordOfSelectedDay?.symptoms.map((symptom) => symptom.id) || [];

    console.log(
      'medicationCoursesTakingsIdsByDate',
      medicationCoursesTakingsIdsByDate,
    );
    console.log('selectedDate', selectedDate);

    const initialData = {
      intensitySlug: periodRecordOfSelectedDay?.intensity.slug,
      medicationCoursesTakingsIds: medicationCoursesTakingsIdsByDate,
      moodSlug: periodRecordOfSelectedDay?.mood.slug,
      symptomsIds: symptomsIdsByDate,
    };

    reset(initialData);
  }, [reset, selectedDate]);

  if (getAuthorizedUserQueryResult.data === undefined) return null;
  if (getPeriodsQueryResponse.data === undefined) return null;

  const updateTaking = () => {
    medicationCoursesTakingsIdsByDate.forEach((id) => {
      console.log(
        "watch('medicationCoursesTakingsIds')",
        watch('medicationCoursesTakingsIds'),
      );
      console.log(
        "watch('medicationCoursesTakingsIds').includes(id)",
        watch('medicationCoursesTakingsIds').includes(id),
      );
      updateMedicationCourseTaking({
        variables: {
          id: id,
          isTaken: watch('medicationCoursesTakingsIds').includes(id),
        },
      });
      console.log({
        variables: {
          id: id,
          isTaken: watch('medicationCoursesTakingsIds').includes(id),
        },
      });
    });
  };

  const createOrUpdateDataForSelectedDate = (formValues: FieldValues) => {
    createPeriodRecordMutation({
      variables: {
        date: selectedDate,
        intensitySlug: formValues.intensitySlug,
        moodSlug: formValues.moodSlug,
        symptomsIds: formValues.symptomsIds,
      },
    });
    console.log({
      variables: {
        date: selectedDate,
        intensitySlug: formValues.intensitySlug,
        moodSlug: formValues.moodSlug,
        symptomsIds: formValues.symptomsIds,
      },
    });

    updateTaking();

    reset(formValues);
  };

  return (
    <Container viewType="fixed" contentContainerStyle={styles.contentContainer}>
      <View style={styles.paddingHorizontalWrapper}>
        <MainCalendar
          selectedDateString={selectedDate}
          setSelectedDateString={setSelectedDate}
          periodRecords={getPeriodsQueryResponse.data?.periodRecords}
        />
      </View>
      <ScrollView style={styles.formContainer}>
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
                    image={periodIntensitiesImgMap[periodIntensity.slug]}
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
                    image={moodsImgMap[mood.slug]}
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
            <PressableRoundIcon
              key={symptom.id}
              onPress={() => {
                if (periodRecordOfSelectedDay === undefined) {
                  createPeriodRecordMutation({
                    variables: {
                      date: selectedDate,
                      intensitySlug: 'light',
                      moodSlug: 'good',
                      symptomsIds: [symptom.id],
                    },
                  });
                } else {
                  const symptomsIds = periodRecordOfSelectedDay.symptoms.map(
                    (_symptom) => _symptom.id,
                  );
                  const didIncludeBefore = symptomsIds.includes(symptom.id);

                  const updatedSymptomsIds = didIncludeBefore
                    ? symptomsIds.filter(
                        (symptomId) => symptomId !== symptom.id,
                      )
                    : [...symptomsIds, symptom.id];

                  updatePeriodRecord({
                    variables: {
                      id: periodRecordOfSelectedDay.id,
                      symptomsIds: updatedSymptomsIds,
                    },
                  });
                }
              }}
              image={symptomsImgMap[symptom.name]}
              marked={
                periodRecordOfSelectedDay !== undefined &&
                periodRecordOfSelectedDay.symptoms.some(
                  (selectedSymptom) => selectedSymptom.id === symptom.id,
                )
              }
            />
          ))}
        </ScrollView>

        <Typography style={styles.recordFieldText}>
          {t('medicationCourse')}
        </Typography>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {getMedicationCoursesTakingsQueryResponse.data?.medicationCoursesTakings.map(
            (medicationCourseTaking) => (
              <PressableRoundIcon
                key={medicationCourseTaking.id}
                onPress={() => {
                  updateMedicationCourseTaking({
                    variables: {
                      id: medicationCourseTaking.id,
                      isTaken: !medicationCourseTaking.isTaken,
                    },
                  });
                }}
                image={
                  medicationCoursesImg[
                    medicationCourseTaking.medicationCourse.id %
                      medicationCoursesImg.length
                  ]
                }
                // @ts-ignore
                size={80}
                label={medicationCourseTaking.medicationCourse.name}
                marked={medicationCourseTaking.isTaken}
              />
            ),
          )}
        </ScrollView>
      </ScrollView>
      <Button
        style={styles.formSubmitButton}
        onPress={handleSubmit(createOrUpdateDataForSelectedDate)}
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
  formContainer: {
    flex: 1,
  },
});
