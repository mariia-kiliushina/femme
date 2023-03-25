import {StyleSheet, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Typography} from 'components/Typography';
import {COLORS} from 'constants/colors';
import {format as formatDate, parse as parseDate} from 'date-fns';

type TInputProps = {
  mode: 'date' | 'time';
  label: string;
  value: string;
  onChange: (newValue: string) => void;
};
export const InputDateTime = ({mode, label, value, onChange}: TInputProps) => {
  return (
    <View style={styles.wrapper}>
      {label && (
        <Typography color={COLORS.greyscaleContent} style={styles.label}>
          {label}
        </Typography>
      )}
      <DateTimePicker
        style={{flex: 2}}
        testID="dateTimePicker"
        value={parseDate(
          value,
          mode === 'date' ? 'yyyy-MM-dd' : 'HH:mm',
          new Date(),
        )}
        mode={mode}
        is24Hour={true}
        onChange={(_, selectedValue) => {
          if (selectedValue === undefined) {
            return;
          }
          if (mode === 'date') {
            onChange(formatDate(selectedValue, 'yyyy-MM-dd'));
          }
          if (mode === 'time') {
            onChange(formatDate(selectedValue, 'HH:mm'));
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
});
