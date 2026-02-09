'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/app/lib/context';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useApp();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  const navItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard', 
      icon: '📊',
      exact: true
    },
    { 
      href: '/dashboard/establishments', 
      label: 'Establishments', 
      icon: '🏢'
    },
    { 
      href: '/dashboard/menus', 
      label: 'Menus', 
      icon: '📋'
    },
    { 
      href: '/dashboard/qrcodes', 
      label: 'QR Codes', 
      icon: '📱'
    },
    { 
      href: '/dashboard/orders', 
      label: 'Orders', 
      icon: '📦'
    },
    { 
      href: '/dashboard/staff', 
      label: 'Staff', 
      icon: '👥'
    },
    { 
      href: '/dashboard/settings', 
      label: 'Settings', 
      icon: '⚙️'
    }
  ];

  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">EntaurentQR</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${isActive(item.href, item.exact) ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0) || 'A'}</div>
          <div className="user-details">
            <div className="user-name">{user?.name || 'Admin'}</div>
            <div className="user-role">{user?.role || 'Admin'}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          🚪
        </button>
      </div>
    </aside>
  );
}
