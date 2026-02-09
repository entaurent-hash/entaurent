'use client';

import { useRouter } from 'next/navigation';
import { useApp } from '@/app/lib/context';

export default function Header({ title, subtitle }) {
  const router = useRouter();
  const { user, logout } = useApp();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  return (
    <div className="top-header">
      <div className="header-title">
        <h1>{title}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      <div className="user-section">
        <div className="user-avatar" title={user?.name || 'Admin'}>
          {user?.name?.charAt(0) || 'A'}
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
