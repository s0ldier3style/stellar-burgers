import { RootState, useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsCheckAuth } from '../../services/slices/user-slice/user-slice';
import { selectUser } from '../../services/slices/user-slice/user-slice';
import { Preloader } from '@ui';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const user = useSelector(selectUser);
  const isCheckAuth = useSelector(selectIsCheckAuth);
  const location = useLocation();
  if (!isCheckAuth) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return children;
};
