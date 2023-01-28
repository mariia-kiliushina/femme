import * as Types from './types';

import {gql} from '@apollo/client';
export type PeriodRecordFieldsFragment = {
  __typename?: 'PeriodRecord';
  id: number;
  date: string;
  intensity: {__typename?: 'PeriodIntensity'; slug: string};
  mood: {__typename?: 'Mood'; slug: string};
  symptoms: Array<{__typename?: 'Symptom'; id: number; name: string}>;
  user: {__typename?: 'User'; id: number; username: string};
};

export type UserFieldsFragment = {
  __typename?: 'User';
  id: number;
  username: string;
};

export type SymptomFieldsFragment = {
  __typename?: 'Symptom';
  id: number;
  name: string;
};

export type MoodFieldsFragment = {__typename?: 'Mood'; slug: string};

export type PeriodIntensitiesFieldsFragment = {
  __typename?: 'PeriodIntensity';
  slug: string;
};

export const PeriodRecordFieldsFragmentDoc = gql`
  fragment periodRecordFields on PeriodRecord {
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
`;
export const UserFieldsFragmentDoc = gql`
  fragment userFields on User {
    id
    username
  }
`;
export const SymptomFieldsFragmentDoc = gql`
  fragment symptomFields on Symptom {
    id
    name
  }
`;
export const MoodFieldsFragmentDoc = gql`
  fragment moodFields on Mood {
    slug
  }
`;
export const PeriodIntensitiesFieldsFragmentDoc = gql`
  fragment periodIntensitiesFields on PeriodIntensity {
    slug
  }
`;
