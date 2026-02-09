'use client';

export default function Settings() {
  return (
    <>
      <div className="card">
        <div className="card-header">
          Account Settings
        </div>
        <div className="settings-form">
          <div className="settings-section">
            <h3>Profile Information</h3>
            <div className="form-group">
              <label>Username</label>
              <input type="text" className="form-control" placeholder="Your username" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" className="form-control" placeholder="your@email.com" />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" className="form-control" placeholder="Your Full Name" />
            </div>
          </div>

          <div className="settings-section">
            <h3>Security</h3>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" className="form-control" placeholder="••••••••" />
            </div>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>
            <div className="form-group">
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                Email notifications for new orders
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox">
                <input type="checkbox" defaultChecked />
                Daily sales report
              </label>
            </div>
            <div className="form-group">
              <label className="checkbox">
                <input type="checkbox" />
                SMS alerts
              </label>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn btn-primary">Save Changes</button>
            <button className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
