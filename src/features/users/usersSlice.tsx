import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type { UserData } from "../../components/users/interface";
import type { PayloadAction } from '@reduxjs/toolkit'

const BASEURL = "https://66644301932baf9032aa8617.mockapi.io/api";
const APIENDPOINT = "users";

export interface UsersState {
    users: [],
    status: "idle" | "loading" | "failed",
    error: any,
}

const initialState: UsersState = {
    users: [],
    status: "idle",
    error: {},
}

export const deleteUserAsync = async (userId: string) => {
    if (!userId || userId.length === 0) {
        return null;
    }
    try {
        const res = await fetch(`${BASEURL}/${APIENDPOINT}/${userId}`,
            {
              method: 'DELETE',
            }
        );
        const user = await res.json();
        return user;
      } catch (error: any) {
        console.error('Delete User Error');
        console.error(error);
        return error.message;
      }
}

export const updateUserAsync = async (userId: string, location: string) => {
    if (!userId || userId.length === 0) {
        return null;
    }
    try {
        const res = await fetch(`${BASEURL}/${APIENDPOINT}/${userId}`,
            {
              method: 'PUT',
              headers: {'content-type':'application/json'},
              body: JSON.stringify({location})
            }
        );
        const users = await res.json();
        return users;
      } catch (error: any) {
        return error.message;
    }
}

export const fetchUsersAsync = createAsyncThunk(
    "user/listUsers",
    async (_, thunkAPI) => {
      try {
        const res = await fetch(`${BASEURL}/${APIENDPOINT}`);
        const users = await res.json();
        return users;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        deleteUser(state, action) {
            const userId = action.payload.id;
            deleteUserAsync(userId).then((user) => {
                console.log("Delete functionality completed..");
            });
            state.users = state.users.filter((user: UserData) => user.id !== userId) || [];
        },
        updateUser(state, action) {
            const {id, location} = action.payload;
            updateUserAsync(id, location).then((user) => {
                console.log("Location updated successfully");
            })
            const user = state.users.find((user: UserData) => user.id === id);
            if(user) {
                user.location = location
            }
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsersAsync.pending, (state) => {
            state.status = "loading";
          })
          .addCase(fetchUsersAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.users = action.payload;
          })
          .addCase(fetchUsersAsync.rejected, (state, action) => {
            state.status = "idle";
            state.error = action.payload;
          });
    }
});

export const {deleteUser, updateUser} = usersSlice.actions;
export const allUsers = state => state.users;

export default usersSlice.reducer;