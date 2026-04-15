import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // 🔒 SECURITY CHECK
      if (res.data.role !== 'admin') {
        alert("ACCESS DENIED: You are not an Admin.");
        return;
      }

      // Success!
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // Store role to check later
      navigate('/admin-dashboard'); // Redirect to the "Jail"

    } catch {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      background: 'var(--bg-main)'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        padding: '3rem',
        borderRadius: 'var(--radius)',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow)',
        border: '1px solid #e2e8f0'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Lock size={48} color="var(--primary)" />
          <h2 style={{ color: 'var(--primary)', marginTop: '10px', fontWeight: '800' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-muted)' }}>Secure Access Only</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Admin Email"
              style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-main)', borderRadius: '8px', outlineColor: 'var(--secondary)' }}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <input
              type="password"
              placeholder="Passkey"
              style={{ width: '100%', padding: '12px', background: '#f8fafc', border: '1px solid #cbd5e1', color: 'var(--text-main)', borderRadius: '8px', outlineColor: 'var(--secondary)' }}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button style={{
            width: '100%', padding: '14px',
            background: 'var(--primary)', color: 'white',
            border: 'none', borderRadius: '8px',
            fontWeight: 'bold', cursor: 'pointer',
            transition: 'opacity 0.2s'
          }}>
            ENTER SYSTEM
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;