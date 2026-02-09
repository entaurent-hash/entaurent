import Header from '@/app/components/Header';
import Orders from '@/app/components/Orders';

export default function OrdersPage() {
  return (
    <>
      <Header title="Orders" subtitle="Track and manage all orders" />
      <Orders />
    </>
  );
}
