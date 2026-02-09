'use client';

export default function Header({ title, subtitle }) {
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      // In a real app, you would redirect to login page
    }
  };

  return (
    <div className="top-header">
      <div className="header-title">
        <h1>{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      <div className="user-section">
        <div className="user-avatar" title="Admin User">A</div>
        <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
