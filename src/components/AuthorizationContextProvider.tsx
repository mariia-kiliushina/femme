import {createContext, FC, PropsWithChildren, useState} from 'react';

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

  return (
    <authorizationContext.Provider
      value={{authorizationToken, setAuthorizationToken}}>
      {children}
    </authorizationContext.Provider>
  );
};
