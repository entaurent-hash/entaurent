'use client';

import { useApp } from '@/app/lib/context';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/components/dashboard/Sidebar';
import AlertContainer from '@/app/components/dashboard/AlertContainer';
import '@/app/styles/dashboard.css';

export default function DashboardLayout({ children }) {
  const { user } = useApp();
  const router = useRouter();

  // Check if user is authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        {children}
      </main>
      <AlertContainer />
    </div>
  );
}
