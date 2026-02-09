'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <p className="auth-subtitle">We'll send you instructions to reset your password</p>

      {submitted ? (
        <div className="success-message">
          <p>✓ Password reset link sent!</p>
          <p>Check your email ({email}) for instructions.</p>
          <Link href="/login" className="btn btn-primary btn-block" style={{ marginTop: '20px' }}>
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@entaurent.com"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      )}

      <p className="auth-footer-text">
        Remember your password?{' '}
        <Link href="/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
