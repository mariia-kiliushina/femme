import * as Types from '../types';

import { gql } from '@apollo/client';
import { MedicationCourseTakingFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMedicationCourseTakingQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetMedicationCourseTakingQuery = { __typename?: 'Query', medicationCoursesTaking: { __typename?: 'MedicationCourseTaking', id: number, date: string, isTaken: boolean, time: string, medicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } } };

export type GetMedicationCoursesTakingsQueryVariables = Types.Exact<{
  dates: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type GetMedicationCoursesTakingsQuery = { __typename?: 'Query', medicationCoursesTakings: Array<{ __typename?: 'MedicationCourseTaking', id: number, date: string, isTaken: boolean, time: string, medicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } }> };

export type UpdateMedicationCourseTakingMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  isTaken: Types.Scalars['Boolean'];
}>;


export type UpdateMedicationCourseTakingMutation = { __typename?: 'Mutation', updateMedicationCoursesTaking: { __typename?: 'MedicationCourseTaking', id: number, date: string, isTaken: boolean, time: string, medicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } } };


export const GetMedicationCourseTakingDocument = gql`
    query GetMedicationCourseTaking($id: Int!) {
  medicationCoursesTaking(id: $id) {
    ...medicationCourseTakingFields
  }
}
    ${MedicationCourseTakingFieldsFragmentDoc}`;

/**
 * __useGetMedicationCourseTakingQuery__
 *
 * To run a query within a React component, call `useGetMedicationCourseTakingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicationCourseTakingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicationCourseTakingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMedicationCourseTakingQuery(baseOptions: Apollo.QueryHookOptions<GetMedicationCourseTakingQuery, GetMedicationCourseTakingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicationCourseTakingQuery, GetMedicationCourseTakingQueryVariables>(GetMedicationCourseTakingDocument, options);
      }
export function useGetMedicationCourseTakingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicationCourseTakingQuery, GetMedicationCourseTakingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicationCourseTakingQuery, GetMedicationCourseTakingQueryVariables>(GetMedicationCourseTakingDocument, options);
        }
export type GetMedicationCourseTakingQueryHookResult = ReturnType<typeof useGetMedicationCourseTakingQuery>;
export type GetMedicationCourseTakingLazyQueryHookResult = ReturnType<typeof useGetMedicationCourseTakingLazyQuery>;
export type GetMedicationCourseTakingQueryResult = Apollo.QueryResult<GetMedicationCourseTakingQuery, GetMedicationCourseTakingQueryVariables>;
export const GetMedicationCoursesTakingsDocument = gql`
    query GetMedicationCoursesTakings($dates: [String!]!) {
  medicationCoursesTakings(dates: $dates) {
    ...medicationCourseTakingFields
  }
}
    ${MedicationCourseTakingFieldsFragmentDoc}`;

/**
 * __useGetMedicationCoursesTakingsQuery__
 *
 * To run a query within a React component, call `useGetMedicationCoursesTakingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicationCoursesTakingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicationCoursesTakingsQuery({
 *   variables: {
 *      dates: // value for 'dates'
 *   },
 * });
 */
export function useGetMedicationCoursesTakingsQuery(baseOptions: Apollo.QueryHookOptions<GetMedicationCoursesTakingsQuery, GetMedicationCoursesTakingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicationCoursesTakingsQuery, GetMedicationCoursesTakingsQueryVariables>(GetMedicationCoursesTakingsDocument, options);
      }
export function useGetMedicationCoursesTakingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicationCoursesTakingsQuery, GetMedicationCoursesTakingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicationCoursesTakingsQuery, GetMedicationCoursesTakingsQueryVariables>(GetMedicationCoursesTakingsDocument, options);
        }
export type GetMedicationCoursesTakingsQueryHookResult = ReturnType<typeof useGetMedicationCoursesTakingsQuery>;
export type GetMedicationCoursesTakingsLazyQueryHookResult = ReturnType<typeof useGetMedicationCoursesTakingsLazyQuery>;
export type GetMedicationCoursesTakingsQueryResult = Apollo.QueryResult<GetMedicationCoursesTakingsQuery, GetMedicationCoursesTakingsQueryVariables>;
export const UpdateMedicationCourseTakingDocument = gql`
    mutation UpdateMedicationCourseTaking($id: Int!, $isTaken: Boolean!) {
  updateMedicationCoursesTaking(input: {id: $id, isTaken: $isTaken}) {
    ...medicationCourseTakingFields
  }
}
    ${MedicationCourseTakingFieldsFragmentDoc}`;
export type UpdateMedicationCourseTakingMutationFn = Apollo.MutationFunction<UpdateMedicationCourseTakingMutation, UpdateMedicationCourseTakingMutationVariables>;

/**
 * __useUpdateMedicationCourseTakingMutation__
 *
 * To run a mutation, you first call `useUpdateMedicationCourseTakingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicationCourseTakingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicationCourseTakingMutation, { data, loading, error }] = useUpdateMedicationCourseTakingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isTaken: // value for 'isTaken'
 *   },
 * });
 */
export function useUpdateMedicationCourseTakingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicationCourseTakingMutation, UpdateMedicationCourseTakingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicationCourseTakingMutation, UpdateMedicationCourseTakingMutationVariables>(UpdateMedicationCourseTakingDocument, options);
      }
export type UpdateMedicationCourseTakingMutationHookResult = ReturnType<typeof useUpdateMedicationCourseTakingMutation>;
export type UpdateMedicationCourseTakingMutationResult = Apollo.MutationResult<UpdateMedicationCourseTakingMutation>;
export type UpdateMedicationCourseTakingMutationOptions = Apollo.BaseMutationOptions<UpdateMedicationCourseTakingMutation, UpdateMedicationCourseTakingMutationVariables>;