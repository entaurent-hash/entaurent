'use client';

import { useApp } from '@/app/lib/context';

export default function Orders() {
  const { orders, establishments, updateOrder, deleteOrder } = useApp();

  const getStatusClass = (status) => {
    const map = {
      'Pending': 'warning',
      'Completed': 'success',
      'Preparing': 'info',
      'Cancelled': 'danger'
    };
    return map[status] || 'primary';
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrder(orderId, { status: newStatus });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          Orders Management ({orders.length})
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Table</th>
                <th>Establishment</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>#{order.id}</strong></td>
                  <td>Table {order.tableNo}</td>
                  <td>{establishments.find(e => e.id === order.estId)?.name || 'N/A'}</td>
                  <td>{order.items}</td>
                  <td>₹{order.total}</td>
                  <td>
                    <select 
                      className="form-control form-control-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => {
                        if (confirm('Delete this order?')) {
                          deleteOrder(order.id);
                        }
                      }}
                    >
                      Delete
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
