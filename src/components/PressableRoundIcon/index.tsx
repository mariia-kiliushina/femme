import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {PressableOpacity} from 'components/PressableOpacity';
import {COLORS} from 'constants/colors';
import headache from 'assets/symptoms/headache.png';
import {Done} from 'assets/svg';

type TPressableRoundIconProps = {
  marked: boolean;
  image?: ImageSourcePropType;
  onPress: () => void;
};

export const PressableRoundIcon = ({
  marked,
  image = headache,
  onPress,
}: TPressableRoundIconProps) => {
  return (
    <PressableOpacity
      onPress={() => {
        onPress();
      }}
      style={styles.impageWrapper}
    >
      <Image resizeMode="contain" source={image} style={styles.image} />
      {marked && (
        <View style={styles.doneMark}>
          <Done color={'white'} width={'100%'} height={'100%'} />
        </View>
      )}
    </PressableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  impageWrapper: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
  },
  doneMark: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 2,
  },
});
