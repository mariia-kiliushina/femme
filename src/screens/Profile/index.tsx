import EncryptedStorage from 'react-native-encrypted-storage';
import {useReactiveVar} from '@apollo/client';
import {Button} from 'components/Button';
import {Container} from 'components/Container';
import {TabScreenProps} from 'src/navigation/types';
import {authorizationToken, DEFAULT_AUTHORIZATION_TOKEN} from 'src/state';
import {useGetUserQuery} from 'api/users';

const onLogOut = async () => {
  await EncryptedStorage.removeItem('authorizationToken');
  authorizationToken(DEFAULT_AUTHORIZATION_TOKEN);
};

export const Profile = ({}: TabScreenProps<'Profile'>) => {
  const authorizationTokenValue = useReactiveVar(authorizationToken);
  authorizationTokenValue;

  const getAuthorizedUserQueryResult = useGetUserQuery({variables: {id: 0}});

  if (getAuthorizedUserQueryResult.data === undefined) return null;

  const authorizedUser = getAuthorizedUserQueryResult.data.user;
  authorizedUser;
  return (
    <Container>
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
    </Container>
  );
};
