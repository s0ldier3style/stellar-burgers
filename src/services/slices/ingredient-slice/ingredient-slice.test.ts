import ingredientReducer, { fetchAllIngredients } from './ingredient-slice';
import { initialState, mockedIngredients, mockedError } from './constants';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockedIngredients)
    }) as any
);
describe('ingredientSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Очистка состояния перед каждым тестом
  });
  test('обработка ingredientSlice.pending', () => {
    const action = { type: fetchAllIngredients.pending.type };
    const state = ingredientReducer(initialState, action);
    // Проверка статуса и ошибки
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });
  test('обработка ingredientSlice.fulfilled', () => {
    const action = {
      type: fetchAllIngredients.fulfilled.type,
      payload: mockedIngredients
    };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockedIngredients);
  });
  test('обработка ingredientSlice.rejected', () => {
    const action = {
      type: fetchAllIngredients.rejected.type,
      payload: mockedError
    };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toEqual(mockedError);
  });
});
