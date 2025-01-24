import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';
import { RootState } from '../store';

interface IngredientState {
  items: Array<TIngredient>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIngredient: TIngredient | null;
}

const initialState: IngredientState = {
  items: [],
  status: 'idle',
  error: null,
  selectedIngredient: null
};

export const fetchAllIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error) {
      console.error('Ошибка при получении ингредиентов:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const { setSelectedIngredient, clearSelectedIngredient } =
  ingredientsSlice.actions;

export const selectedAllIngredients = (state: RootState) =>
  state.ingredientsSlice.items;

export const selectedBuns = createSelector(
  [selectedAllIngredients],
  (items: TIngredient[]) => items.filter((item) => item.type === 'bun')
);

export const selectedMains = createSelector(
  [selectedAllIngredients],
  (items: TIngredient[]) => items.filter((item) => item.type === 'main')
);

export const selectedSauces = createSelector(
  [selectedAllIngredients],
  (items: TIngredient[]) => items.filter((item) => item.type === 'sauce')
);

export const selectedIngredient = (state: RootState) =>
  state.ingredientsSlice.selectedIngredient;

export default ingredientsSlice.reducer;
