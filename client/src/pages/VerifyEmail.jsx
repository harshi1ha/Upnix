import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccount = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        return;
      }

      try {
        // Send token to backend
        await axios.post('http://localhost:5000/api/auth/verify-email', { token });
        setStatus('success');

        // Redirect to Login after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
      } catch {
        setStatus('error');
      }
    };

    verifyAccount();
  }, [searchParams, navigate]);

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>

      {status === 'verifying' && <h2>Verifying your email...</h2>}

      {status === 'success' && (
        <div>
          <CheckCircle size={64} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ color: '#16a34a' }}>Email Verified!</h1>
          <p>Redirecting to login...</p>
        </div>
      )}

      {status === 'error' && (
        <div>
          <XCircle size={64} color="#dc2626" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ color: '#dc2626' }}>Verification Failed</h1>
          <p>The link might be invalid or expired.</p>
        </div>
      )}

    </div>
  );
};

export default VerifyEmail;