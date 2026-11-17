import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { LOGIN_BY_ROLE } from '../../shared/constants';


export default function ProtectedRoute({ role, children }) {
  const { session, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={LOGIN_BY_ROLE[role]} replace />;

  if (session.role !== role) return <Navigate to="/access-denied" replace />;

  return children;
}
