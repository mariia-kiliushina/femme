import * as Types from '../types';

import { gql } from '@apollo/client';
import { MedicationCourseFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMedicationCourseQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetMedicationCourseQuery = { __typename?: 'Query', medicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } };

export type GetMedicationCoursesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMedicationCoursesQuery = { __typename?: 'Query', medicationCourses: Array<{ __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } }> };

export type CreateMedicationCourseMutationVariables = Types.Exact<{
  endDate: Types.Scalars['String'];
  name: Types.Scalars['String'];
  startDate: Types.Scalars['String'];
  times: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type CreateMedicationCourseMutation = { __typename?: 'Mutation', createMedicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } };

export type UpdateMedicationCourseMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
  endDate?: Types.InputMaybe<Types.Scalars['String']>;
  name?: Types.InputMaybe<Types.Scalars['String']>;
  startDate?: Types.InputMaybe<Types.Scalars['String']>;
  times?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type UpdateMedicationCourseMutation = { __typename?: 'Mutation', updateMedicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } };

export type DeleteMedicationCourseMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type DeleteMedicationCourseMutation = { __typename?: 'Mutation', deleteMedicationCourse: { __typename?: 'MedicationCourse', id: number, name: string, user: { __typename?: 'User', id: number, username: string } } };


export const GetMedicationCourseDocument = gql`
    query GetMedicationCourse($id: Int!) {
  medicationCourse(id: $id) {
    ...medicationCourseFields
  }
}
    ${MedicationCourseFieldsFragmentDoc}`;

/**
 * __useGetMedicationCourseQuery__
 *
 * To run a query within a React component, call `useGetMedicationCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicationCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicationCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMedicationCourseQuery(baseOptions: Apollo.QueryHookOptions<GetMedicationCourseQuery, GetMedicationCourseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicationCourseQuery, GetMedicationCourseQueryVariables>(GetMedicationCourseDocument, options);
      }
export function useGetMedicationCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicationCourseQuery, GetMedicationCourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicationCourseQuery, GetMedicationCourseQueryVariables>(GetMedicationCourseDocument, options);
        }
export type GetMedicationCourseQueryHookResult = ReturnType<typeof useGetMedicationCourseQuery>;
export type GetMedicationCourseLazyQueryHookResult = ReturnType<typeof useGetMedicationCourseLazyQuery>;
export type GetMedicationCourseQueryResult = Apollo.QueryResult<GetMedicationCourseQuery, GetMedicationCourseQueryVariables>;
export const GetMedicationCoursesDocument = gql`
    query GetMedicationCourses {
  medicationCourses {
    ...medicationCourseFields
  }
}
    ${MedicationCourseFieldsFragmentDoc}`;

/**
 * __useGetMedicationCoursesQuery__
 *
 * To run a query within a React component, call `useGetMedicationCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMedicationCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMedicationCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMedicationCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetMedicationCoursesQuery, GetMedicationCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMedicationCoursesQuery, GetMedicationCoursesQueryVariables>(GetMedicationCoursesDocument, options);
      }
export function useGetMedicationCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMedicationCoursesQuery, GetMedicationCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMedicationCoursesQuery, GetMedicationCoursesQueryVariables>(GetMedicationCoursesDocument, options);
        }
export type GetMedicationCoursesQueryHookResult = ReturnType<typeof useGetMedicationCoursesQuery>;
export type GetMedicationCoursesLazyQueryHookResult = ReturnType<typeof useGetMedicationCoursesLazyQuery>;
export type GetMedicationCoursesQueryResult = Apollo.QueryResult<GetMedicationCoursesQuery, GetMedicationCoursesQueryVariables>;
export const CreateMedicationCourseDocument = gql`
    mutation CreateMedicationCourse($endDate: String!, $name: String!, $startDate: String!, $times: [String!]!) {
  createMedicationCourse(
    input: {endDate: $endDate, name: $name, startDate: $startDate, times: $times}
  ) {
    ...medicationCourseFields
  }
}
    ${MedicationCourseFieldsFragmentDoc}`;
export type CreateMedicationCourseMutationFn = Apollo.MutationFunction<CreateMedicationCourseMutation, CreateMedicationCourseMutationVariables>;

/**
 * __useCreateMedicationCourseMutation__
 *
 * To run a mutation, you first call `useCreateMedicationCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMedicationCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMedicationCourseMutation, { data, loading, error }] = useCreateMedicationCourseMutation({
 *   variables: {
 *      endDate: // value for 'endDate'
 *      name: // value for 'name'
 *      startDate: // value for 'startDate'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useCreateMedicationCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateMedicationCourseMutation, CreateMedicationCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMedicationCourseMutation, CreateMedicationCourseMutationVariables>(CreateMedicationCourseDocument, options);
      }
export type CreateMedicationCourseMutationHookResult = ReturnType<typeof useCreateMedicationCourseMutation>;
export type CreateMedicationCourseMutationResult = Apollo.MutationResult<CreateMedicationCourseMutation>;
export type CreateMedicationCourseMutationOptions = Apollo.BaseMutationOptions<CreateMedicationCourseMutation, CreateMedicationCourseMutationVariables>;
export const UpdateMedicationCourseDocument = gql`
    mutation UpdateMedicationCourse($id: Int!, $endDate: String, $name: String, $startDate: String, $times: [String!]) {
  updateMedicationCourse(
    input: {id: $id, endDate: $endDate, name: $name, startDate: $startDate, times: $times}
  ) {
    ...medicationCourseFields
  }
}
    ${MedicationCourseFieldsFragmentDoc}`;
export type UpdateMedicationCourseMutationFn = Apollo.MutationFunction<UpdateMedicationCourseMutation, UpdateMedicationCourseMutationVariables>;

/**
 * __useUpdateMedicationCourseMutation__
 *
 * To run a mutation, you first call `useUpdateMedicationCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMedicationCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMedicationCourseMutation, { data, loading, error }] = useUpdateMedicationCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      endDate: // value for 'endDate'
 *      name: // value for 'name'
 *      startDate: // value for 'startDate'
 *      times: // value for 'times'
 *   },
 * });
 */
