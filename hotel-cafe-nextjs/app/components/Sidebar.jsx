'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/establishments', label: 'Establishments', icon: '🏢' },
    { href: '/menus', label: 'Menus', icon: '📋' },
    { href: '/staff', label: 'Staff Management', icon: '👥' },
    { href: '/qrcodes', label: 'QR Codes', icon: '📱' },
    { href: '/orders', label: 'Orders', icon: '📦' },
    { href: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span style={{ fontSize: '1.5em' }}>🏨</span>
          <span>HotelCafe</span>
        </div>
      </div>

      <nav>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.href} className="nav-item">
              <Link
                href={item.href}
                className={`nav-link ${pathname === item.href ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
