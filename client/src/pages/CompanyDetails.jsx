import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Plus,
  CheckCircle,
  MessageSquare,
  User,
  Briefcase,
  AlertTriangle,
  ThumbsUp // ✅ Imported ThumbsUp
} from 'lucide-react';
import ContributionModal from './ContributionModal';
import './CompanyDetails.css';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [contributions, setContributions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, contribRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/companies/${id}`),
          axios.get(`http://localhost:5000/api/contributions/${id}`)
        ]);

        setCompany(compRes.data);
        setContributions(contribRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [id]);

  // 2. Refresh Logic (Passed to Modal)
  const handleModalClose = (shouldRefresh) => {
    setIsModalOpen(false);
    if (shouldRefresh) {
      axios.get(`http://localhost:5000/api/contributions/${id}`)
        .then(res => setContributions(res.data))
        .catch(err => console.error(err));
    }
  };

  // 3. 🚀 UPVOTE LOGIC
  const handleUpvote = async (contributionId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        alert("Please login to vote!");
        return;
      }

      // Call Backend
      await axios.put(`http://localhost:5000/api/contributions/upvote/${contributionId}`, {}, {
        headers: { 'x-auth-token': token }
      });

      // Refresh the list to see the new number!
      const res = await axios.get(`http://localhost:5000/api/contributions/${id}`);
      setContributions(res.data);

    } catch (err) {
      console.error(err);
      alert("Failed to vote. Please try again.");
    }
  };

  if (!company) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="company-container">

      {/* HEADER */}
      <div className="company-header">
        <h1 className="company-title">{company.name}</h1>
        <p className="company-meta">{company.industry} • {company.type}</p>

        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} />
          Add Interview Question
        </button>
      </div>

      {/* QUESTIONS LIST */}
      <div className="contributions-grid">
        <h2 style={{ color: '#334155', marginBottom: '0.5rem' }}>
          Recent Interview Questions ({contributions.length})
        </h2>

        {contributions.length > 0 ? (
          contributions.map((item) => (
            <div key={item._id} className="contribution-card">

              {/* --- SECURITY BADGE LOGIC --- */}
              {item.isVerifiedEmployee ? (
                <div className="verified-badge" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#d1fae5' }}>
                  <CheckCircle size={14} />
                  Verified Employee
                </div>
              ) : item.isAlumni ? (
                <div className="verified-badge" style={{ background: '#F0F9FF', color: '#0369A1', borderColor: '#BAE6FD' }}>
                  <span>🎓</span>
                  Verified Alumni
                </div>
              ) : item.userRole === 'Current Employee' ? (
                <div className="verified-badge" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fcd34d' }}>
                  <AlertTriangle size={14} />
                  Unverified Source
                </div>
              ) : (
                <div className="verified-badge" style={{ background: '#eff6ff', color: '#2563eb', borderColor: '#dbeafe' }}>
                  <User size={14} />
                  Interview Candidate
                </div>
              )}
              {/* --------------------------- */}

              <h3 className="question-text">"{item.question}"</h3>

              {item.context && (
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1rem' }}>
                  <strong>Context:</strong> {item.context}
                </p>
              )}

              {/* STAR Answer Box */}
              <div className="star-box">
                <span className="star-label">💡 How to Answer (STAR)</span>
                <p className="star-content">{item.starTip}</p>
              </div>

              {/* ✅ VOTE BUTTON & DATE SECTION */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9' }}>

                {/* The Vote Button */}
                <button
                  onClick={() => handleUpvote(item._id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: '1px solid #cbd5e1',
                    padding: '6px 14px', borderRadius: '20px',
                    cursor: 'pointer', color: '#475569', fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'none'}
                >
                  <ThumbsUp size={16} />
                  <strong>{item.upvotes || 0}</strong> Helpful
                </button>

                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Posted {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>

            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8', background: '#f8fafc', borderRadius: '12px' }}>
            <MessageSquare size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p>No questions yet. Be the first to contribute!</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ContributionModal
          companyId={id}
          onClose={() => handleModalClose(true)}
        />
      )}
    </div>
  );
};

export default CompanyDetails;