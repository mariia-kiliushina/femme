import {configureStore} from '@reduxjs/toolkit';
import dataSliceReducer from './sliceData';
import userSliceReducer from './sliceUser';

const store = configureStore({
  reducer: {
    dataSliceReducer,
    userSliceReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(),
});

export type Store = {
  dataSliceReducer: typeof store.replaceReducer;
  userSliceReducer: typeof store.replaceReducer;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
