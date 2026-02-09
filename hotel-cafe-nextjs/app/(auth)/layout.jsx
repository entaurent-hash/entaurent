'use client';

import Link from 'next/link';
import '@/app/styles/auth.css';

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="auth-wrapper">
          <div className="auth-container">
            <div className="auth-header">
              <div className="auth-logo">
                <span className="logo-icon">🍽️</span>
                <div>
                  <h1>EntaurentQR</h1>
                  <p>Table QR Menu Management System</p>
                </div>
              </div>
            </div>
            {children}
            <div className="auth-footer">
              <p>&copy; 2024 EntaurentQR. All rights reserved.</p>
            </div>
          </div>
          <div className="auth-bg"></div>
        </div>
      </body>
    </html>
  );
}
