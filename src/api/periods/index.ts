import * as Types from '../types';

import { gql } from '@apollo/client';
import { PeriodRecordFieldsFragmentDoc } from '../fragments';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPeriodRecordQueryVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['Int']>;
  date?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPeriodRecordQuery = { __typename?: 'Query', periodRecord: { __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } } };

export type GetPeriodRecordsQueryVariables = Types.Exact<{
  date?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetPeriodRecordsQuery = { __typename?: 'Query', periodRecords: Array<{ __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } }> };

export type CreatePeriodRecordMutationVariables = Types.Exact<{
  date: Types.Scalars['String'];
  intensitySlug: Types.Scalars['String'];
  moodSlug: Types.Scalars['String'];
  symptomsIds: Array<Types.Scalars['Int']> | Types.Scalars['Int'];
}>;


export type CreatePeriodRecordMutation = { __typename?: 'Mutation', createPeriodRecord: { __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } } };

export type UpdatePeriodRecordMutationVariables = Types.Exact<{
  date?: Types.InputMaybe<Types.Scalars['String']>;
  id: Types.Scalars['Int'];
  intensitySlug?: Types.InputMaybe<Types.Scalars['String']>;
  moodSlug?: Types.InputMaybe<Types.Scalars['String']>;
  symptomsIds?: Types.InputMaybe<Array<Types.Scalars['Int']> | Types.Scalars['Int']>;
}>;


export type UpdatePeriodRecordMutation = { __typename?: 'Mutation', updatePeriodRecord: { __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } } };

export type DeletePeriodRecordMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type DeletePeriodRecordMutation = { __typename?: 'Mutation', deletePeriodRecord: { __typename?: 'PeriodRecord', id: number, date: string, intensity: { __typename?: 'PeriodIntensity', slug: string }, mood: { __typename?: 'Mood', slug: string }, symptoms: Array<{ __typename?: 'Symptom', id: number, name: string }>, user: { __typename?: 'User', id: number, username: string } } };


export const GetPeriodRecordDocument = gql`
    query GetPeriodRecord($id: Int, $date: String) {
  periodRecord(id: $id, date: $date) {
    ...periodRecordFields
  }
}
    ${PeriodRecordFieldsFragmentDoc}`;

/**
 * __useGetPeriodRecordQuery__
 *
 * To run a query within a React component, call `useGetPeriodRecordQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPeriodRecordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPeriodRecordQuery({
 *   variables: {
 *      id: // value for 'id'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetPeriodRecordQuery(baseOptions?: Apollo.QueryHookOptions<GetPeriodRecordQuery, GetPeriodRecordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPeriodRecordQuery, GetPeriodRecordQueryVariables>(GetPeriodRecordDocument, options);
      }
export function useGetPeriodRecordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPeriodRecordQuery, GetPeriodRecordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPeriodRecordQuery, GetPeriodRecordQueryVariables>(GetPeriodRecordDocument, options);
        }
export type GetPeriodRecordQueryHookResult = ReturnType<typeof useGetPeriodRecordQuery>;
export type GetPeriodRecordLazyQueryHookResult = ReturnType<typeof useGetPeriodRecordLazyQuery>;
export type GetPeriodRecordQueryResult = Apollo.QueryResult<GetPeriodRecordQuery, GetPeriodRecordQueryVariables>;
export const GetPeriodRecordsDocument = gql`
    query GetPeriodRecords($date: String) {
  periodRecords(date: $date) {
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
 *      date: // value for 'date'
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
export const CreatePeriodRecordDocument = gql`
    mutation CreatePeriodRecord($date: String!, $intensitySlug: String!, $moodSlug: String!, $symptomsIds: [Int!]!) {
  createPeriodRecord(
    input: {date: $date, intensitySlug: $intensitySlug, moodSlug: $moodSlug, symptomsIds: $symptomsIds}
  ) {
    ...periodRecordFields
  }
}
    ${PeriodRecordFieldsFragmentDoc}`;
export type CreatePeriodRecordMutationFn = Apollo.MutationFunction<CreatePeriodRecordMutation, CreatePeriodRecordMutationVariables>;

/**
 * __useCreatePeriodRecordMutation__
 *
 * To run a mutation, you first call `useCreatePeriodRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePeriodRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPeriodRecordMutation, { data, loading, error }] = useCreatePeriodRecordMutation({
 *   variables: {
 *      date: // value for 'date'
 *      intensitySlug: // value for 'intensitySlug'
 *      moodSlug: // value for 'moodSlug'
 *      symptomsIds: // value for 'symptomsIds'
 *   },
 * });
 */
