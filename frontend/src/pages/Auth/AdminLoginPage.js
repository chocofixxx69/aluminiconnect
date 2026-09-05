import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AuthVideoBackground from '../../components/common/AuthVideoBackground';

const AdminLoginPage = () => {
  const [form, setForm]       = useState({ email: '', password: '', secretKey: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.secretKey.trim()) { setError('Secret key is required.'); return; }
    setLoading(true);
    try {
      const res = await authService.login(form.email, form.password, 'admin', form.secretKey);
      const { user, token } = res.data;
      login(user, token);
      navigate(`/admin/home/${user._id || user.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Access denied. Check your credentials and secret key.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>
      <AuthVideoBackground />
      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 2 }}>
        {/* Logo / Brand */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '16px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', boxShadow: '0 0 35px rgba(200,64,34,.35)',
            padding: 8
          }}>
            <img src="/aitm-logo.png" alt="AITM Bhatkal Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
            Admin Control Panel
          </h1>
          <p style={{ color: 'rgba(255,255,255,.45)', fontSize: 13, margin: 0 }}>
            AITM Alumni Connect — Restricted Access
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(255,255,255,.04)',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: 16, padding: '36px 32px',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 24px 64px rgba(0,0,0,.4)'
        }}>
          {error && (
            <div style={{
              background: 'rgba(220,53,69,.15)', border: '1px solid rgba(220,53,69,.3)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 20,
              color: '#ff6b6b', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8
            }}>
              <i className="fas fa-exclamation-triangle" style={{ fontSize: 12 }} />
              {error}
            </div>
          )}

          {/* ── 1-CLICK DEMO ADMIN CARD ── */}
          <div style={{
            background: 'rgba(124, 58, 237, 0.12)',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 20
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#c4b5fd', fontSize: 12.5, fontWeight: 700 }}>
                <i className="fas fa-bolt" style={{ color: '#f59e0b' }} />
                <span>Demo Admin Account</span>
              </div>
              <span style={{
                background: 'rgba(139, 92, 246, 0.3)',
                color: '#ddd6fe',
                fontSize: 9.5,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 9999
              }}>
                1-CLICK LOGIN
              </span>
            </div>

            <div style={{
              fontFamily: 'monospace',
              fontSize: 11,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              marginBottom: 10
            }}>
              <div>Email: <strong style={{ color: '#fff' }}>admin@aitm.ac.in</strong></div>
              <div>Pass: <strong style={{ color: '#fff' }}>alumni@123</strong> | Key: <strong style={{ color: '#fbbf24' }}>AITM_ADMIN_2026</strong></div>
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                setForm({
                  email: 'admin@aitm.ac.in',
                  password: 'alumni@123',
                  secretKey: 'AITM_ADMIN_2026'
                });
                setLoading(true);
                setError('');
                try {
                  const res = await authService.login('admin@aitm.ac.in', 'alumni@123', 'admin', 'AITM_ADMIN_2026');
                  const { user, token } = res.data;
                  login(user, token);
                  toast.success(`Welcome ${user.name}! Opening Admin Control Panel...`);
                  navigate(`/admin/home/${user._id || user.id}`);
                } catch (err) {
                  setError(err.response?.data?.message || 'Access denied.');
                } finally {
                  setLoading(false);
                }
              }}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                padding: '7px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
              }}
            >
              <i className="fas fa-bolt" /> ⚡ Click to Open Admin Control Panel
            </button>
          </div>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                Admin Email
              </label>
              <input
                type="email" name="email" required
                value={form.email} onChange={handleChange}
                placeholder="admin@aitm.ac.in"
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                Password
              </label>
              <input
                type="password" name="password" required
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>

            {/* Secret Key */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ color: 'rgba(255,255,255,.6)', fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', display: 'block', marginBottom: 7 }}>
                <i className="fas fa-key" style={{ marginRight: 6, color: '#f5a623' }} />
                Admin Secret Key
              </label>
              <input
                type="password" name="secretKey" required
                value={form.secretKey} onChange={handleChange}
                placeholder="System verification key"
                style={{ ...inputStyle, borderColor: 'rgba(245,166,35,.35)' }}
              />
              <p style={{ color: 'rgba(255,255,255,.3)', fontSize: 11, marginTop: 6, marginBottom: 0 }}>
                Contact the system administrator if you don't have this key.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px 24px', borderRadius: 10, border: 'none',
                background: loading ? 'rgba(200,64,34,.5)' : 'linear-gradient(135deg, #b22222, #c84022)',
                color: '#fff', fontWeight: 700, fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 20px rgba(200,64,34,.4)', transition: 'all .2s',
                letterSpacing: 0.5
              }}
            >
              {loading ? <><ClipLoader size={16} color="#fff" /> Verifying...</> : <>
                <i className="fas fa-unlock-alt" style={{ fontSize: 13 }} /> Access Admin Panel
              </>}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.2)', fontSize: 11, marginTop: 24 }}>
          Not an admin? <a href="/login" style={{ color: 'rgba(255,255,255,.4)', textDecoration: 'underline' }}>Go to main login</a>
        </p>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: 9,
  background: 'rgba(255,255,255,.06)', border: '1.5px solid rgba(255,255,255,.12)',
  color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box',
  transition: 'border-color .2s', fontFamily: 'inherit'
};

export default AdminLoginPage;
