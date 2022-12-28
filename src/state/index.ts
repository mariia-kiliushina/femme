import {makeVar} from '@apollo/client';
export const DEFAULT_AUTHORIZATION_TOKEN = 'NO_AUTHORIZATION_TOKEN';
export const authorizationToken = makeVar(DEFAULT_AUTHORIZATION_TOKEN);
