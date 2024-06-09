import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    user: usersReducer,
  }
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;