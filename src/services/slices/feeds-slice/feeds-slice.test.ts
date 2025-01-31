import feedsReducer, { fetchFeeds } from './feeds-slice';
import { initialState, mockedFeeds, mockedError } from './constants';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockedFeeds)
    }) as any
);
describe('fetchFeeds', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Очистка состояния перед каждым тестом
  });
  test('обработка fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });
  test('обработка fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockedFeeds };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.success).toEqual(mockedFeeds.success);
    expect(state.orders).toEqual(mockedFeeds.orders);
    expect(state.total).toEqual(50524);
    expect(state.totalToday).toEqual(146);
  });
  test('обработка fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type, payload: mockedError };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedError);
  });
});
