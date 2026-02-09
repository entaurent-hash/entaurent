'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function QRCodes() {
  const { qrcodes, establishments, addQRCode, deleteQRCode } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ estId: '', tableNo: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.estId && formData.tableNo) {
      addQRCode({
        tableNo: parseInt(formData.tableNo),
        estId: parseInt(formData.estId)
      });
      setFormData({ estId: '', tableNo: '' });
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>QR Code Management</div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Generate QR Code
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Table Number</th>
                <th>Establishment</th>
                <th>Status</th>
                <th>Total Scans</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map(qr => (
                <tr key={qr.id}>
                  <td>Table {qr.tableNo}</td>
                  <td>{establishments.find(e => e.id === qr.estId)?.name || 'N/A'}</td>
                  <td><span className="table-badge badge-success">{qr.status}</span></td>
                  <td>{qr.scans}</td>
                  <td>
                    <button className="btn btn-primary btn-small">View</button>
                    <button className="btn btn-danger btn-small" onClick={() => {
                      if (confirm('Delete this QR code?')) {
                        deleteQRCode(qr.id);
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
        <Modal id="qr-modal" title="Generate QR Code" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
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
              <label>Table Number</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.tableNo}
                onChange={(e) => setFormData({...formData, tableNo: e.target.value})}
                min="1"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Generate QR Code</button>
          </form>
        </Modal>
      )}

      {showModal && <div className="modal active" id="qr-modal"></div>}
    </>
  );
}
