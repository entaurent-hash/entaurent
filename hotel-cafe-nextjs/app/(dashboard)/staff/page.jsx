import Header from '@/app/components/dashboard/Header';
import Staff from '@/app/components/dashboard/Staff';

export default function StaffPage() {
  return (
    <>
      <Header 
        title="Staff Management" 
        subtitle="Manage team members and permissions" 
      />
      <Staff />
    </>
  );
}
