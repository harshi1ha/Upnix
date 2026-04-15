import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Building2, User, LogOut } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const role = localStorage.getItem('role');

    const isActive = (path) => location.pathname === path;

    const navStyle = {
        height: '60px',
        background: '#FFFFFF',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
    };

    const logoStyle = {
        color: 'var(--primary)',
        fontSize: '1.5rem',
        fontWeight: '800',
        letterSpacing: '-0.5px',
        textDecoration: 'none'
    };

    const linkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        fontWeight: active ? 'bold' : 'normal',
        padding: '0.5rem 1rem',
        borderRadius: 'var(--radius)',
        background: active ? '#F1F5F9' : 'transparent',
        borderBottom: active ? '2px solid var(--secondary)' : 'none',
        transition: 'all 0.2s'
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    };

    // Don't show navbar on login/register pages
    if (['/', '/login', '/register', '/secret-admin-login'].includes(location.pathname)) {
        return null;
    }

    return (
        <nav style={navStyle}>
            <Link to="/dashboard" style={logoStyle}>Upnix</Link>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link to="/dashboard" style={linkStyle(isActive('/dashboard'))}>
                    <LayoutDashboard size={18} color={isActive('/dashboard') ? "var(--secondary)" : "currentColor"} />
                    Dashboard
                </Link>

                {role === 'admin' && (
                    <Link to="/admin-dashboard" style={linkStyle(isActive('/admin-dashboard'))}>
                        <ShieldAlert size={18} color={isActive('/admin-dashboard') ? "var(--secondary)" : "currentColor"} />
                        Admin
                    </Link>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button onClick={handleLogout} style={{
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px'
                }}>
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
