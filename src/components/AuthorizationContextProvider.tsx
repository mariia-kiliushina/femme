import {createContext, FC, PropsWithChildren, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

const DEFAULT_AUTHORIZATION_TOKEN = 'NO_AUTHORIZATION_TOKEN';

interface AuthorizationContextValue {
  authorizationToken: string;
  setAuthorizationToken(newToken: string): void;
}

export const authorizationContext = createContext<AuthorizationContextValue>({
  authorizationToken: DEFAULT_AUTHORIZATION_TOKEN,
  setAuthorizationToken: () => {},
});

export const AuthorizationContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [authorizationToken, setAuthorizationToken] = useState(
    DEFAULT_AUTHORIZATION_TOKEN,
  );

  useEffect(() => {
    EncryptedStorage.getItem('authorizationToken').then(
      (authorizationTokenFromStorage) => {
        if (authorizationTokenFromStorage === null) {
          return;
        }
        setAuthorizationToken(authorizationTokenFromStorage);
      },
    );
  }, []);

  return (
    <authorizationContext.Provider
      value={{authorizationToken, setAuthorizationToken}}
    >
      {children}
    </authorizationContext.Provider>
  );
};
