'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function QRCodes() {
  const { qrcodes, establishments, addQRCode, updateQRCode, deleteQRCode } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [showQRPreview, setShowQRPreview] = useState(false);
  const [selectedQR, setSelectedQR] = useState(null);
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

  const handlePreview = (qr) => {
    setSelectedQR(qr);
    setShowQRPreview(true);
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>
            QR Code Management ({qrcodes.length})
          </div>
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
                <th>Table</th>
                <th>Establishment</th>
                <th>Status</th>
                <th>Total Scans</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {qrcodes.map(qr => (
                <tr key={qr.id}>
                  <td><strong>Table {qr.tableNo}</strong></td>
                  <td>{establishments.find(e => e.id === qr.estId)?.name || 'N/A'}</td>
                  <td><span className="table-badge badge-success">{qr.status}</span></td>
                  <td>{qr.scans}</td>
                  <td className="url-cell">{qr.url}</td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handlePreview(qr)}
                    >
                      Preview
                    </button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => {
                        if (confirm('Delete this QR code?')) {
                          deleteQRCode(qr.id);
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
          id="qr-modal" 
          title="Generate QR Code"
          onClose={() => setShowModal(false)}
        >
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
            <button type="submit" className="btn btn-primary btn-block">
              Generate QR Code
            </button>
          </form>
        </Modal>
      )}

      {showQRPreview && selectedQR && (
        <Modal 
          id="qr-preview-modal"
          title={`QR Code - Table ${selectedQR.tableNo}`}
          onClose={() => {
            setShowQRPreview(false);
            setSelectedQR(null);
          }}
        >
          <div className="qr-preview">
            <div className="qr-code-placeholder">
              📱 QR Code Placeholder
              <p style={{fontSize: '0.9em', marginTop: '10px'}}>
                {selectedQR.url}
              </p>
            </div>
            <div className="qr-actions">
              <button className="btn btn-primary">Download</button>
              <button className="btn btn-secondary">Print</button>
              <button className="btn btn-secondary">Copy Link</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
