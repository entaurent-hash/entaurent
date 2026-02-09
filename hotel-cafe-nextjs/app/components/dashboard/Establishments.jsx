'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Establishments() {
  const { establishments, addEstablishment, updateEstablishment, deleteEstablishment } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'restaurant', 
    location: '',
    tables: 0 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.location) {
      if (editingId) {
        updateEstablishment(editingId, {
          ...formData,
          tables: parseInt(formData.tables)
        });
        setEditingId(null);
      } else {
        addEstablishment({
          ...formData,
          tables: parseInt(formData.tables)
        });
      }
      setFormData({ name: '', type: 'restaurant', location: '', tables: 0 });
      setShowModal(false);
    }
  };

  const handleEdit = (est) => {
    setEditingId(est.id);
    setFormData({
      name: est.name,
      type: est.type,
      location: est.location,
      tables: est.tables
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', type: 'restaurant', location: '', tables: 0 });
    setShowModal(true);
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>
            Establishments ({establishments.length})
          </div>
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ Add Establishment
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Location</th>
                <th>Tables</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {establishments.map(est => (
                <tr key={est.id}>
                  <td><strong>{est.name}</strong></td>
                  <td>{est.type}</td>
                  <td>{est.location}</td>
                  <td>{est.tables}</td>
                  <td><span className="table-badge badge-success">{est.status}</span></td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleEdit(est)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => {
                        if (confirm('Delete this establishment?')) {
                          deleteEstablishment(est.id);
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
          id="est-modal" 
          title={editingId ? 'Edit Establishment' : 'Add Establishment'}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Name"
                required 
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                className="form-control"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="hotel">Hotel</option>
                <option value="bar">Bar</option>
              </select>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Location"
                required 
              />
            </div>
            <div className="form-group">
              <label>Number of Tables</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.tables}
                onChange={(e) => setFormData({...formData, tables: e.target.value})}
                placeholder="0"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {editingId ? 'Update' : 'Add'} Establishment
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
