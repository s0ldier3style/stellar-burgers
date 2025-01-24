import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBun,
  selectIngredients
} from '../../services/slices/constructor-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import {
  fetchOrderRequest,
  resetOrderModal,
  openOrderModal
} from '../../services/slices/order-slice';
import { selectUser } from '../../services/slices/user-slice';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngredients); // Получаем ингредиенты из хранилища
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = {
    bun,
    ingredients: ingredients || []
  };

  const orderRequest = useSelector((state) => state.orderSlice.isLoading);
  const orderModalData = useSelector((state) => state.orderSlice.order);
  const isOrderModalOpen = useSelector(
    (state) => state.orderSlice.isOrderModalOpen
  );
  const getIngredientsIds = () => {
    const bunId = constructorItems.bun ? constructorItems.bun._id : '';
    const ingredientsIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    return [bunId, ...ingredientsIds, bunId];
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientIds = getIngredientsIds();
    dispatch(fetchOrderRequest(ingredientIds));
  };
  const closeOrderModal = () => {
    dispatch(resetOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={isOrderModalOpen ? orderModalData : null}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
