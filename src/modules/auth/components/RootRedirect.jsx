import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { HOME_BY_ROLE } from '../../shared/constants';


function RootRedirect() {
  const { session } = useAuth();

  return (
    <Navigate
      to={session ? HOME_BY_ROLE[session.role] : '/patient/login'}
      replace
    />
  );
}

export default RootRedirect;
