import { FC, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState } from '../../services/store';
import { selectedIngredient } from '../../services//slices/ingredient-slice';
import { setSelectedIngredient } from '../../services/slices/ingredient-slice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredientData = useSelector((state: RootState) =>
    selectedIngredient(state)
  );

  const allIngredients = useSelector(
    (state: RootState) => state.ingredientsSlice.items
  );

  useEffect(() => {
    if (location.state?.ingredient) {
      dispatch(setSelectedIngredient(location.state.ingredient));
    } else {
      const selectedIngredient = allIngredients.find(
        (ingredient: TIngredient) => ingredient._id === id
      );
      dispatch(setSelectedIngredient(selectedIngredient || null));
    }
  }, [id, location.state, dispatch, allIngredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
