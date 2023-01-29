import * as Types from '../types';

import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthorizeMutationVariables = Types.Exact<{
  username: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;

export type AuthorizeMutation = {__typename?: 'Mutation'; authorize: string};

export const AuthorizeDocument = gql`
  mutation Authorize($username: String!, $password: String!) {
    authorize(input: {username: $username, password: $password})
  }
`;
export type AuthorizeMutationFn = Apollo.MutationFunction<
  AuthorizeMutation,
  AuthorizeMutationVariables
>;

/**
 * __useAuthorizeMutation__
 *
 * To run a mutation, you first call `useAuthorizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizeMutation, { data, loading, error }] = useAuthorizeMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthorizeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AuthorizeMutation,
    AuthorizeMutationVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useMutation<AuthorizeMutation, AuthorizeMutationVariables>(
    AuthorizeDocument,
    options,
  );
}
export type AuthorizeMutationHookResult = ReturnType<
  typeof useAuthorizeMutation
>;
export type AuthorizeMutationResult = Apollo.MutationResult<AuthorizeMutation>;
export type AuthorizeMutationOptions = Apollo.BaseMutationOptions<
  AuthorizeMutation,
  AuthorizeMutationVariables
>;
