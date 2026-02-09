import Header from '@/app/components/dashboard/Header';
import Settings from '@/app/components/dashboard/Settings';

export default function SettingsPage() {
  return (
    <>
      <Header 
        title="Settings" 
        subtitle="Manage account and system settings" 
      />
      <Settings />
    </>
  );
}
