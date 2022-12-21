import {RootStackScreenProps} from 'src/navigation/types';
import {StyleSheet, Text, View} from 'react-native';
import {GoBackButton} from 'src/components/GoBackButton';
import {useGetUserQuery} from 'src/api/users';

export const Profile = ({navigation}: RootStackScreenProps<'Profile'>) => {
  const {data, error} = useGetUserQuery({variables: {id: 1}});
  console.log('error >>', error);
  return (
    <View style={styles.container}>
      <Text>Hello WORLD</Text>
      <Text>ID:{data?.user.id}</Text>
      <Text>Username:{data?.user.username}</Text>
      <GoBackButton type="flat" onPress={navigation.goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 20,
    backgroundColor: 'white',
    flex: 1,
  },
});
