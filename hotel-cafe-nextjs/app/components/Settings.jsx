'use client';

export default function Settings() {
  const currentUser = {
    name: 'Admin User',
    email: 'admin@hotelcafe.com',
    role: 'Admin'
  };

  return (
    <>
      <div className="card">
        <div className="card-header">Account Settings</div>
        <div className="form-row full">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" className="form-control" defaultValue={currentUser.name} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" defaultValue={currentUser.email} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="text" className="form-control" defaultValue={currentUser.role} disabled />
          </div>
          <button className="btn btn-primary" onClick={() => alert('Settings update feature coming soon!')}>
            Save Changes
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">System Settings</div>
        <div className="form-group">
          <label>
            <input type="checkbox" defaultChecked /> Enable Notifications
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" defaultChecked /> Dark Mode
          </label>
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" /> Maintenance Mode
          </label>
        </div>
        <button className="btn btn-success">Apply Settings</button>
      </div>
    </>
  );
}
