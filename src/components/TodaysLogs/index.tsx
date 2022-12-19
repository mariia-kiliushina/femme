import React, { useEffect, useState } from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { FC } from 'react';
import Button from 'components/Button';
import COLORS from 'src/constants/colors';
import { getFormatedDateFromGMTObject } from 'src/helpers/index';
import {
  Crumps,
  Acne,
  HairLoss,
  Spotting,
  Discharges,
  PainfulSex,
  Headache,
  MoodSwings,
  BreastTenderness,
  Constipation,
} from 'src/assets/symptoms';
import { Shevron_primary } from 'src/assets/index.ts';
import { Heavy, Light, Normal } from 'src/assets/flows';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/hooks';
import { patchRecordById, postData } from 'src/store/sliceData';
import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { IState } from '../../store/sliceData';
import { useAppSelector } from 'src/hooks';
import { IUsersState } from 'src/store/sliceUser';
import RoundIcon from '../RoundIcon';
import { IPeriod, Mood, Flows } from 'src/store/sliceData';

type todaysInfo = {
  source: any;
  symptomText: string;
};

type FormValues = {
  flows: Flows;
  mood: Mood;
  symptoms: string[];
};

type Props = {};

const TodaysLogs: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { ...periods } = useAppSelector(
    (state: { dataSliceReducer: IState; userSliceReducer: IUsersState }) =>
      state.dataSliceReducer.periods
  );

  const periodsArrayFromState: IPeriod[] = Object.values(periods);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const selectedCalendarDate = useAppSelector(
    (state: { dataSliceReducer: IState; userSliceReducer: IUsersState }) =>
      state.dataSliceReducer.selectedCalendarDate
  );
  const userId = useAppSelector(
    (state: { dataSliceReducer: IState; userSliceReducer: IUsersState }) =>
      state.userSliceReducer.userId
  );

  const dateForDisplayInLogs =
    selectedCalendarDate === getFormatedDateFromGMTObject(new Date())
      ? 'Today'
      : selectedCalendarDate;

  const [modalVisible, setModalVisible] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = ({ flows, symptoms, mood }) => {
    let obj = { flows, symptoms, mood };

    if (Object.values(obj).some((value) => value !== undefined)) {
      const periodWithSelectedDate = periodsArrayFromState.filter(
        (period) => period.date === selectedCalendarDate
      );
      const doesPeriodWithSelectedDateExist = periodWithSelectedDate.length === 0 ? false : true;

      const dataToSend = { date: selectedCalendarDate, userId, ...obj };
      if (!doesPeriodWithSelectedDateExist) {
        dispatch(postData(dataToSend));
      }

      if (doesPeriodWithSelectedDateExist) {
        const periodId = periodWithSelectedDate[0].id;
        if (periodId) {
          dispatch(patchRecordById({ updatedPeriodInfo: dataToSend, periodId }));
        }
      }
    }
    setModalVisible(!modalVisible);
  };

  const optionsFlows = [
    { source: Light, symptomText: 'No Flow', optionValue: 'no-flow' },
    { source: Light, symptomText: 'Light', optionValue: 'light' },
    { source: Normal, symptomText: 'Normal', optionValue: 'normal' },
    { source: Heavy, symptomText: 'Heavy', optionValue: 'heavy' },
  ];

  const optionsSymptoms = {
    headache: { source: Headache, symptomText: 'Headache', optionValue: 'headache' },
    constipation: {
      source: Constipation,
      symptomText: 'Constipation',
      optionValue: 'constipation',
    },
    acne: { source: Acne, symptomText: 'Acne', optionValue: 'acne' },
    spotting: { source: Spotting, symptomText: 'Spotting', optionValue: 'spotting' },
    painfulSex: { source: PainfulSex, symptomText: 'Painful sex', optionValue: 'painfulSex' },
    hairLoss: { source: HairLoss, symptomText: 'Hair loss', optionValue: 'hairLoss' },
    crumps: { source: Crumps, symptomText: 'Crumps', optionValue: 'crumps' },
    discharges: { source: Discharges, symptomText: 'Discharges', optionValue: 'discharges' },
    moodSwings: { source: MoodSwings, symptomText: 'Mood swings', optionValue: 'moodSwings' },
    breastTenderness: {
      source: BreastTenderness,
      symptomText: 'BreastT tenderness',
      optionValue: 'breastTenderness',
    },
  };

  const optionsSymptomsArray = Object.values(optionsSymptoms);

  const optionsMood = [
    { source: Light, symptomText: 'Good', optionValue: 'good' },
    { source: Normal, symptomText: 'Sad', optionValue: 'sad' },
    { source: Heavy, symptomText: 'Frisky', optionValue: 'frisky' },
  ];

  const getTodaysInfo = () => {
    let todaysInfo: todaysInfo[] = [];
    if (!periods) return;
    periodsArrayFromState.forEach((period: any) => {
      if (!period) return;
      if (period.date === selectedCalendarDate) {
        todaysInfo.push({
          // source: optionsSymptoms[period.symptoms].source,
          // symptomText: optionsSymptoms[period.symptoms].symptomText,
          source: optionsSymptoms['acne'].source,
          symptomText: optionsSymptoms['acne'].symptomText,
        });
      }
    });
    return todaysInfo;
  };

  let todaysInfo: any[] | undefined = [];

  useEffect(() => {
    (todaysInfo = getTodaysInfo()), periods;
  });

  return (
    <View style={[styles.container, styles.shadowProp]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.colFlexWrapper}>
              <View style={styles.rowFlexWrapper}>
                <Text style={styles.todayText}>{dateForDisplayInLogs}</Text>
              </View>
              <View style={styles.rowFlexWrapper}>
                <Text style={styles.todayText}>Menstrual Flow</Text>
              </View>
              <View style={styles.rowFlexWrapper}>
                {optionsFlows.map(({ source, symptomText, optionValue }) => (
                  <Controller
                    key={optionValue}
                    name="flows"
                    rules={{}}
                    control={control}
                    render={({ field }) => (
                      <View style={styles.rowFlexWrapper}>
                        <RoundIcon
                          source={source}
                          symptomText={symptomText}
                          marked={false}
                          value={field.value}
                          onChange={field.onChange}
                          optionValue={optionValue}
                        />
                      </View>
                    )}
                  />
                ))}
              </View>
              <View style={styles.rowFlexWrapper}>
                <Text style={styles.todayText}>Mood</Text>
              </View>
              <View style={styles.rowFlexWrapper}>
                {optionsMood.map(({ source, symptomText, optionValue }) => (
                  <Controller
                    key={optionValue}
                    name="mood"
                    rules={{}}
                    control={control}
                    render={({ field }) => (
                      <View style={styles.rowFlexWrapper}>
                        <RoundIcon
                          source={source}
                          symptomText={symptomText}
                          marked={false}
                          value={field.value}
                          onChange={field.onChange}
                          optionValue={optionValue}
                        />
                      </View>
                    )}
                  />
                ))}
              </View>
              <View style={styles.rowFlexWrapper}>
                <Text style={styles.todayText}>Symptoms</Text>
              </View>
              <View style={styles.rowFlexWrapper}>
                <Controller
                  name={'symptoms'}
                  rules={{}}
                  control={control}
                  render={({ field }) => (
                    <View style={styles.rowFlexWrapper}>
                      {optionsSymptomsArray.map(({ source, symptomText, optionValue }) => (
                        <RoundIcon
                          key={optionValue}
                          source={source}
                          symptomText={symptomText}
                          marked={false}
                          value={'symptoms field value'}
                          onChange={(event) => {
                            let symptomsArray = field.value;
                            if (field.value === undefined) {
                              field.onChange([optionValue]);
                            } else {
                              if (symptomsArray.some((symptom) => symptom === optionValue)) {
                                field.onChange([...symptomsArray]);
                              } else {
                                field.onChange([...symptomsArray, optionValue]);
                              }
                            }
                          }}
                        />
                      ))}
                    </View>
                  )}
                />
              </View>
            </View>

            <Pressable onPress={handleSubmit(onSubmit)} style={styles.closePressable}>
              <Ionicons name={'close'} size={40} color={'grey'} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.rowFlexWrapper}>
          <Text style={styles.todayText}>{dateForDisplayInLogs}</Text>
          <Button
            style={{ alignSelf: 'flex-end', width: 60, height: 60 }}
            imageStyle={{ width: 20, height: 20 }}
            type="flat"
            imageSrc={Shevron_primary}
            onPress={() => setModalVisible(true)}
          />
        </View>
        <View style={styles.rowFlexWrapper}>
          {todaysInfo &&
            todaysInfo.map(({ source, symptomText }) => (
              <RoundIcon
                key={symptomText}
                source={source}
                symptomText={symptomText}
                marked={true}
              />
            ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    width: '100%',
    marginVertical: 10,
    height: 160,
  },
  closePressable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    left: 180,
    height: 90,
    width: 90,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  colFlexWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowFlexWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    maxWidth: '90%',
  },
  todayText: {
    color: COLORS.colorGreyscaleContent,
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 24,
    alignSelf: 'flex-start',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: COLORS.colorPrimary,
    height: 200,
    width: 200,
    padding: 10,
    margin: 20,
  },
  buttonClose: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.colorPrimary,
    height: 50,
    width: 100,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  dayNumberStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default TodaysLogs;
