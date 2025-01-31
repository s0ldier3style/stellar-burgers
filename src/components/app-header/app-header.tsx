import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUserName } from '../../services/slices/user-slice/user-slice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserName);
  return <AppHeaderUI userName={userName} />;
};
