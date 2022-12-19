import React from 'react';
import {StyleSheet, View} from 'react-native';
import {FC} from 'react';
import Calendar from '../Calendar';
import {IState} from 'src/store/sliceData';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import {IUsersState} from 'src/store/sliceUser';

const Settings = () => {
  const {} = props;
  const {} = styles;
  const dispatch = useAppDispatch();

  const {...tracks} = useAppSelector(
    (state: {dataSliceReducer: IState; userSliceReducer: IUsersState}) =>
      state.dataSliceReducer.periods,
  );
  const periods = Object.values(tracks);
  return (
    <View style={styles.container}>
      <Calendar periods={periods} setDate={() => {}} />
      <Calendar periods={periods} setDate={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 20,
  },
});

export default Settings;
