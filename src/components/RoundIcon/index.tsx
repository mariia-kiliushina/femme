import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  ImageSourcePropType,
} from 'react-native';
import { FC } from 'react';
import COLORS from 'src/constants/colors';
type Props = {
  marked?: boolean;
  source: ImageSourcePropType;
  symptomText: string;
  value?: string | undefined;
  onChange?(...event: any[]): void;
  optionValue?: string;
};

const RoundIcon: FC<Props> = (props) => {
  const { marked = false, optionValue, symptomText, source, onChange = () => {} } = props;
  const { symptomImage, standard } = styles;

  const isOptionSelected =
    (props.value === props.optionValue &&
      props.value !== undefined &&
      props.optionValue !== undefined) ||
    marked;

  const combinedStyles = StyleSheet.flatten([symptomImage, standard]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onChange(optionValue);
      }}
    >
      <View style={[styles.container, { padding: 2 }]}>
        <Image source={source} style={combinedStyles} />
        {isOptionSelected && (
          <View style={styles.mark}>
            <Image source={require('../../assets/marked.png')} style={{ height: 12, width: 12 }} />
          </View>
        )}
        <Text style={styles.symptomText}>{symptomText}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 80,
    width: 80,
  },
  symptomImage: {
    borderRadius: 50,
    height: 62,
    width: 62,
  },
  standard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mark: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 50,
    top: 40,
    left: 58,
    backgroundColor: COLORS.colorSecondaryDark,
  },
  symptomText: {
    position: 'absolute',
    top: 65,
    height: 16,
    fontSize: 12,
  },
});

export default RoundIcon;
