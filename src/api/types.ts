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

export type ActivityCategory = {
  __typename?: 'ActivityCategory';
  board: Board;
  id: Scalars['Int'];
  measurementType: ActivityCategoryMeasurementType;
  name: Scalars['String'];
  owner: User;
  unit?: Maybe<Scalars['String']>;
};

export type ActivityCategoryMeasurementType = {
  __typename?: 'ActivityCategoryMeasurementType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type ActivityRecord = {
  __typename?: 'ActivityRecord';
  booleanValue?: Maybe<Scalars['Boolean']>;
  category: ActivityCategory;
  comment: Scalars['String'];
  date: Scalars['String'];
  id: Scalars['Int'];
  quantitativeValue?: Maybe<Scalars['Float']>;
};

export type AddMemberInput = {
  boardId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type AuthorizeInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Board = {
  __typename?: 'Board';
  admins: Array<User>;
  id: Scalars['Int'];
  members: Array<User>;
  name: Scalars['String'];
  subject: BoardSubject;
};

export type BoardSubject = {
  __typename?: 'BoardSubject';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type BudgetCategory = {
  __typename?: 'BudgetCategory';
  board: Board;
  id: Scalars['Int'];
  name: Scalars['String'];
  type: BudgetCategoryType;
};

export type BudgetCategoryType = {
  __typename?: 'BudgetCategoryType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type BudgetRecord = {
  __typename?: 'BudgetRecord';
  amount: Scalars['Float'];
  category: BudgetCategory;
  date: Scalars['String'];
  id: Scalars['Int'];
  isTrashed: Scalars['Boolean'];
};

export type CreateActivityCategoryInput = {
  boardId: Scalars['Int'];
  measurementTypeId: Scalars['Int'];
  name: Scalars['String'];
  unit?: InputMaybe<Scalars['String']>;
};

export type CreateActivityRecordInput = {
  booleanValue?: InputMaybe<Scalars['Boolean']>;
  categoryId: Scalars['Int'];
  comment: Scalars['String'];
  date: Scalars['String'];
  quantitativeValue?: InputMaybe<Scalars['Float']>;
};

export type CreateBoardInput = {
  name: Scalars['String'];
  subjectId: Scalars['Int'];
};

export type CreateBudgetCategoryInput = {
  boardId: Scalars['Int'];
  name: Scalars['String'];
  typeId: Scalars['Int'];
};

export type CreateBudgetRecordInput = {
  amount: Scalars['Float'];
  categoryId: Scalars['Int'];
  date: Scalars['String'];
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
  addBoardMember: Board;
  authorize: Scalars['String'];
  createActivityCategory: ActivityCategory;
  createActivityRecord: ActivityRecord;
  createBoard: Board;
  createBudgetCategory: BudgetCategory;
  createBudgetRecord: BudgetRecord;
  createPeriodRecord: PeriodRecord;
  createUser: User;
  deleteActivityCategory: ActivityCategory;
  deleteActivityRecord: ActivityRecord;
  deleteBoard: Board;
  deleteBudgetCategory: BudgetCategory;
  deleteBudgetRecord: BudgetRecord;
  deletePeriodRecord: PeriodRecord;
  deleteUser: User;
  removeBoardMember: Board;
  updateActivityCategory: ActivityCategory;
  updateActivityRecord: ActivityRecord;
  updateBoard: Board;
  updateBudgetCategory: BudgetCategory;
  updateBudgetRecord: BudgetRecord;
  updatePeriodRecord: PeriodRecord;
  updateUser: User;
};

export type MutationAddBoardMemberArgs = {
  input: AddMemberInput;
};

export type MutationAuthorizeArgs = {
  input: AuthorizeInput;
};

export type MutationCreateActivityCategoryArgs = {
  input: CreateActivityCategoryInput;
};

export type MutationCreateActivityRecordArgs = {
  input: CreateActivityRecordInput;
};

export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};

export type MutationCreateBudgetCategoryArgs = {
  input: CreateBudgetCategoryInput;
};

export type MutationCreateBudgetRecordArgs = {
  input: CreateBudgetRecordInput;
};

export type MutationCreatePeriodRecordArgs = {
  input: CreatePeriodRecordInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteActivityCategoryArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteActivityRecordArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteBoardArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteBudgetCategoryArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteBudgetRecordArgs = {
  id: Scalars['Int'];
};

export type MutationDeletePeriodRecordArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};

export type MutationRemoveBoardMemberArgs = {
  input: RemoveMemberInput;
};

export type MutationUpdateActivityCategoryArgs = {
  input: UpdateActivityCategoryInput;
};

export type MutationUpdateActivityRecordArgs = {
  input: UpdateActivityRecordInput;
};

export type MutationUpdateBoardArgs = {
  input: UpdateBoardInput;
};

export type MutationUpdateBudgetCategoryArgs = {
  input: UpdateBudgetCategoryInput;
};

export type MutationUpdateBudgetRecordArgs = {
  input: UpdateBudgetRecordInput;
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
  activityCategories: Array<ActivityCategory>;
  activityCategory: ActivityCategory;
  activityCategoryMeasurementType: ActivityCategoryMeasurementType;
  activityCategoryMeasurementTypes: Array<ActivityCategoryMeasurementType>;
  activityRecord: ActivityRecord;
  activityRecords: Array<ActivityRecord>;
  board: Board;
  boardSubject: BoardSubject;
  boardSubjects: Array<BoardSubject>;
  boards: Array<Board>;
  budgetCategories: Array<BudgetCategory>;
  budgetCategory: BudgetCategory;
  budgetCategoryType: BudgetCategoryType;
  budgetCategoryTypes: Array<BudgetCategoryType>;
  budgetRecord: BudgetRecord;
  budgetRecords: Array<BudgetRecord>;
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

export type QueryActivityCategoriesArgs = {
  boardsIds?: InputMaybe<Array<Scalars['Int']>>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  ownersIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type QueryActivityCategoryArgs = {
  id: Scalars['Int'];
};

export type QueryActivityCategoryMeasurementTypeArgs = {
  id: Scalars['Int'];
};

export type QueryActivityRecordArgs = {
  id: Scalars['Int'];
};

export type QueryActivityRecordsArgs = {
  boardsIds?: InputMaybe<Array<Scalars['Int']>>;
  categoriesIds?: InputMaybe<Array<Scalars['Int']>>;
  dates?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  orderingByDate?: InputMaybe<Scalars['String']>;
  orderingById?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type QueryBoardArgs = {
  id: Scalars['Int'];
};

export type QueryBoardSubjectArgs = {
  id: Scalars['Int'];
};

export type QueryBoardsArgs = {
  iAmAdminOf?: InputMaybe<Scalars['Boolean']>;
  iAmMemberOf?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  name?: InputMaybe<Scalars['String']>;
  subjectsIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type QueryBudgetCategoriesArgs = {
  boardsIds?: InputMaybe<Array<Scalars['Int']>>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
};

export type QueryBudgetCategoryArgs = {
  id: Scalars['Int'];
};

export type QueryBudgetCategoryTypeArgs = {
  id: Scalars['Int'];
};

export type QueryBudgetRecordArgs = {
  id: Scalars['Int'];
};

export type QueryBudgetRecordsArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  boardsIds?: InputMaybe<Array<Scalars['Int']>>;
  categoriesIds?: InputMaybe<Array<Scalars['Int']>>;
  dates?: InputMaybe<Array<Scalars['String']>>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  isTrashed?: InputMaybe<Scalars['Boolean']>;
  orderingByDate?: InputMaybe<Scalars['String']>;
  orderingById?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
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

export type RemoveMemberInput = {
  boardId: Scalars['Int'];
  memberId: Scalars['Int'];
};

export type Symptom = {
  __typename?: 'Symptom';
  id: Scalars['Int'];
  name: Scalars['String'];
  periodRecords: Array<PeriodRecord>;
};

export type UpdateActivityCategoryInput = {
  boardId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  measurementTypeId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
};

export type UpdateActivityRecordInput = {
  booleanValue?: InputMaybe<Scalars['Boolean']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  comment?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  quantitativeValue?: InputMaybe<Scalars['Float']>;
};

export type UpdateBoardInput = {
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  subjectId?: InputMaybe<Scalars['Int']>;
};

export type UpdateBudgetCategoryInput = {
  boardId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  typeId?: InputMaybe<Scalars['Int']>;
};

export type UpdateBudgetRecordInput = {
  amount?: InputMaybe<Scalars['Float']>;
  categoryId?: InputMaybe<Scalars['Int']>;
  date?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  isTrashed?: InputMaybe<Scalars['Boolean']>;
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
