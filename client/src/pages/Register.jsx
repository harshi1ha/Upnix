import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserPlus, ArrowRight } from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    isAlumni: false,
    linkedinUrl: '',
    jobTitle: ''
  });
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      // On success, redirect to Login
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'var(--bg-main)', fontFamily: 'Inter, sans-serif' }}>
      <div style={{
        background: 'var(--bg-card)', padding: '3rem', borderRadius: 'var(--radius)',
        width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow)', border: '1px solid #E2E8F0'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <UserPlus size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--primary)', fontWeight: '800' }}>Join Upnix</h1>
          <p style={{ color: 'var(--text-muted)' }}>Create your secure account</p>
        </div>

        {error && (
          <div style={{
            background: '#FEF2F2', color: '#B91C1C', padding: '12px',
            borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="email"
            placeholder="Email Address"
            required
            style={{
              padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1',
              fontSize: '1rem', outlineColor: 'var(--secondary)', background: '#F8FAFC', color: 'var(--text-main)',
              boxSizing: 'border-box', width: '100%'
            }}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Choose Password"
            required
            style={{
              padding: '14px', borderRadius: '8px', border: '1px solid #CBD5E1',
              fontSize: '1rem', outlineColor: 'var(--secondary)', background: '#F8FAFC', color: 'var(--text-main)',
              boxSizing: 'border-box', width: '100%'
            }}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />

          {/* 🎓 ALUMNI CHECKBOX */}
          <label style={{
            display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem',
            color: 'var(--text-main)', cursor: 'pointer', padding: '10px', background: '#F1F5F9', borderRadius: '8px'
          }}>
            <input
              type="checkbox"
              style={{ width: '18px', height: '18px', accentColor: 'var(--secondary)' }}
              checked={formData.isAlumni}
              onChange={e => setFormData({ ...formData, isAlumni: e.target.checked })}
            />
            I am a working professional / Alumni
          </label>

          {/* 🎓 ALUMNI EXTRA FIELDS */}
          {formData.isAlumni && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '1rem', borderLeft: '3px solid var(--secondary)' }}>
              <input
                type="text"
                placeholder="Job Title (e.g. Software Engineer)"
                required
                style={{
                  padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1',
                  fontSize: '0.9rem', outlineColor: 'var(--secondary)', boxSizing: 'border-box', width: '100%'
                }}
                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
              />
              <input
                type="url"
                placeholder="LinkedIn Profile URL"
                required
                style={{
                  padding: '12px', borderRadius: '6px', border: '1px solid #CBD5E1',
                  fontSize: '0.9rem', outlineColor: 'var(--secondary)', boxSizing: 'border-box', width: '100%'
                }}
                onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>
          )}
          <button type="submit" style={{
            width: '100%', padding: '14px', background: 'var(--primary)', color: 'white',
            border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem',
            cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
          }}>
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;