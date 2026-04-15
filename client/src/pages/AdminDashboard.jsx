import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Check, Trash2, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);



  const fetchPending = useCallback(async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/admin/pending', {
      headers: { 'x-auth-token': token }
    });
    setPending(res.data);
  }, []);

  // Fetch pending posts on load
  useEffect(() => {
    fetchPending();
  }, [fetchPending]);

  const handleApprove = async (id) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/approve/${id}`, {}, {
      headers: { 'x-auth-token': token }
    });
    fetchPending(); // Refresh list
  };

  const handleReject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/admin/reject/${id}`, {
      headers: { 'x-auth-token': token }
    });
    fetchPending(); // Refresh list
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
        <ShieldAlert size={32} color="#dc2626" />
        <h1 style={{ margin: 0, color: '#334155' }}>Moderation Queue</h1>
      </div>

      {pending.length === 0 ? (
        <p style={{ color: '#64748B' }}>All clean! No posts pending review.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {pending.map(post => (
            <div key={post._id} style={{
              background: 'white', border: '1px solid #e2e8f0',
              borderRadius: '12px', padding: '1.5rem', display: 'flex',
              justifyContent: 'space-between', alignItems: 'start',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>

              {/* CONTENT */}
              <div style={{ flex: 1, marginRight: '1rem' }}>
                <span style={{
                  background: '#f1f5f9', color: '#475569',
                  fontSize: '0.8rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold'
                }}>
                  {post.companyId?.name || 'Unknown Company'}
                </span>

                <h3 style={{ margin: '10px 0', color: '#1e293b' }}>{post.question}</h3>
                <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{post.starTip}</p>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                  Posted by: {post.userId?.email} • Role: {post.userRole}
                </div>
              </div>

              {/* ACTIONS */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleApprove(post._id)}
                  style={{
                    background: '#dcfce7', color: '#166534', border: 'none',
                    padding: '10px', borderRadius: '8px', cursor: 'pointer'
                  }}
                  title="Approve"
                >
                  <Check size={20} />
                </button>

                <button
                  onClick={() => handleReject(post._id)}
                  style={{
                    background: '#fee2e2', color: '#991b1b', border: 'none',
                    padding: '10px', borderRadius: '8px', cursor: 'pointer'
                  }}
                  title="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* 
        ===========================================
        🎓 NEW SECTION: ALUMNI VERIFICATION 
        ===========================================
      */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4rem', marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, color: '#334155' }}>Alumni Verification Queue</h1>
      </div>

      <AlumniVerificationTable />
    </div>
  );
};

// 🎓 SUB-COMPONENT FOR ALUMNI TABLE
const AlumniVerificationTable = () => {
  const [alumni, setAlumni] = useState([]);

  const fetchAlumni = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/admin/pending-alumni', {
        headers: { 'x-auth-token': token }
      });
      setAlumni(res.data);
    } catch (err) {
      console.error("Failed to fetch alumni", err);
    }
  }, []);

  useEffect(() => {
    fetchAlumni();
  }, [fetchAlumni]);

  const handleVerify = async (id, status) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/admin/verify-alumni/${id}`, { status }, {
      headers: { 'x-auth-token': token }
    });
    fetchAlumni(); // Refresh
  };

  if (alumni.length === 0) return <p style={{ color: '#64748B' }}>No alumni pending verification.</p>;

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {alumni.map(user => (
        <div key={user._id} style={{
          background: 'white', border: '1px solid #e2e8f0',
          borderRadius: '12px', padding: '1.5rem', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>{user.email}</h3>
            <p style={{ margin: 0, color: '#64748B' }}>
              <strong>Role:</strong> {user.jobTitle} <br />
              <strong>LinkedIn:</strong> <a href={user.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb' }}>View Profile</a>
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleVerify(user._id, 'approved')}
              style={{
                background: '#dcfce7', color: '#166534', border: 'none',
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Approve
            </button>
            <button
              onClick={() => handleVerify(user._id, 'rejected')}
              style={{
                background: '#fee2e2', color: '#991b1b', border: 'none',
                padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
              }}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;