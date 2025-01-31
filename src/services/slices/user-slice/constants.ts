import { TUser } from '@utils-types';

interface IUserState {
  success: boolean;
  isCheckAuth: boolean;
  user: TUser | null;
  isLoading: boolean;
  error: string | null;
}
export const initialState: IUserState = {
  success: false,
  isCheckAuth: false,
  user: null,
  isLoading: false,
  error: null
};
export const mockedAuthResponse = {
  success: true,
  refreshToken: 'test refreshToken',
  accessToken: 'test accessToken',
  user: {
    email: 'test@ya.test',
    name: 'Test Name'
  }
};
export const mockedAuthError = 'ошибка регистрации';
export const mockedLoginError = 'ошибка авторизации';
export const mockedUpdateUserError = 'ошибка обновления данных';
export const mockedUserResponse = {
  success: true,
  user: {
    email: 'test@ya.test',
    name: 'Test Name'
  }
};
