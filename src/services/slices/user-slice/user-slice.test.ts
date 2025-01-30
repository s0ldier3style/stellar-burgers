import userReducer, {
  registerUser,
  postLoginData,
  updateUser,
  checkUserAuth,
  logout
} from './user-slice';
import {
  initialState,
  mockedAuthError,
  mockedLoginError,
  mockedUpdateUserError,
  mockedAuthResponse,
  mockedUserResponse
} from './constants';
import { setCookie } from '../../../utils/cookie';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve()
    }) as any
);
jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn() // Мокаем функцию setCookie
}));
describe('userSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
      length: 0,
      key: jest.fn()
    };
  });
  test('обработка registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });
  test('обработка registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockedAuthResponse
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      mockedAuthResponse.refreshToken
    );
    expect(setCookie).toHaveBeenCalledWith(
      'accessToken',
      mockedAuthResponse.accessToken
    );
    expect(state.user).toEqual(mockedAuthResponse.user);
  });
  test('обработка registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: mockedAuthError
    };
    const state = userReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedAuthError);
  });
  test('обработка postLoginData.pending', () => {
    const action = { type: postLoginData.pending.type };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });
  test('обработка postLoginData.fulfilled', () => {
    const action = {
      type: postLoginData.fulfilled.type,
      payload: mockedUserResponse
    };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockedUserResponse.user);
  });
  test('обработка postLoginData.rejected', () => {
    const action = {
      type: postLoginData.rejected.type,
      payload: mockedLoginError
    };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedLoginError);
  });
  test('обработка updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(false);
    expect(state.isLoading).toBe(true);
    expect(state.error).toEqual(null);
  });
  test('обработка updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockedUserResponse
    };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockedUserResponse.user);
  });
  test('обработка updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      payload: mockedUpdateUserError
    };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedUpdateUserError);
  });
  test('checkUserAuth.fullfiled', () => {
    const action = { type: checkUserAuth.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state.success).toBe(true);
  });
  test('logout.fullfiled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(null);
  });
});
