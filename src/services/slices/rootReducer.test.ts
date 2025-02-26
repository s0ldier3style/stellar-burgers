import { rootReducer } from './../store';
import { initialState as ingredientsInitialState } from './ingredient-slice/constants';
import { initialState as constructorInitialState } from './constructor-slice/constants';
import { initialState as feedsInitialState } from './feeds-slice/constants';
import { initialState as orderInitialState } from './order-slice/constants';
import { initialState as userInitialState } from './user-slice/constants';

describe('rootReducer', () => {
  it('should initialize with the correct state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    // Ожидаемое начальное состояние
    const expectedState = {
      ingredientsSlice: ingredientsInitialState,
      constructorSlice: constructorInitialState,
      feedsSlice: feedsInitialState,
      orderSlice: orderInitialState,
      userSlice: userInitialState
    };

    expect(initialState).toEqual(expectedState);
  });
});
