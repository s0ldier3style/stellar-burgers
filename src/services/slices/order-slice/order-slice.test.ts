import {
  initialState,
  mockedError,
  mockedOrderDetails,
  mockedOrderResponse,
  mockedProfileOrders
} from './constants';
import orderReducer, {
  fetchOrderDetails,
  fetchOrderRequest,
  fetchOrdersProfile
} from './order-slice';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve()
    }) as any
);
describe('orderSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('fetchOrderDetails', () => {
    test('обработка fetchOrderDetails.pending', () => {
      const action = { type: fetchOrderDetails.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderDetails.fulfilled', async () => {
      const action = {
        type: fetchOrderDetails.fulfilled.type,
        payload: mockedOrderDetails.orders[0]
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockedOrderDetails.orders[0]);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderDetails.rejected', () => {
      const action = {
        type: fetchOrderDetails.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockedError);
      expect(state.success).toBe(false);
    });
  });
  describe('fetchOrderRequest', () => {
    test('обработка fetchOrderRequest.pending', () => {
      const action = { type: fetchOrderRequest.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderRequest.fulfilled', () => {
      const action = {
        type: fetchOrderRequest.fulfilled.type,
        payload: mockedOrderResponse
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.order).toEqual(mockedOrderResponse.order);
      expect(state.name).toBe(mockedOrderResponse.name);
    });
    test('обработка fetchOrderRequest.rejected', () => {
      const action = {
        type: fetchOrderRequest.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toEqual(mockedError);
    });
  });
  describe('fetchOrdersProfile', () => {
    test('обработка fetchOrdersProfile.pending', () => {
      const action = { type: fetchOrdersProfile.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrdersProfile.fulfilled', () => {
      const action = {
        type: fetchOrdersProfile.fulfilled.type,
        payload: mockedProfileOrders
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.profileOrders).toEqual(mockedProfileOrders);
    });
    test('обработка fetchOrdersProfile.rejected', () => {
      const action = {
        type: fetchOrdersProfile.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toEqual(mockedError);
    });
  });
});
