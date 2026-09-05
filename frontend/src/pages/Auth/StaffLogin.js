import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AuthVideoBackground from '../../components/common/AuthVideoBackground';
import '../../styles/Auth.css';

const StaffLogin = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]             = useState('');
  const [pendingApproval, setPendingApproval] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Show pending banner if redirected back from a protected route
  useEffect(() => {
    if (location.state?.pendingApproval) {
      setPendingApproval(true);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setPendingApproval(false);
    setLoading(true);
    try {
      const res = await authService.login(email, password, 'staff');
      const { user, token } = res.data;
      login(user, token);
      // Bulk-imported user: tempPassword matched → needsPasswordChange=true.
      // Navigate to dashboard so ActivationModal (globally mounted) can intercept.
      if (user.needsPasswordChange) {
        navigate('/staff/dashboard');
      } else if (user.status !== 'Pending') {
        navigate('/staff/dashboard');
      }
      // else: self-registered Pending user → stay on page, show pendingApproval banner
    } catch (err) {
      const data = err.response?.data;
      if (data?.pendingApproval) {
        setPendingApproval(true);
      } else {
        setError(data?.message || 'Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-background d-flex align-items-center justify-content-center min-vh-100 position-relative py-5">
      <AuthVideoBackground />
      <Link to="/login" className="back-btn-circle" style={{ zIndex: 10 }}><i className="fas fa-arrow-left" /></Link>

      <div className="form-glass-container p-4 p-md-5 position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-4">
          <img
            src="/aitm-logo.png"
            width="55" height="55" style={{ objectFit: 'contain' }} alt="AITM Bhatkal Logo"
          />
          <h2 className="login-title mt-2">Staff Login</h2>
          <p className="text-muted small">Coordinators, HODs &amp; Faculty</p>
        </div>

        {pendingApproval && (
          <div className="alert py-2 small mb-3" role="alert"
            style={{ background: '#fff8e1', border: '1px solid #ffc107', color: '#856404', borderRadius: 8 }}>
            <i className="fas fa-clock me-2" />
            <strong>Pending Approval.</strong> Your account is awaiting admin review.
            You'll receive an email once it's activated.
          </div>
        )}
        {error && (
          <div className="alert alert-danger py-2 small mb-3" role="alert">
            <i className="fas fa-exclamation-circle me-2" />{error}
          </div>
        )}

        {/* ── 1-CLICK DEMO CREDENTIAL CARD ── */}
        <div className="p-3 mb-3 rounded-3" style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <i className="fas fa-bolt text-success" />
              <strong className="text-dark" style={{ fontSize: '12.5px' }}>Demo Staff Account</strong>
            </div>
            <span className="badge bg-success text-white" style={{ fontSize: '9.5px' }}>1-CLICK LOGIN</span>
          </div>
          <div className="text-muted font-monospace mb-2" style={{ fontSize: '11px', lineHeight: '1.4' }}>
            <div>ID: <strong className="text-dark">staff@aitm.ac.in</strong></div>
            <div>Pass: <strong className="text-dark">alumni@123</strong></div>
          </div>
          <button
            type="button"
            onClick={async () => {
              setEmail('staff@aitm.ac.in');
              setPassword('alumni@123');
              setLoading(true);
              setError('');
              try {
                const res = await authService.login('staff@aitm.ac.in', 'alumni@123', 'staff');
                const { user, token } = res.data;
                login(user, token);
                toast.success(`Welcome ${user.name}! Opening Staff Portal...`);
                navigate('/staff/dashboard');
              } catch (err) {
                setError(err.response?.data?.message || 'Login failed.');
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="btn btn-sm btn-success w-100 fw-bold d-flex align-items-center justify-content-center gap-2 py-1"
            style={{ borderRadius: '6px', fontSize: '12px' }}
          >
            <i className="fas fa-bolt" /> ⚡ Click to Open Staff Portal
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Official Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="you@aitm.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="btn-mamcet-red d-flex align-items-center justify-content-center gap-2 w-100"
            disabled={loading}
          >
            {loading ? <><ClipLoader size={16} color="#fff" /> Logging in...</> : 'Login'}
          </button>
          <div className="auth-footer-text text-center text-muted mt-3">
            New staff member? <Link to="/signup/staff" className="text-decoration-none fw-bold" style={{ color: '#c84022' }}>Register Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffLogin;
