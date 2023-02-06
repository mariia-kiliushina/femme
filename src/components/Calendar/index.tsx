import {Calendar, CalendarProps} from 'react-native-calendars';
import {GetPeriodRecordQuery} from 'api/periods';
import {COLORS} from 'constants/colors';

type TMainCalendarProps = {
  periodRecords: GetPeriodRecordQuery['periodRecord'][];
  selectedDateString: string;
  setSelectedDateString: (arg: string) => void;
};

export const MainCalendar = ({
  periodRecords,
  selectedDateString,
  setSelectedDateString,
  ...props
}: CalendarProps & TMainCalendarProps) => {
  const periodRecordsDates = periodRecords.map(
    (periodRecord) => periodRecord.date,
  );

  let periodRecordsDatesConfigForCalendar = {};
  periodRecordsDates.forEach((periodRecordDate) => {
    periodRecordsDatesConfigForCalendar = {
      ...periodRecordsDatesConfigForCalendar,
      [periodRecordDate]: {selected: true},
    };
  });

  const selected = {
    [selectedDateString]: {
      customStyles: {
        container: {
          backgroundColor: COLORS.secondary,
        },
        text: {
          color: COLORS.greyscaleWhite,
        },
      },
    },
    ...periodRecordsDatesConfigForCalendar,
  };

  return (
    <Calendar
      markingType={'custom'}
      markedDates={{...selected}}
      initialDate={'2023-02-05'}
      minDate={'2022-01-01'}
      maxDate={'2023-12-12'}
      disableAllTouchEventsForDisabledDays={true}
      onDayPress={(day) => {
        setSelectedDateString(day.dateString);
      }}
      monthFormat={'MMMM yyyy'}
      hideExtraDays={true}
      firstDay={1}
      enableSwipeMonths={true}
      theme={{
        todayTextColor: COLORS.primary,
        selectedDayBackgroundColor: COLORS.primary,
      }}
      {...props}
    />
  );
};
