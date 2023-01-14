import * as Types from '../types';

import { gql } from '@apollo/client';
import { PeriodRecordFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPeriodRecordsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPeriodRecordsQuery = { __typename?: 'Query', periodRecords: Array<{ __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } }> };


export const GetPeriodRecordsDocument = gql`
    query GetPeriodRecords {
  periodRecords {
    ...periodRecordFields
  }
}
    ${PeriodRecordFieldsFragmentDoc}`;

/**
 * __useGetPeriodRecordsQuery__
 *
 * To run a query within a React component, call `useGetPeriodRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeriodRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeriodRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPeriodRecordsQuery(baseOptions?: Apollo.QueryHookOptions<GetPeriodRecordsQuery, GetPeriodRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeriodRecordsQuery, GetPeriodRecordsQueryVariables>(GetPeriodRecordsDocument, options);
      }
export function useGetPeriodRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeriodRecordsQuery, GetPeriodRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeriodRecordsQuery, GetPeriodRecordsQueryVariables>(GetPeriodRecordsDocument, options);
        }
export type GetPeriodRecordsQueryHookResult = ReturnType<typeof useGetPeriodRecordsQuery>;
export type GetPeriodRecordsLazyQueryHookResult = ReturnType<typeof useGetPeriodRecordsLazyQuery>;
export type GetPeriodRecordsQueryResult = Apollo.QueryResult<GetPeriodRecordsQuery, GetPeriodRecordsQueryVariables>;