export function useUpdateMedicationCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMedicationCourseMutation, UpdateMedicationCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMedicationCourseMutation, UpdateMedicationCourseMutationVariables>(UpdateMedicationCourseDocument, options);
      }
export type UpdateMedicationCourseMutationHookResult = ReturnType<typeof useUpdateMedicationCourseMutation>;
export type UpdateMedicationCourseMutationResult = Apollo.MutationResult<UpdateMedicationCourseMutation>;
export type UpdateMedicationCourseMutationOptions = Apollo.BaseMutationOptions<UpdateMedicationCourseMutation, UpdateMedicationCourseMutationVariables>;
export const DeleteMedicationCourseDocument = gql`
    mutation DeleteMedicationCourse($id: Int!) {
  deleteMedicationCourse(id: $id) {
    ...medicationCourseFields
  }
}
    ${MedicationCourseFieldsFragmentDoc}`;
export type DeleteMedicationCourseMutationFn = Apollo.MutationFunction<DeleteMedicationCourseMutation, DeleteMedicationCourseMutationVariables>;

/**
 * __useDeleteMedicationCourseMutation__
 *
 * To run a mutation, you first call `useDeleteMedicationCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMedicationCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMedicationCourseMutation, { data, loading, error }] = useDeleteMedicationCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMedicationCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMedicationCourseMutation, DeleteMedicationCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMedicationCourseMutation, DeleteMedicationCourseMutationVariables>(DeleteMedicationCourseDocument, options);
      }
export type DeleteMedicationCourseMutationHookResult = ReturnType<typeof useDeleteMedicationCourseMutation>;
export type DeleteMedicationCourseMutationResult = Apollo.MutationResult<DeleteMedicationCourseMutation>;
export type DeleteMedicationCourseMutationOptions = Apollo.BaseMutationOptions<DeleteMedicationCourseMutation, DeleteMedicationCourseMutationVariables>;