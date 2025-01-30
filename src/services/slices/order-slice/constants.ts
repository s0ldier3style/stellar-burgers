import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

interface IOrderSliceState {
  success: boolean;
  order: TOrder | null;
  profileOrders: TOrder[] | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
}
export const initialState: IOrderSliceState = {
  success: false,
  order: null,
  profileOrders: null,
  name: null,
  isLoading: false,
  error: null
};
export const mockedOrderDetails = {
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-08-23T19:04:28.782Z',
      updatedAt: '2024-08-23T19:04:29.332Z',
      number: 50898
    }
  ]
};
export const mockedOrderResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '66c8dd3c119d45001b501b81',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-08-23T19:04:28.782Z',
    updatedAt: '2024-08-23T19:04:29.332Z',
    number: 50898
  },
  name: 'Флюоресцентный био-марсианский бургер'
};
export const mockedProfileOrders = [
  {
    _id: '66c9ad8d119d45001b501c39',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-24T09:53:17.799Z',
    updatedAt: '2024-08-24T09:53:18.298Z',
    number: 50935
  },
  {
    _id: '66c9ac9d119d45001b501c33',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный spicy антарианский бургер',
    createdAt: '2024-08-24T09:49:17.804Z',
    updatedAt: '2024-08-24T09:49:18.319Z',
    number: 50934
  }
];
export const mockedError = 'Order not found';
