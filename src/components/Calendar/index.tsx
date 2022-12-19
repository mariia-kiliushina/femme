import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FC } from 'react';
import { Calendar } from 'react-native-calendars';
import { IPeriod } from 'src/store/sliceData';

type Props = {
  periods: IPeriod[];
  setDate: (day: string) => void;
};
type TMarkedObject = Record<string, {}>;

const MyCalendar: FC<Props> = (props) => {
  const { periods, setDate } = props;

  let markedDatesObject: TMarkedObject = {};

  let filteredPeriodsDays = periods.filter((element) => element.flows !== 'no-flow');
  filteredPeriodsDays.sort((a, b) => {
    let aDate = new Date(a.date);
    let bDate = new Date(b.date);
    if (aDate > bDate) {
      return 1;
    }
    if (aDate < bDate) {
      return -1;
    }
    return 0;
  });

  periods.forEach((element) => {
    const isFirst = filteredPeriodsDays[0].date === element.date;

    const isLast = filteredPeriodsDays[filteredPeriodsDays.length - 1].date === element.date;

    if (element.flows !== 'no-flow') {
      markedDatesObject[element.date] = {
        color: '#70d7c7',
        textColor: 'white',
        marked: true,
        dotColor: 'white',
        startingDay: isFirst,
        endingDay: isLast,
      };
      return;
    }
    if (element.flows !== 'no-flow') {
      markedDatesObject[element.date] = {
        color: '#50cebb',
        textColor: 'white',
        startingDay: isFirst,
        endingDay: isLast,
      };
      return;
    }
  });

  return (
    <View style={styles.container}>
      <Calendar
        markingType={'period'}
        markedDates={{ ...markedDatesObject }}
        initialDate={'2022-08-01'}
        minDate={'2022-08-01'}
        maxDate={'2032-08-01'}
        onDayPress={(day: any) => {
          setDate(day.dateString);
        }}
        onDayLongPress={(day: any) => {
          console.log('selected day', day);
        }}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        disableMonthChange={true}
        firstDay={1}
        hideDayNames={true}
        enableSwipeMonths={true}
        // theme={{
        //   backgroundColor: '#ffffff',
        //   calendarBackground: '#ffffff',
        //   textSectionTitleColor: '#b6c1cd',
        //   textSectionTitleDisabledColor: '#d9e1e8',
        //   selectedDayBackgroundColor: '#00adf5',
        //   selectedDayTextColor: '#ffffff',
        //   todayTextColor: '#00adf5',
        //   dayTextColor: '#2d4150',
        //   textDisabledColor: '#d9e1e8',
        //   dotColor: '#00adf5',
        //   selectedDotColor: '#ffffff',
        //   arrowColor: 'orange',
        //   disabledArrowColor: '#d9e1e8',
        //   monthTextColor: 'blue',
        //   indicatorColor: 'blue',
        //   textDayFontFamily: 'monospace',
        //   textMonthFontFamily: 'monospace',
        //   textDayHeaderFontFamily: 'monospace',
        //   textDayFontWeight: '300',
        //   textMonthFontWeight: 'bold',
        //   textDayHeaderFontWeight: '300',
        //   textDayFontSize: 16,
        //   textMonthFontSize: 16,
        //   textDayHeaderFontSize: 16
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    flex: 0.5,
  },
});

export default MyCalendar;
