import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FC } from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import { getFormatedDateFromGMTObject } from 'src/helpers/index';
import COLORS from 'src/constants/colors';
import { useAppDispatch } from 'src/hooks';
import { setSelectedCalendarDate } from 'src/store/sliceData';
type Props = {};

const MyCalendarStrip: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const onDateSelected = (date: any) => {
    const selectedDateStringFormatted = getFormatedDateFromGMTObject(date._d);
    dispatch(setSelectedCalendarDate(selectedDateStringFormatted));
  };
  const [selectedDate, set] = useState(new Date());

  return (
    <View style={styles.container}>
      <CalendarStrip
        updateWeek={true}
        scrollToOnSetSelectedDate={true}
        scrollable={true}
        calendarAnimation={{ type: 'parallel', duration: 30 }}
        daySelectionAnimation={{
          type: 'background',
          duration: 100,
          highlightColor: COLORS.colorSecondaryDark,
        }}
        style={{
          minHeight: 1,
          minWidth: 1,
          width: '100%',
          flex: 1,
          justifyContent: 'space-around',
        }}
        calendarHeaderStyle={{ color: 'white' }}
        calendarColor={COLORS.colorSecondaryLight}
        dateNumberStyle={{ color: 'white', fontSize: 24 }}
        dateNameStyle={{ color: 'white', fontSize: 16 }}
        highlightDateNumberStyle={{ color: 'white', fontSize: 30 }}
        highlightDateNameStyle={{ color: 'white', fontSize: 16 }}
        highlightDateContainerStyle={{
          borderRadius: 15,
        }}
        iconContainer={{ flex: 0.1 }}
        iconStyle={{ flex: 0 }}
        selectedDate={selectedDate}
        dayContainerStyle={{
          width: 50,
          marginHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        dayComponentHeight={80}
        onDateSelected={onDateSelected}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 120, width: '130%' },
});

export default MyCalendarStrip;
