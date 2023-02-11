import * as Types from '../types';

import { gql } from '@apollo/client';
import { MoodFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMoodsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMoodsQuery = { __typename?: 'Query', moods: Array<{ __typename?: 'Mood', slug: string }> };


export const GetMoodsDocument = gql`
    query GetMoods {
  moods {
    ...moodFields
  }
}
    ${MoodFieldsFragmentDoc}`;

/**
 * __useGetMoodsQuery__
 *
 * To run a query within a React component, call `useGetMoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMoodsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMoodsQuery(baseOptions?: Apollo.QueryHookOptions<GetMoodsQuery, GetMoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMoodsQuery, GetMoodsQueryVariables>(GetMoodsDocument, options);
      }
export function useGetMoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMoodsQuery, GetMoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMoodsQuery, GetMoodsQueryVariables>(GetMoodsDocument, options);
        }
export type GetMoodsQueryHookResult = ReturnType<typeof useGetMoodsQuery>;
export type GetMoodsLazyQueryHookResult = ReturnType<typeof useGetMoodsLazyQuery>;
export type GetMoodsQueryResult = Apollo.QueryResult<GetMoodsQuery, GetMoodsQueryVariables>;