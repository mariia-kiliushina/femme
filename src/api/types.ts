export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthorizeInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreatePeriodRecordInput = {
  date: Scalars['String'];
  intensitySlug: Scalars['String'];
  moodSlug: Scalars['String'];
  symptomsIds: Array<Scalars['Int']>;
};

export type CreateUserInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mood = {
  __typename?: 'Mood';
  slug: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authorize: Scalars['String'];
  createPeriodRecord: PeriodRecord;
  createUser: User;
  deletePeriodRecord: PeriodRecord;
  deleteUser: User;
  updatePeriodRecord: PeriodRecord;
  updateUser: User;
};

export type MutationAuthorizeArgs = {
  input: AuthorizeInput;
};

export type MutationCreatePeriodRecordArgs = {
  input: CreatePeriodRecordInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeletePeriodRecordArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationUpdatePeriodRecordArgs = {
  input: UpdatePeriodRecordInput;
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PeriodIntensity = {
  __typename?: 'PeriodIntensity';
  slug: Scalars['String'];
};

export type PeriodRecord = {
  __typename?: 'PeriodRecord';
  date: Scalars['String'];
  id: Scalars['Int'];
  intensity: PeriodIntensity;
  mood: Mood;
  symptoms: Array<Symptom>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  mood: Mood;
  moods: Array<Mood>;
  periodIntensities: Array<PeriodIntensity>;
  periodIntensity: PeriodIntensity;
  periodRecord: PeriodRecord;
  periodRecords: Array<PeriodRecord>;
  symptom: Symptom;
  symptoms: Array<Symptom>;
  user: User;
  users: Array<User>;
};

export type QueryMoodArgs = {
  slug: Scalars['String'];
};

export type QueryPeriodIntensityArgs = {
  slug: Scalars['String'];
};

export type QueryPeriodRecordArgs = {
  id: Scalars['Int'];
};

export type QueryPeriodRecordsArgs = {
  date?: InputMaybe<Scalars['String']>;
};

export type QuerySymptomArgs = {
  id: Scalars['Int'];
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  ids?: InputMaybe<Array<Scalars['Int']>>;
  username?: InputMaybe<Scalars['String']>;
};

export type Symptom = {
  __typename?: 'Symptom';
  id: Scalars['Int'];
  name: Scalars['String'];
  periodRecords: Array<PeriodRecord>;
};

export type UpdatePeriodRecordInput = {
  date?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  intensitySlug?: InputMaybe<Scalars['String']>;
  moodSlug?: InputMaybe<Scalars['String']>;
  symptomsIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type UpdateUserInput = {
  id: Scalars['Int'];
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  password: Scalars['String'];
  username: Scalars['String'];
};
