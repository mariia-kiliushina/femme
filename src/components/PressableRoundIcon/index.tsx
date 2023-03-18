import {Image, ImageSourcePropType, StyleSheet, View} from 'react-native';
import {PressableOpacity} from 'components/PressableOpacity';
import {COLORS} from 'constants/colors';
import headache from 'assets/symptoms/headache.png';
import {Done} from 'assets/svg';
import {Typography} from 'components/Typography';
import {capitalizeFirstLetter} from 'src/helpers/capitalizeFirstLetter';

type TPressableRoundIconProps = {
  marked: boolean;
  size?: number;
  image?: ImageSourcePropType;
  label?: string;
  onPress: () => void;
};

export const PressableRoundIcon = ({
  marked,
  image = headache,
  onPress,
  label,
  size = 100,
}: TPressableRoundIconProps) => {
  return (
    <View>
      <PressableOpacity
        onPress={() => {
          onPress();
        }}
        style={styles.impageWrapper}
      >
        <Image
          resizeMode="contain"
          source={image}
          style={{height: `${size}%`, width: `${size}%`}}
        />
        {marked && (
          <View style={styles.doneMark}>
            <Done color={'white'} width={'100%'} height={'100%'} />
          </View>
        )}
      </PressableOpacity>
      {label && (
        <Typography textStyle={styles.textStyle}>
          {capitalizeFirstLetter(label)}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  impageWrapper: {
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.secondary,
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneMark: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 2,
  },
  textStyle: {
    textAlign: 'center',
  },
});
