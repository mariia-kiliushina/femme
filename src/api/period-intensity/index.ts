import * as Types from '../types';

import {gql} from '@apollo/client';
import {PeriodIntensitiesFieldsFragmentDoc} from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPeriodIntensitiesQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetPeriodIntensitiesQuery = {
  __typename?: 'Query';
  periodIntensities: Array<{__typename?: 'PeriodIntensity'; slug: string}>;
};

export const GetPeriodIntensitiesDocument = gql`
  query GetPeriodIntensities {
    periodIntensities {
      ...periodIntensitiesFields
    }
  }
  ${PeriodIntensitiesFieldsFragmentDoc}
`;

/**
 * __useGetPeriodIntensitiesQuery__
 *
 * To run a query within a React component, call `useGetPeriodIntensitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeriodIntensitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeriodIntensitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPeriodIntensitiesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPeriodIntensitiesQuery,
    GetPeriodIntensitiesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<
    GetPeriodIntensitiesQuery,
    GetPeriodIntensitiesQueryVariables
  >(GetPeriodIntensitiesDocument, options);
}
export function useGetPeriodIntensitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPeriodIntensitiesQuery,
    GetPeriodIntensitiesQueryVariables
  >,
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    GetPeriodIntensitiesQuery,
    GetPeriodIntensitiesQueryVariables
  >(GetPeriodIntensitiesDocument, options);
}
export type GetPeriodIntensitiesQueryHookResult = ReturnType<
  typeof useGetPeriodIntensitiesQuery
>;
export type GetPeriodIntensitiesLazyQueryHookResult = ReturnType<
  typeof useGetPeriodIntensitiesLazyQuery
>;
export type GetPeriodIntensitiesQueryResult = Apollo.QueryResult<
  GetPeriodIntensitiesQuery,
  GetPeriodIntensitiesQueryVariables
>;
