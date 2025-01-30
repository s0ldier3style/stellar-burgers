import { rootReducer } from './../store';
import ingredientsReducer from './ingredient-slice/ingredient-slice';
import constructorReducer from './constructor-slice/constructor-slice';
import feedsSlice from './feeds-slice/feeds-slice';
import orderSlice from './order-slice/order-slice';
import userSlice from './user-slice/user-slice';

describe('rootReducer', () => {
  it('should initialize with the correct state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    // Ожидаемое начальное состояние, которое объединяет начальные состояния всех редюсеров
    const expectedState = {
      ingredientsSlice: ingredientsReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      constructorSlice: constructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feedsSlice: feedsSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      orderSlice: orderSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      userSlice: userSlice(undefined, { type: 'UNKNOWN_ACTION' })
    };
    expect(initialState).toEqual(expectedState);
  });
});
