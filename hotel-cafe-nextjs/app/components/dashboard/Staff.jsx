'use client';

import { useState } from 'react';
import { useApp } from '@/app/lib/context';
import Modal from './Modal';

export default function Staff() {
  const { staff, addStaff, updateStaff, deleteStaff } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    position: '',
    department: '',
    salary: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.position) {
      if (editingId) {
        updateStaff(editingId, {
          ...formData,
          salary: parseInt(formData.salary)
        });
        setEditingId(null);
      } else {
        addStaff({
          ...formData,
          salary: parseInt(formData.salary)
        });
      }
      setFormData({ name: '', position: '', department: '', salary: 0 });
      setShowModal(false);
    }
  };

  const handleEdit = (member) => {
    setEditingId(member.id);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      salary: member.salary
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: '', position: '', department: '', salary: 0 });
    setShowModal(true);
  };

  return (
    <>
      <div className="card">
        <div className="flex-between">
          <div className="card-header" style={{ border: 'none', padding: 0 }}>
            Staff Management ({staff.length})
          </div>
          <button className="btn btn-primary" onClick={handleAddNew}>
            ➕ Add Staff
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
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(member => (
                <tr key={member.id}>
                  <td><strong>{member.name}</strong></td>
                  <td>{member.position}</td>
                  <td>{member.department}</td>
                  <td>₹{member.salary}</td>
                  <td><span className="table-badge badge-success">{member.status}</span></td>
                  <td>
                    <button 
                      className="btn btn-primary btn-small"
                      onClick={() => handleEdit(member)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-danger btn-small"
                      onClick={() => {
                        if (confirm('Remove this staff member?')) {
                          deleteStaff(member.id);
                        }
                      }}
                    >
                      Remove
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
          id="staff-modal" 
          title={editingId ? 'Edit Staff' : 'Add Staff'}
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
                placeholder="Full Name"
                required 
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.position}
                onChange={(e) => setFormData({...formData, position: e.target.value})}
                placeholder="Job Position"
                required 
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select 
                className="form-control"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
              >
                <option value="">Select Department</option>
                <option value="Management">Management</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Service">Service</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input 
                type="number" 
                className="form-control" 
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                placeholder="0"
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              {editingId ? 'Update' : 'Add'} Staff
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
