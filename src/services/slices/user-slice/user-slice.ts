import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  loginUserApi,
  logoutApi,
  updateUserApi,
  getUserApi,
  TLoginData,
  TRegisterData,
  registerUserApi
} from '../../../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { RootState } from '../../store';
import { initialState } from './constants';

export const registerUser = createAsyncThunk(
  'register/postUser',
  async (user: TRegisterData, thunkAPI) => {
    try {
      const response = await registerUserApi(user);
      return response;
    } catch (error) {
      console.log('Ошибка регистрации пользователя', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const postLoginData = createAsyncThunk(
  'login/postUser',
  async (loginData: TLoginData, thunkAPI) => {
    try {
      const response = await loginUserApi(loginData);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      console.log('Ошибка входа', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TRegisterData, thunkAPI) => {
    try {
      const response = await updateUserApi(user);
      setCookie('user', JSON.stringify(response.user));
      return response;
    } catch (error) {
      console.log('Ошибка получения данных пользователя: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((response) => {
          dispatch(setUser(response.user));
          dispatch(checkAuth(true));
        })
        .finally(() => {
          dispatch(checkAuth(true));
        });
    } else {
      dispatch(checkAuth(true));
    }
  }
);

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutApi();
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    console.log('Выход из системы выполнен');
    return response;
  } catch (error) {
    console.log('Ошибка выхода из системы: ', error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    checkAuth: (state, action) => {
      state.isCheckAuth = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(postLoginData.pending, (state, action) => {
        state.success = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.success = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.success = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.success = true;
        state.isLoading = false;
        state.user = action.payload.user;
        console.log('данные успешно изменены');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload as string;
        console.log('данные не изменены');
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.success = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        // state.success = false;
      });
  }
});

export default userSlice.reducer;

export const selectUser = (state: RootState) => state.userSlice.user;
export const selectUserName = createSelector(
  [selectUser],
  (user) => user?.name
);
export const selectIsLoading = (state: RootState) => state.userSlice.isLoading;

export const { setUser, checkAuth } = userSlice.actions;
export const selectRegisterUser = (state: RootState) => state.userSlice.user;
export const selectIsCheckAuth = (state: RootState) =>
  state.userSlice.isCheckAuth;
