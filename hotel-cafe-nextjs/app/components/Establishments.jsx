'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Establishments() {
  const { establishments, addEstablishment, deleteEstablishment } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Hotel', location: '', tables: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.location && formData.tables) {
      addEstablishment({
        name: formData.name,
        type: formData.type,
        location: formData.location,
        tables: parseInt(formData.tables)
      });
      setFormData({ name: '', type: 'Hotel', location: '', tables: '' });
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>Manage Establishments</div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Add New
          </button>
        </div>
      </div>

      <div className="grid">
        {establishments.map(est => (
          <div key={est.id} className="card">
            <h3>{est.name}</h3>
            <p className="text-muted">{est.type} • {est.location}</p>
            <div className="mt-20">
              <p><strong>Tables:</strong> {est.tables}</p>
              <p><strong>Status:</strong> <span className="table-badge badge-success">{est.status}</span></p>
            </div>
            <div className="mt-20" style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-primary btn-small">Edit</button>
              <button className="btn btn-danger btn-small" onClick={() => {
                if (confirm('Delete this establishment?')) {
                  deleteEstablishment(est.id);
                }
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <Modal id="est-modal" title="Add New Establishment" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
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
                <label>Type</label>
                <select 
                  className="form-control" 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option>Hotel</option>
                  <option>Café</option>
                  <option>Restaurant</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Number of Tables</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.tables}
                onChange={(e) => setFormData({...formData, tables: e.target.value})}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Establishment</button>
          </form>
        </Modal>
      )}

      {showModal && <div className="modal active" id="est-modal"></div>}
    </>
  );
}
