import {Pressable, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useReactiveVar} from '@apollo/client';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {TabScreenProps} from 'src/navigation/types';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import {useGetUserQuery} from 'api/users';
import {COLORS} from 'constants/colors';
import {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {Controller, useForm} from 'react-hook-form';
import {LANGUAGES} from 'src/translation/i18n';
import {format as formatDate} from 'date-fns';
import {
  GetMedicationCoursesDocument,
  useCreateMedicationCourseMutation,
} from 'api/medication-course';
import {MedicationCourse, MedicationCourseTaking} from 'api/types';
import {ModalWindow} from 'components/Modal';
import {Input} from 'components/Inputs/Input';
import {InputDateTime} from 'components/Inputs/InputDateTime';
import {PressableOpacity} from 'components/PressableOpacity';
import {Add, Remove} from 'assets/svg';
import {LAYOUT} from 'constants/layout';

type FormValues = {
  startDate: MedicationCourseTaking['date'];
  endDate: MedicationCourseTaking['date'];
  name: MedicationCourse['name'];
  times: MedicationCourseTaking['time'][];
};

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

const clearStorage = async () => {
  await EncryptedStorage.clear();
};

export const Profile = ({}: TabScreenProps<'Profile'>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const {control, handleSubmit, watch, getValues, setValue} =
    useForm<FormValues>({
      defaultValues: {
        startDate: formatDate(new Date(), 'yyyy-MM-dd'),
        endDate: formatDate(new Date(), 'yyyy-MM-dd'),
        name: '',
        times: [formatDate(new Date(), 'HH:mm')],
      },
    });

  const {t, i18n} = useTranslation();

  const changeLanguage = (language: keyof typeof LANGUAGES) => {
    i18n
      .changeLanguage(language)
      .then(() => {
        EncryptedStorage.setItem('language', language);
      })
      .catch(console.log);
  };

  const authorizationTokenValue = useReactiveVar(authorizationToken);
  authorizationTokenValue;

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});

  const [createMedicationCourseMutation] = useCreateMedicationCourseMutation({
    refetchQueries: [{query: GetMedicationCoursesDocument}],
  });

  const createMedicationCourse = (formValues: FormValues) => {
    createMedicationCourseMutation({variables: formValues});
    setModalVisible(false);
  };

  if (getAuthorizedUserQueryResult.data === undefined) return null;

  return (
    <Container>
      <Button title={t('log out')} onPress={onLogOut} />
      <Button
        title="Выбрать русский язык"
        onPress={() => changeLanguage(LANGUAGES.ru)}
        style={i18n.language === LANGUAGES.ru ? styles.selectedLang : {}}
      />
      <Button
        title="Change to Eng"
        onPress={() => changeLanguage(LANGUAGES.en)}
        style={i18n.language === LANGUAGES.en ? styles.selectedLang : {}}
      />
      <Button
        title="Create medication course"
        onPress={() => setModalVisible(true)}
      />

      {modalVisible && (
        <ModalWindow
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        >
          <>
            <Controller
              name="name"
              control={control}
              render={({field}) => (
                <Pressable>
                  <Input
                    label="Pill's name"
                    value={field.value}
                    style={styles.input}
                    onChange={field.onChange}
                    withErrorPlaceholder={false}
                  />
                </Pressable>
              )}
            />
            <Controller
              name="startDate"
              control={control}
              render={({field}) => (
                <Pressable style={styles.dateTimeWrapper}>
                  <InputDateTime
                    mode="date"
                    label="Start date"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <View style={styles.addRemoveWrapper} />
                </Pressable>
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({field}) => (
                <Pressable style={styles.dateTimeWrapper}>
                  <InputDateTime
                    mode="date"
                    label="End date"
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <View style={styles.addRemoveWrapper} />
                </Pressable>
              )}
            />
            {watch('times').map((time, index) => (
              <View key={index} style={styles.inputWrapper}>
                <Controller
                  name="times"
                  control={control}
                  render={({field}) => {
                    return (
                      <Pressable style={styles.dateTimeWrapper}>
                        <InputDateTime
                          mode="time"
                          label="Times"
                          value={field.value[index]}
                          onChange={(selectedValue) => {
                            const newFieldValue = [...field.value];
                            newFieldValue[index] = selectedValue;
                            field.onChange(newFieldValue);
                          }}
                        />
                        <View style={styles.addRemoveWrapper}>
                          <PressableOpacity
                            onPress={() => {
                              const current = getValues('times');
                              setValue('times', [
                                ...current,
                                formatDate(new Date(), 'HH:mm'),
                              ]);
                            }}
                          >
                            <Add
                              width={LAYOUT.iconSize}
                              height={LAYOUT.iconSize}
                            />
                          </PressableOpacity>
                          {index !== 0 && (
                            <PressableOpacity
                              onPress={() => {
                                const current = getValues('times');
                                current.splice(index, 1);
                                setValue('times', current);
                              }}
                            >
                              <Remove
                                width={LAYOUT.iconSize}
                                height={LAYOUT.iconSize}
                              />
                            </PressableOpacity>
                          )}
                        </View>
                      </Pressable>
                    );
                  }}
                />
              </View>
            ))}
            <Button
              title="Save"
              style={styles.resetMargin}
              onPress={handleSubmit(createMedicationCourse)}
            />
          </>
        </ModalWindow>
      )}

      <Button title="Clear storage" onPress={clearStorage} />
    </Container>
  );
};

const styles = StyleSheet.create({
  selectedLang: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  input: {
    marginBottom: 15,
  },
  resetMargin: {
    marginBottom: 0,
    marginTop: 10,
  },
  dateTimeWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  addRemoveWrapper: {
    flexDirection: 'row',
    marginLeft: 10,
    width: LAYOUT.iconSize * 2,
  },
});
