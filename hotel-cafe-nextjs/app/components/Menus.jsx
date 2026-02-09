'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Menus() {
  const { menus, establishments, addMenu, deleteMenu } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Food', items: '', estId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.items && formData.estId) {
      addMenu({
        name: formData.name,
        category: formData.category,
        items: parseInt(formData.items),
        estId: parseInt(formData.estId)
      });
      setFormData({ name: '', category: 'Food', items: '', estId: '' });
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>Manage Menus</div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Add New Menu
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Menu Name</th>
                <th>Category</th>
                <th>Items</th>
                <th>Establishment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu.id}>
                  <td>{menu.name}</td>
                  <td>{menu.category}</td>
                  <td>{menu.items}</td>
                  <td>{establishments.find(e => e.id === menu.estId)?.name || 'N/A'}</td>
                  <td><span className="table-badge badge-success">{menu.status}</span></td>
                  <td>
                    <button className="btn btn-primary btn-small">Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => {
                      if (confirm('Delete this menu?')) {
                        deleteMenu(menu.id);
                      }
                    }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal id="menu-modal" title="Add New Menu" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Menu Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control" 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                >
                  <option>Food</option>
                  <option>Drinks</option>
                  <option>Desserts</option>
                </select>
              </div>
              <div className="form-group">
                <label>Number of Items</label>
                <input 
                  type="number" 
                  className="form-control" 
                  value={formData.items}
                  onChange={(e) => setFormData({...formData, items: e.target.value})}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Establishment</label>
              <select 
                className="form-control" 
                value={formData.estId}
                onChange={(e) => setFormData({...formData, estId: e.target.value})}
                required
              >
                <option value="">Select Establishment</option>
                {establishments.map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Menu</button>
          </form>
        </Modal>
      )}

      {showModal && <div className="modal active" id="menu-modal"></div>}
    </>
  );
}
