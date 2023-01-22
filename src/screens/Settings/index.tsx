import {Typography} from 'components/Typography';
import {Text} from 'react-native';
import {useGetSymptomsQuery} from 'src/api/symptoms';
import {TabScreenProps} from 'src/navigation/types';

import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';
import {useGetUserQuery} from 'api/users';
import {Container} from 'components/Container';
import {Button} from 'components/Button';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

export const Settings = ({}: TabScreenProps<'Settings'>) => {
  const authorizationTokenValue = useReactiveVar(authorizationToken);
  const {data} = useGetSymptomsQuery();

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});

  if (getAuthorizedUserQueryResult.data === undefined) return null;

  const authorizedUser = getAuthorizedUserQueryResult.data.user;
  return (
    <Container>
      {data?.symptoms.map((symptom) => (
        <Text key={symptom.id}>{symptom.name}</Text>
      ))}
      <Typography>ID:{authorizedUser.id}</Typography>
      <Typography>Username:{authorizedUser.username}</Typography>
      <Button
        title="
       Log out"
        onPress={onLogOut}
      />
      <Button
        title="
        Reset
        token
        to
        default"
        onPress={() => authorizationToken(DEFAULT_AUTHORIZATION_TOKEN)}
      />
      <Typography>{authorizationTokenValue}</Typography>
    </Container>
  );
};
