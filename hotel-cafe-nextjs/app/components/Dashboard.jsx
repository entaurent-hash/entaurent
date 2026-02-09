'use client';

import { useApp } from '@/app/lib/context';

export default function Dashboard() {
  const { establishments, staff, menus, orders } = useApp();

  const totalEst = establishments.length;
  const totalStaff = staff.length;
  const totalMenus = menus.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

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

  return (
    <>
      <div className="grid grid-2">
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-number">{totalEst}</div>
          <div className="stat-label">Total Establishments</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-number">{totalStaff}</div>
          <div className="stat-label">Staff Members</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-number">{totalMenus}</div>
          <div className="stat-label">Active Menus</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-number">₹{totalRevenue}</div>
          <div className="stat-label">Today's Revenue</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Recent Orders</div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table No</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.tableNo}</td>
                  <td>{order.items}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <span className={`table-badge badge-${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
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
