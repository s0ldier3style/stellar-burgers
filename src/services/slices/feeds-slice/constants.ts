import { TOrder } from '@utils-types';

interface FeedsState {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}
export const initialState: FeedsState = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};
export const mockedFeeds = {
  success: true,
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-08-23T19:04:28.782Z',
      updatedAt: '2024-08-23T19:04:29.332Z',
      number: 50898
    },
    {
      _id: '66c8c55d119d45001b501b64',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-08-23T17:22:37.284Z',
      updatedAt: '2024-08-23T17:22:37.763Z',
      number: 50897
    }
  ],
  total: 50524,
  totalToday: 146
};
export const mockedError = 'Ошибка получения заказов';
