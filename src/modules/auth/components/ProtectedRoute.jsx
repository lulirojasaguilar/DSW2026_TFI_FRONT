import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { LOGIN_BY_ROLE } from '../../shared/constants';

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return (
      <Navigate to={LOGIN_BY_ROLE[allowedRoles?.[0]] ?? '/login'} replace />
    );
  }

  if (allowedRoles && !hasRole(...allowedRoles)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}
