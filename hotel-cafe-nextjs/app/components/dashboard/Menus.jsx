'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Menus() {
  const { menus, establishments, addMenu, updateMenu, deleteMenu } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    category: 'Food',
    items: 0,
    estId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.estId) {
      if (editingId) {
        updateMenu(editingId, {
          ...formData,
          items: parseInt(formData.items)
        });
        setEditingId(null);
      } else {
        addMenu({
          ...formData,
          items: parseInt(formData.items)
        });
      }
      setFormData({ name: '', category: 'Food', items: 0, estId: '' });
      setShowModal(false);
    }
  };

  const handleEdit = (menu) => {
    setEditingId(menu.id);
    setFormData({
      name: menu.name,
      category: menu.category,
      items: menu.items,
      estId: menu.estId
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', category: 'Food', items: 0, estId: '' });
    setShowModal(true);
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>
            Menus ({menus.length})
          </div>
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ Create Menu
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
                <th>Establishment</th>
                <th>Items</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map(menu => (
                <tr key={menu.id}>
                  <td><strong>{menu.name}</strong></td>
                  <td>{menu.category}</td>
                  <td>{establishments.find(e => e.id === menu.estId)?.name || 'N/A'}</td>
                  <td>{menu.items}</td>
                  <td><span className="table-badge badge-success">{menu.status}</span></td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleEdit(menu)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => {
                        if (confirm('Delete this menu?')) {
                          deleteMenu(menu.id);
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

      {showModal && (
        <Modal 
          id="menu-modal" 
          title={editingId ? 'Edit Menu' : 'Create Menu'}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Menu Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Menu Name"
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select 
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Food">Food</option>
                <option value="Drinks">Drinks</option>
                <option value="Desserts">Desserts</option>
                <option value="Specials">Specials</option>
              </select>
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
            <div className="form-group">
              <label>Number of Items</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.items}
                onChange={(e) => setFormData({...formData, items: e.target.value})}
                placeholder="0"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {editingId ? 'Update' : 'Create'} Menu
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
