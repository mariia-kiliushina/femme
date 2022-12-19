import { FC } from 'react';
import { useAppSelector } from 'src/hooks';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COLORS from 'src/constants/colors';
import { IState } from 'src/store/sliceData';
import { IUsersState } from 'src/store/sliceUser';

type Props = {
  date: string;
};
const RoundButton: FC<Props> = (props) => {
  const selectedCalendarDate = useAppSelector(
    (state: { dataSliceReducer: IState; userSliceReducer: IUsersState }) =>
      state.dataSliceReducer.selectedCalendarDate
  );
  return (
    <View>
      <TouchableOpacity style={[styles.button]} onPress={() => {}}>
        <Text style={styles.dayNumberStyle}>{selectedCalendarDate}</Text>
        <Text style={styles.textStyle}>day of cycle</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  dayNumberStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 36,
  },
});

export default RoundButton;
