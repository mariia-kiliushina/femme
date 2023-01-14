import * as Types from '../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPeriodsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPeriodsQuery = { __typename?: 'Query', periodRecords: Array<{ __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } }> };


export const GetPeriodsDocument = gql`
    query GetPeriods {
  periodRecords {
    id
    date
    intensity {
      slug
    }
    mood {
      slug
    }
    symptoms {
      id
      name
    }
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useGetPeriodsQuery__
 *
 * To run a query within a React component, call `useGetPeriodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeriodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeriodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPeriodsQuery(baseOptions?: Apollo.QueryHookOptions<GetPeriodsQuery, GetPeriodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeriodsQuery, GetPeriodsQueryVariables>(GetPeriodsDocument, options);
      }
export function useGetPeriodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeriodsQuery, GetPeriodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeriodsQuery, GetPeriodsQueryVariables>(GetPeriodsDocument, options);
        }
export type GetPeriodsQueryHookResult = ReturnType<typeof useGetPeriodsQuery>;
export type GetPeriodsLazyQueryHookResult = ReturnType<typeof useGetPeriodsLazyQuery>;
export type GetPeriodsQueryResult = Apollo.QueryResult<GetPeriodsQuery, GetPeriodsQueryVariables>;