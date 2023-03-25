import {useTranslation} from 'react-i18next';
import {Calendar, CalendarProps, LocaleConfig} from 'react-native-calendars';
import {GetPeriodRecordQuery} from 'api/periods';
import {COLORS} from 'constants/colors';
import {format} from 'date-fns';
import {StyleSheet} from 'react-native';

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
  const {i18n} = useTranslation();
  LocaleConfig.defaultLocale = i18n.language;

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
      initialDate={format(new Date(), 'yyyy-MM-dd')}
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
      style={styles.resetPaddins}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  resetPaddins: {
    paddingRight: 0,
    paddingLeft: 0,
  },
});
