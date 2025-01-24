import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredient-slice';
import constructorReducer from './slices/constructor-slice';
import feedsSlice from './slices/feeds-slice';
import orderSlice from './slices/order-slice';
import userSlice from './slices/user-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { Middleware } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer,
  feedsSlice: feedsSlice,
  orderSlice: orderSlice,
  userSlice: userSlice
});

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  console.log('Next state:', store.getState());
  return next(action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
