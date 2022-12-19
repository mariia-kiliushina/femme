import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export type IUsersState = {
  userId: number | undefined;
  accessToken: string | undefined;
};

export interface IUser {
  login: string;
  password: string;
}

const initialState: IUsersState = { userId: undefined, accessToken: undefined };

// const URL_PREFIX = 'https://women-health-backend.herokuapp.com/api/';
const URL_PREFIX = 'http://localhost:8081/api/';

export const refreshToken = createAsyncThunk('refreshToken', async () => {
  const response = await fetch(URL_PREFIX + 'refresh');
  const responseJSON = await response.json();
  return responseJSON;
});

export const authenticateUser = createAsyncThunk('authenticateUser', async (user: IUser) => {
  const response = await fetch(URL_PREFIX + 'authentication', {
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });

  if (!response.ok) {
    if (response.status === 401) {
      const refreshed = await refreshToken();
      return refreshed;
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }
  const responseJSON = await response.json();
  return responseJSON;
});

export const registerUser = createAsyncThunk('registerUser', async (user: IUser) => {
  const response = await fetch(URL_PREFIX + 'registration', {
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  return await response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAll(state) {
      state.accessToken = '';
    },
    logOutUser: (state: IUsersState) => {
      state.userId = initialState.userId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authenticateUser.fulfilled,
      (state: IUsersState, action: PayloadAction<IUsersState>) => {
        state.accessToken = action.payload.accessToken;
        state.userId = action.payload.userId;
      }
    );
  },
});

export default userSlice.reducer;
export const { clearAll } = userSlice.actions;
