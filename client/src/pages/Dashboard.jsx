import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, LogOut } from 'lucide-react';

function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic Auth Check
    const token = localStorage.getItem('token');
    if (!token) navigate('/');

    axios.get('http://localhost:5000/api/companies')
      .then(res => {
        console.log("Dashboard Data:", res.data);
        setCompanies(res.data);
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

      {/* HEADER */}
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '0.5rem' }}>Choose your target</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Unlock premium interview patterns for top companies.
        </p>
      </header>

      {/* GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {companies.map(company => (
          <Link to={`/company/${company._id}`} key={company._id} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', padding: '2rem', borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(61, 49, 91, 0.1)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.02)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ background: '#F0F4F8', padding: '12px', borderRadius: '12px' }}>
                  <Briefcase size={28} color="var(--primary)" />
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    background: 'rgba(144, 186, 173, 0.1)', color: 'var(--primary)',
                    padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'
                  }}>
                    {company.industry}
                  </span>
                  {company.type && (
                    <span style={{
                      background: '#EEF2FF', color: '#4F46E5',
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold'
                    }}>
                      {company.type}
                    </span>
                  )}
                </div>
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{company.name}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Full interview loops, role-specific questions, and ATS keywords.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}>
                View Strategy <span style={{ marginLeft: '6px' }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;