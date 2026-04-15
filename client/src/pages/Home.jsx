import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, Users } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', fontFamily: 'Inter, sans-serif' }}>

      {/* 1. NAVBAR (Landing Only) */}
      <nav style={{
        padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
          Upnix
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontWeight: '600', padding: '10px 20px' }}>
            Login
          </Link>
          <Link to="/register" style={{
            textDecoration: 'none', background: 'var(--primary)', color: 'white',
            fontWeight: '600', padding: '10px 24px', borderRadius: '30px',
            boxShadow: '0 4px 12px rgba(61, 49, 91, 0.2)'
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header style={{
        textAlign: 'center', padding: '6rem 2rem 4rem', maxWidth: '800px', margin: '0 auto',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <div style={{
          display: 'inline-block', background: '#EEF2FF', color: '#4F46E5',
          fontWeight: '700', fontSize: '0.85rem', padding: '6px 16px', borderRadius: '20px',
          marginBottom: '1.5rem', letterSpacing: '0.5px'
        }}>
          🚀 NEW: ALUMNI VERIFICATION LIVE
        </div>

        <h1 style={{
          fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', color: 'var(--primary)',
          marginBottom: '1.5rem', letterSpacing: '-1.5px'
        }}>
          Master Your <br />
          <span style={{ color: 'var(--accent)' }}>Technical Interview</span>
        </h1>

        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: '1.6' }}>
          Join the community-driven platform where top engineers share verified interview questions, strategies, and salaries.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/register" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            textDecoration: 'none', background: 'var(--primary)', color: 'white',
            fontWeight: '700', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem',
            boxShadow: '0 10px 20px rgba(61, 49, 91, 0.15)', transition: 'transform 0.2s'
          }}>
            Start for Free <ArrowRight size={20} />
          </Link>
          <Link to="/login" style={{
            textDecoration: 'none', background: 'white', color: 'var(--text-main)',
            fontWeight: '700', padding: '16px 32px', borderRadius: '12px', fontSize: '1.1rem',
            border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
          }}>
            Existing User
          </Link>
        </div>
      </header>

      {/* 3. FEATURES GRID */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem', maxWidth: '1200px', margin: '2rem auto 6rem', padding: '0 2rem'
      }}>

        {/* Feature 1 */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
          <div style={{ background: '#ECFDF5', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle color="#059669" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Verified Content</h3>
          <p style={{ color: 'var(--text-muted)' }}>Access questions verified by actual employees. Look for the green badge to know it's real.</p>
        </div>

        {/* Feature 2 */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
          <div style={{ background: '#EFF6FF', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Users color="#2563EB" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Alumni Insights</h3>
          <p style={{ color: 'var(--text-muted)' }}>Get tips directly from former employees who know the culture and hiring bar.</p>
        </div>

        {/* Feature 3 */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #F1F5F9' }}>
          <div style={{ background: '#FEF3C7', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <Shield color="#D97706" size={24} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--primary)' }}>Private & Secure</h3>
          <p style={{ color: 'var(--text-muted)' }}>Your identity is protected. Contribute anonymously while building reputation.</p>
        </div>

      </section>

      {/* 4. FOOTER */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #E2E8F0', color: 'var(--text-muted)' }}>
        © 2024 Upnix. All rights reserved.
      </footer>

      {/* CSS Animation defined in style for simplicity */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home;