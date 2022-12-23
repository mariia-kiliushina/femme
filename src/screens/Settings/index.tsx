import {Text, View} from 'react-native';
import {useGetSymptomsQuery} from 'src/api/symptoms';
import {TabScreenProps} from 'src/navigation/types';

export const Settings = ({}: TabScreenProps<'Settings'>) => {
  const {data, error} = useGetSymptomsQuery();
  console.log('error >>', error);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {data?.symptoms.map((symptom) => (
        <Text key={symptom.id}>{symptom.name}</Text>
      ))}
    </View>
  );
};
