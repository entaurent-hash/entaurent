import Header from '@/app/components/Header';
import Establishments from '@/app/components/Establishments';

export default function EstablishmentsPage() {
  return (
    <>
      <Header title="Establishments" subtitle="Manage your hotels, cafés, and restaurants" />
      <Establishments />
    </>
  );
}
