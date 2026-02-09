'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Staff() {
  const { staff, addStaff, deleteStaff } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', position: '', department: 'Management', salary: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.position && formData.salary) {
      addStaff({
        name: formData.name,
        position: formData.position,
        department: formData.department,
        salary: parseInt(formData.salary)
      });
      setFormData({ name: '', position: '', department: 'Management', salary: '' });
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>Manage Staff</div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Add Staff Member
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Status</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.position}</td>
                  <td>{member.department}</td>
                  <td><span className="table-badge badge-success">{member.status}</span></td>
                  <td>₹{member.salary}</td>
                  <td>
                    <button className="btn btn-primary btn-small">Edit</button>
                    <button className="btn btn-danger btn-small" onClick={() => {
                      if (confirm('Remove this staff member?')) {
                        deleteStaff(member.id);
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
        <Modal id="staff-modal" title="Add Staff Member" onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
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
                <label>Position</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select 
                  className="form-control" 
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                >
                  <option>Management</option>
                  <option>Kitchen</option>
                  <option>Service</option>
                  <option>Housekeeping</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Monthly Salary</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Add Staff Member</button>
          </form>
        </Modal>
      )}

      {showModal && <div className="modal active" id="staff-modal"></div>}
    </>
  );
}
