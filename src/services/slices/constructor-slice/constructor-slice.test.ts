import {
  ingredientTypeBun,
  ingredientTypeMain,
  ingredientTypeSauce,
  initialState
} from './constants';
import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setBun,
  clearConstructor
} from './constructor-slice'; // Убедитесь, что путь к слайсу корректен

// Пример ингредиентов для тестов
describe('constructorSlice', () => {
  test('обработка setBun', () => {
    const newState = reducer(initialState, setBun(ingredientTypeBun));
    expect(newState).toEqual({
      bun: ingredientTypeBun,
      ingredients: []
    });
  });
  test('обработка addIngredient;', () => {
    // Добавление ингредиента
    const newState = reducer(initialState, addIngredient(ingredientTypeMain));
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeMain]
    });
  });
  test('обработка removeIngredient', () => {
    // Состояние с несколькими ингредиентами
    const state = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    // Удаление ингредиента по id
    const newState = reducer(
      state,
      removeIngredient('643d69a5c3f7b9001cfa0941')
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce]
    });
  });
  test('обработка moveIngredient', () => {
    // Состояние с несколькими ингредиентами
    const state = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    // Перемещение ингредиента
    const newState = reducer(
      state,
      moveIngredient({ id: '643d69a5c3f7b9001cfa0942', option: 'up' })
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce, ingredientTypeMain]
    });
  });
  test('обработка clearConstructor', () => {
    const state = {
      bun: ingredientTypeBun,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    const newState = reducer(state, clearConstructor());
    expect(newState).toEqual(initialState);
  });
});
