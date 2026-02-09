import Header from '@/app/components/dashboard/Header';
import Menus from '@/app/components/dashboard/Menus';

export default function MenusPage() {
  return (
    <>
      <Header 
        title="Menus" 
        subtitle="Create and manage digital menus for QR codes" 
      />
      <Menus />
    </>
  );
}
