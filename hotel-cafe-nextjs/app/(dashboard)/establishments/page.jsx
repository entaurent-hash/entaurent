import Header from '@/app/components/dashboard/Header';
import Establishments from '@/app/components/dashboard/Establishments';

export default function EstablishmentsPage() {
  return (
    <>
      <Header 
        title="Establishments" 
        subtitle="Manage your hotels, restaurants, and cafés" 
      />
      <Establishments />
    </>
  );
}
