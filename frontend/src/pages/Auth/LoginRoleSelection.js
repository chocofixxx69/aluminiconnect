import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_CREDENTIALS, loginWithDemoCredentials } from '../../config/demoCredentials';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import AuthVideoBackground from '../../components/common/AuthVideoBackground';
import '../../styles/Auth.css';

/**
 * LoginRoleSelection Component
 * Displays both 1-Click Demo Portal Launchers and manual login links for all roles.
 */
const LoginRoleSelection = () => {
  const [loadingRole, setLoadingRole] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = (demo) => {
    loginWithDemoCredentials(demo, login, navigate, setLoadingRole);
  };

  const copyCreds = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  };

  return (
    <div className="auth-body d-flex align-items-center justify-content-center min-vh-100 py-5 position-relative">
      {/* Background Video */}
      <AuthVideoBackground />

      <div
        className="auth-card shadow-lg p-4 p-md-5 position-relative"
        style={{ maxWidth: '640px', width: '94%', borderRadius: '20px', zIndex: 2 }}
      >
        {/* Brand Header */}
        <div className="text-center mb-4">
          <div className="brand-logo-container mb-3 justify-content-center">
            <img
              src="/aitm-logo.png"
              alt="AITM Bhatkal Logo"
              className="auth-logo"
              style={{ width: '68px', height: '68px', objectFit: 'contain' }}
            />
          </div>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>
            AITM ALUMNI CONNECT
          </h3>
          <p className="text-muted small mb-0">
            Anjuman Institute of Technology and Management, Bhatkal
          </p>
        </div>

        {/* ─── 1-CLICK DEMO ACCESS SECTION ─────────────────── */}
        <div
          className="p-3 mb-4 rounded-3"
          style={{
            background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1.5px solid #e2e8f0',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)'
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#f59e0b',
                  color: '#fff',
                  fontSize: '12px'
                }}
              >
                <i className="fas fa-bolt" />
              </span>
              <span className="fw-bold text-dark" style={{ fontSize: '13.5px' }}>
                Instant Demo Access (1-Click Login)
              </span>
            </div>
            <span
              className="badge bg-warning text-dark fw-bold px-2 py-1"
              style={{ fontSize: '10px' }}
            >
              CLICK TO OPEN PORTAL
            </span>
          </div>

          <div className="row g-2">
            {DEMO_CREDENTIALS.map((demo) => {
              const isLoading = loadingRole === demo.role;
              return (
                <div className="col-12 col-sm-6" key={demo.id}>
                  <div
                    className="p-3 rounded-3 h-100 d-flex flex-column justify-content-between transition shadow-sm"
                    style={{
                      backgroundColor: '#ffffff',
                      border: `1.5px solid ${demo.borderColor}`,
                      position: 'relative'
                    }}
                  >
                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`${demo.icon}`} style={{ color: demo.color, fontSize: '15px' }} />
                          <strong style={{ fontSize: '13px', color: '#1e293b' }}>
                            {demo.shortTitle}
                          </strong>
                        </div>
                        <span
                          className="badge"
                          style={{
                            backgroundColor: `${demo.color}18`,
                            color: demo.color,
                            fontSize: '9.5px',
                            fontWeight: 700
                          }}
                        >
                          {demo.badge}
                        </span>
                      </div>

                      <div
                        className="p-2 mb-2 rounded font-monospace text-muted"
                        style={{
                          backgroundColor: '#f8fafc',
                          fontSize: '11px',
                          lineHeight: '1.4',
                          border: '1px solid #f1f5f9'
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-truncate me-1 text-dark fw-semibold">{demo.email}</span>
                          <button
                            type="button"
                            onClick={() => copyCreds(demo.email, `${demo.shortTitle} email`)}
                            className="btn btn-sm p-0 text-secondary"
                            title="Copy email"
                            style={{ border: 'none', background: 'none' }}
                          >
                            <i className="far fa-copy" />
                          </button>
                        </div>
                        <div className="text-muted" style={{ fontSize: '10px' }}>
                          Pass: <strong className="text-dark">{demo.password}</strong>
                          {demo.secretKey && (
                            <> | Key: <strong className="text-dark">{demo.secretKey}</strong></>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleQuickLogin(demo)}
                      disabled={isLoading || loadingRole !== null}
                      className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 mt-1"
                      style={{
                        backgroundColor: demo.color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '12px',
                        padding: '7px 10px',
                        transition: 'opacity 0.2s'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <ClipLoader color="#ffffff" size={13} />
                          <span>Opening {demo.shortTitle}...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Open {demo.shortTitle} Portal</span>
                          <i className="fas fa-arrow-right" style={{ fontSize: '10px' }} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1 my-0 text-muted opacity-25" />
          <span className="px-3 text-muted text-uppercase fw-semibold" style={{ fontSize: '11px' }}>
            Or Sign In Manually
          </span>
          <hr className="flex-grow-1 my-0 text-muted opacity-25" />
        </div>

        {/* Manual Navigation Links */}
        <div className="row g-2">
          <div className="col-6">
            <Link
              to="/login/student"
              className="btn btn-light border d-flex align-items-center justify-content-center p-2 rounded-3 w-100 text-decoration-none shadow-sm"
              style={{ fontSize: '12.5px', color: '#1e293b' }}
            >
              <i className="fas fa-user-graduate me-2 text-primary" />
              <span className="fw-bold">Student Login</span>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to="/login/alumni"
              className="btn btn-light border d-flex align-items-center justify-content-center p-2 rounded-3 w-100 text-decoration-none shadow-sm"
              style={{ fontSize: '12.5px', color: '#1e293b' }}
            >
              <i className="fas fa-user-tie me-2" style={{ color: '#c84022' }} />
              <span className="fw-bold">Alumni Login</span>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to="/login/staff"
              className="btn btn-light border d-flex align-items-center justify-content-center p-2 rounded-3 w-100 text-decoration-none shadow-sm"
              style={{ fontSize: '12.5px', color: '#1e293b' }}
            >
              <i className="fas fa-chalkboard-teacher me-2 text-success" />
              <span className="fw-bold">Staff Login</span>
            </Link>
          </div>
          <div className="col-6">
            <Link
              to="/admin/login"
              className="btn btn-light border d-flex align-items-center justify-content-center p-2 rounded-3 w-100 text-decoration-none shadow-sm"
              style={{ fontSize: '12.5px', color: '#1e293b' }}
            >
              <i className="fas fa-shield-alt me-2 text-purple" style={{ color: '#7c3aed' }} />
              <span className="fw-bold">Admin Login</span>
            </Link>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-4 text-center text-muted small">
          Don't have an account yet?{' '}
          <Link to="/register" className="brand-name-red text-decoration-none fw-bold">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRoleSelection;