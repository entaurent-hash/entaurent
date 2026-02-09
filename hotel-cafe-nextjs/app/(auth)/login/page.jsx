'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/app/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      if (formData.email && formData.password) {
        login({
          email: formData.email,
          name: 'Admin User',
          role: 'admin'
        });
        router.push('/dashboard');
      } else {
        setError('Please fill in all fields');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Admin Login</h2>
      <p className="auth-subtitle">Sign in to manage your restaurants</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@entaurent.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <div className="form-actions">
          <label className="checkbox">
            <input type="checkbox" />
            Remember me
          </label>
          <Link href="/forgot-password" className="forgot-link">
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="auth-divider">or</div>

      <p className="auth-footer-text">
        Don't have an account?{' '}
        <Link href="/signup" className="auth-link">
          Sign up here
        </Link>
      </p>

      <div className="demo-credentials">
        <p><strong>Demo Credentials:</strong></p>
        <p>Email: admin@entaurent.com</p>
        <p>Password: demo123</p>
      </div>
    </div>
  );
}
