import { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import './ContributionModal.css'; 

const BANNED_WORDS = ['shit', 'damn', 'fuck', 'bitch', 'ass', 'sex', 'nude', 'naked', 'porn', 'xxx', 'kill', 'murder', 'stupid', 'idiot', 'crap'];

function ContributionModal({ companyId, onClose }) {
  // 1. UPDATED STATE: Includes 'userRole'
  const [formData, setFormData] = useState({ 
    question: '', 
    context: '', 
    starTip: '', 
    userRole: 'Interview Candidate' // Default selection
  });

  const [status, setStatus] = useState('idle'); 
  const [serverMsg, setServerMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Helper to update state cleanly
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Safety Check
    const content = Object.values(formData).join(' ').toLowerCase();
    const hasBadWords = BANNED_WORDS.some(word => content.includes(word));

    if (hasBadWords) {
      setErrorMessage("Please ensure your contribution is professional. Inappropriate content is flagged.");
      return;
    }

    setStatus('submitting');

    try {
      const token = localStorage.getItem('token');

      // Send data (including userRole) to backend
      const res = await axios.post('http://localhost:5000/api/contribute', 
        { 
          companyId, 
          ...formData 
        },
        { 
          headers: { 'x-auth-token': token } 
        }
      );

      setServerMsg(res.data.message);
      setStatus('success');
      
      // Close automatically
      setTimeout(onClose, 2500);

    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.msg || err.response?.data?.error || "Failed to submit. Please try again.";
      setErrorMessage(msg);
      setStatus('idle');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  if (status === 'success') {
    return (
      <div className="modal-overlay">
        <div className="modal-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <CheckCircle size={64} color="#90BAAD" style={{ marginBottom: '1rem' }} />
          <h2 className="modal-title">Success!</h2>
          <p className="modal-subtitle" style={{ fontSize: '1rem' }}>{serverMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        
        <button onClick={onClose} className="close-btn"><X size={24} /></button>

        <h2 className="modal-title">Contribute Intelligence</h2>
        <p className="modal-subtitle">
          Share your interview experience to help the community. 
          <br/>Submissions are analyzed by our AI for quality.
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* Question Input */}
          <div className="form-group">
            <label className="form-label">Question Asked</label>
            <input 
              name="question"
              required 
              className="modal-input" 
              placeholder="e.g. Tell me about a time you failed..." 
              value={formData.question}
              onChange={handleChange} 
            />
          </div>

          {/* Context Input */}
          <div className="form-group">
            <label className="form-label">Context / Topic</label>
            <input 
              name="context"
              className="modal-input" 
              placeholder="e.g. Behavioral, System Design, Leadership Principles" 
              value={formData.context}
              onChange={handleChange} 
            />
          </div>

          {/* 2. NEW DROPDOWN: User Status */}
          <div className="form-group">
            <label className="form-label">I am a...</label>
            <select 
              name="userRole" 
              className="modal-input" 
              value={formData.userRole}
              onChange={handleChange}
              style={{ background: 'white', cursor: 'pointer' }}
            >
              <option value="Interview Candidate">Interview Candidate (Just interviewed)</option>
              <option value="Current Employee">Current Employee (Working there)</option>
              <option value="Former Employee">Former Employee</option>
            </select>
          </div>

          {/* STAR Tip Textarea */}
          <div className="form-group">
            <label className="form-label">How to Answer (STAR Method)</label>
            <textarea 
              name="starTip"
              required 
              rows="4" 
              className="modal-textarea" 
              placeholder="Tip: Structure your answer with Situation, Task, Action, and Result..." 
              value={formData.starTip}
              onChange={handleChange} 
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="error-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Analyzing...' : 'Submit Contribution'}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContributionModal;