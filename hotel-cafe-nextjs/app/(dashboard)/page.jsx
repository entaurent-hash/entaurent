import Header from '@/app/components/dashboard/Header';
import Dashboard from '@/app/components/dashboard/Dashboard';

export default function DashboardPage() {
  return (
    <>
      <Header 
        title="Dashboard" 
        subtitle="Welcome to EntaurentQR - Table Menu Management System" 
      />
      <Dashboard />
    </>
  );
}
