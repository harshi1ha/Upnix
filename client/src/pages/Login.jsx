import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, ArrowRight } from 'lucide-react';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login Response:', res.data);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-main)', fontFamily: 'Inter, sans-serif' }}>
      <div style={{
        background: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius)',
        width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow)', border: '1px solid #E2E8F0'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>Upnix</h1>
          <p style={{ color: 'var(--text-muted)' }}>Enter your secure workspace</p>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', color: '#B91C1C', padding: '12px',
            borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Mail size={20} color="var(--secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="email"
              placeholder="Email Address"
              required
              style={{
                width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px',
                border: '1px solid #CBD5E1', outlineColor: 'var(--secondary)', fontSize: '1rem',
                color: 'var(--text-main)', background: '#F8FAFC', boxSizing: 'border-box'
              }}
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <Lock size={20} color="var(--secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="password"
              placeholder="Password"
              required
              style={{
                width: '100%', padding: '14px 14px 14px 44px', borderRadius: '8px',
                border: '1px solid #CBD5E1', outlineColor: 'var(--secondary)', fontSize: '1rem',
                color: 'var(--text-main)', background: '#F8FAFC', boxSizing: 'border-box'
              }}
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%', padding: '14px', background: 'var(--primary)', color: 'white',
              border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem',
              cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              transition: 'transform 0.1s', opacity: isLoading ? 0.8 : 1
            }}
          >
            {isLoading ? 'Accessing...' : 'Sign In'}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          New to Upnix? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;