'use client';

import { useApp } from '@/app/lib/context';

export default function Orders() {
  const { orders, updateOrderStatus } = useApp();

  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const totalOrderRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const getStatusClass = (status) => {
    const map = {
      'Active': 'success',
      'Completed': 'success',
      'Preparing': 'warning',
      'Pending': 'warning',
      'Inactive': 'danger'
    };
    return map[status] || 'primary';
  };

  const handleStatusUpdate = (id) => {
    const order = orders.find(o => o.id === id);
    const statuses = ['Pending', 'Preparing', 'Completed'];
    const currentIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateOrderStatus(id, nextStatus);
  };

  return (
    <>
      <div className="grid grid-2">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-number">{pendingOrders}</div>
          <div className="stat-label">Pending Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{completedOrders}</div>
          <div className="stat-label">Completed Orders</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-number">₹{totalOrderRevenue}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">All Orders</div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Items</th>
                <th>Total</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.tableNo}</td>
                  <td>{order.items}</td>
                  <td>₹{order.total}</td>
                  <td>{order.date}</td>
                  <td><span className={`table-badge badge-${getStatusClass(order.status)}`}>{order.status}</span></td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleStatusUpdate(order.id)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
