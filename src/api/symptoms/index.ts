import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSymptomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSymptomsQuery = { __typename?: 'Query', symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }> };


export const GetSymptomsDocument = gql`
    query GetSymptoms {
  symptoms {
    id
    name
  }
}
    `;

/**
 * __useGetSymptomsQuery__
 *
 * To run a query within a React component, call `useGetSymptomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSymptomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSymptomsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSymptomsQuery(baseOptions?: Apollo.QueryHookOptions<GetSymptomsQuery, GetSymptomsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSymptomsQuery, GetSymptomsQueryVariables>(GetSymptomsDocument, options);
      }
export function useGetSymptomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSymptomsQuery, GetSymptomsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSymptomsQuery, GetSymptomsQueryVariables>(GetSymptomsDocument, options);
        }
export type GetSymptomsQueryHookResult = ReturnType<typeof useGetSymptomsQuery>;
export type GetSymptomsLazyQueryHookResult = ReturnType<typeof useGetSymptomsLazyQuery>;
export type GetSymptomsQueryResult = Apollo.QueryResult<GetSymptomsQuery, GetSymptomsQueryVariables>;