import Header from '@/app/components/Header';
import Settings from '@/app/components/Settings';

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" subtitle="Configure your account and system settings" />
      <Settings />
    </>
  );
}
