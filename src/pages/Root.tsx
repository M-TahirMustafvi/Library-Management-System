import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { MainNavigation } from './MainNavigation';
import { Outlet } from 'react-router-dom';
import { DataContext } from '../store/data-context';

export function RootLayout() {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthPage = location.pathname === '/auth';

    if (!user?.email && !isAuthPage) {
      navigate('/auth', { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return (
    <main>
      {user.email && <MainNavigation />}
      <Outlet />
    </main>
  );
}
