import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import { useAuth } from '../../../auth/hook/useAuth';
import { ROLE_LABELS } from '../../constants';
import { userNameFromEmail } from '../../utils/user';

export default function AdminLayout() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen min-w-[1100px] bg-surface">
      <Sidebar
        onLogout={handleLogout}
        userName={userNameFromEmail(session.email)}
        roleLabel={ROLE_LABELS[session.role]}
      />
      <div className="min-w-0 flex-1">
        <main className="max-w-7xl p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
