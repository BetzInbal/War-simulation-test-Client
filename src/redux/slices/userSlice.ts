import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { DataStatus, userState } from "../../types/redux";
import { IUser } from "../../types/user";

const initialState: userState = {
  error: null,
  status: DataStatus.IDLE,
  user: null,
};

export const fetchLogin = createAsyncThunk(
  "user/login",
  async (user: { username: string; password: string }, thunkApi) => {
    try {
      const res = await fetch("http://localhost:5555/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't login, please try again");
      }
      const data = await res.json();
      localStorage.token= data.token
      // thunkApi.fulfillWithValue(data);
      return data
    } catch (err) {
      thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "user/register",
  async (
    user: { username: string; password: string; organization: string },
    thunkApi
  ) => {
    try {
      const res = await fetch("http://localhost:5555/api/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't create new user, please try again");
        return
      }
      
      const data = await res.json();
      thunkApi.fulfillWithValue(data);
    } catch (err) {
      thunkApi.rejectWithValue("Can't create new user, please try again");
    }
  }
);

export const fetchGetUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkApi) => {
    try {
      const res = await fetch("http://localhost:5555/api/auth",
        {method:'GET',
          headers:{'authorization':localStorage.token}}
      );
      if (res.status != 200) {
        thunkApi.rejectWithValue("Can't ge user, please try again")
      }
      const data = await res.json();
      localStorage.token= data.token
      return data
    } catch (err) {
      thunkApi.rejectWithValue(err as string);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout:(state)=>{
      state.error=null
      state.status=DataStatus.IDLE
      state.user=null
    }

  },
  extraReducers: (builder: ActionReducerMapBuilder<userState>) => {
    builder.addCase(fetchLogin.pending, (state, action)=>{
        state.status = DataStatus.LOADING
        state.error = null
        state.user = null
    }).addCase(fetchLogin.fulfilled, (state, action)=>{
        state.status = DataStatus.SUCCESS
        state.error = null
        state.user = action.payload
    }).addCase(fetchLogin.rejected, (state, action)=>{
        state.status = DataStatus.FAILED
        state.error = action.error as string
        state.user = null
    }).addCase(fetchRegister.pending, (state, action)=>{
      state.status = DataStatus.LOADING
      state.error = null
      state.user = null
  }).addCase(fetchRegister.fulfilled, (state, action)=>{
      state.status = DataStatus.SUCCESS
      state.error = null
      state.user = null
  }).addCase(fetchRegister.rejected, (state, action)=>{
      state.status = DataStatus.FAILED
      state.error = action.error as string
      state.user = null
  })
  
  .addCase(fetchGetUser.pending, (state)=>{
    state.status = DataStatus.LOADING
    state.error = null
    state.user = null
}).addCase(fetchGetUser.fulfilled, (state, action)=>{
  state.status = DataStatus.SUCCESS
  state.error = null
  state.user = action.payload 
}).addCase(fetchGetUser.rejected, (state, action)=>{
    state.status = DataStatus.FAILED
    state.error = action.error as string
    state.user = null
})
  },
});

export default userSlice
