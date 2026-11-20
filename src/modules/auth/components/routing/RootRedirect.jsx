import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import { HOME_BY_ROLE } from '../../../shared/constants';

function RootRedirect() {
  const { role } = useAuth();

  return <Navigate to={role ? HOME_BY_ROLE[role] : '/patient/login'} replace />;
}

export default RootRedirect;
