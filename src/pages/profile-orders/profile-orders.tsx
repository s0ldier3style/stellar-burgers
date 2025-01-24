import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchOrdersProfile,
  ordersProfile
} from '../../services/slices/order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(ordersProfile) || null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersProfile());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