export function useCreatePeriodRecordMutation(baseOptions?: Apollo.MutationHookOptions<CreatePeriodRecordMutation, CreatePeriodRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePeriodRecordMutation, CreatePeriodRecordMutationVariables>(CreatePeriodRecordDocument, options);
      }
export type CreatePeriodRecordMutationHookResult = ReturnType<typeof useCreatePeriodRecordMutation>;
export type CreatePeriodRecordMutationResult = Apollo.MutationResult<CreatePeriodRecordMutation>;
export type CreatePeriodRecordMutationOptions = Apollo.BaseMutationOptions<CreatePeriodRecordMutation, CreatePeriodRecordMutationVariables>;
export const UpdatePeriodRecordDocument = gql`
    mutation UpdatePeriodRecord($date: String, $id: Int!, $intensitySlug: String, $moodSlug: String, $symptomsIds: [Int!]) {
  updatePeriodRecord(
    input: {id: $id, date: $date, intensitySlug: $intensitySlug, moodSlug: $moodSlug, symptomsIds: $symptomsIds}
  ) {
    ...periodRecordFields
  }
}
    ${PeriodRecordFieldsFragmentDoc}`;
export type UpdatePeriodRecordMutationFn = Apollo.MutationFunction<UpdatePeriodRecordMutation, UpdatePeriodRecordMutationVariables>;

/**
 * __useUpdatePeriodRecordMutation__
 *
 * To run a mutation, you first call `useUpdatePeriodRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePeriodRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePeriodRecordMutation, { data, loading, error }] = useUpdatePeriodRecordMutation({
 *   variables: {
 *      date: // value for 'date'
 *      id: // value for 'id'
 *      intensitySlug: // value for 'intensitySlug'
 *      moodSlug: // value for 'moodSlug'
 *      symptomsIds: // value for 'symptomsIds'
 *   },
 * });
 */
export function useUpdatePeriodRecordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePeriodRecordMutation, UpdatePeriodRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePeriodRecordMutation, UpdatePeriodRecordMutationVariables>(UpdatePeriodRecordDocument, options);
      }
export type UpdatePeriodRecordMutationHookResult = ReturnType<typeof useUpdatePeriodRecordMutation>;
export type UpdatePeriodRecordMutationResult = Apollo.MutationResult<UpdatePeriodRecordMutation>;
export type UpdatePeriodRecordMutationOptions = Apollo.BaseMutationOptions<UpdatePeriodRecordMutation, UpdatePeriodRecordMutationVariables>;
export const DeletePeriodRecordDocument = gql`
    mutation DeletePeriodRecord($id: Int!) {
  deletePeriodRecord(id: $id) {
    ...periodRecordFields
  }
}
    ${PeriodRecordFieldsFragmentDoc}`;
export type DeletePeriodRecordMutationFn = Apollo.MutationFunction<DeletePeriodRecordMutation, DeletePeriodRecordMutationVariables>;

/**
 * __useDeletePeriodRecordMutation__
 *
 * To run a mutation, you first call `useDeletePeriodRecordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePeriodRecordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePeriodRecordMutation, { data, loading, error }] = useDeletePeriodRecordMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePeriodRecordMutation(baseOptions?: Apollo.MutationHookOptions<DeletePeriodRecordMutation, DeletePeriodRecordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePeriodRecordMutation, DeletePeriodRecordMutationVariables>(DeletePeriodRecordDocument, options);
      }
export type DeletePeriodRecordMutationHookResult = ReturnType<typeof useDeletePeriodRecordMutation>;
export type DeletePeriodRecordMutationResult = Apollo.MutationResult<DeletePeriodRecordMutation>;
export type DeletePeriodRecordMutationOptions = Apollo.BaseMutationOptions<DeletePeriodRecordMutation, DeletePeriodRecordMutationVariables>;