import Header from '@/app/components/dashboard/Header';
import Orders from '@/app/components/dashboard/Orders';

export default function OrdersPage() {
  return (
    <>
      <Header 
        title="Orders" 
        subtitle="View and manage customer orders" 
      />
      <Orders />
    </>
  );
}
