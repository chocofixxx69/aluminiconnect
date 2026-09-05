import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DEMO_CREDENTIALS, loginWithDemoCredentials } from '../../config/demoCredentials';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const DemoPortalsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingRole, setLoadingRole] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async (demo) => {
    const ok = await loginWithDemoCredentials(demo, login, navigate, setLoadingRole);
    if (ok) {
      setIsOpen(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`Copied ${label} to clipboard!`);
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Floating Action Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="btn shadow-lg d-flex align-items-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '9999px',
            padding: '10px 18px',
            fontSize: '13.5px',
            fontWeight: 600,
            letterSpacing: '0.3px',
            boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.25s ease',
            cursor: 'pointer'
          }}
          title="Click to view demo logins & open any portal"
        >
          <span
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 10px #10b981',
              display: 'inline-block'
            }}
          />
          <i className="fas fa-bolt text-warning" />
          <span>Demo Portals</span>
        </button>
      ) : (
        /* Expanded Drawer / Card */
        <div
          className="shadow-2xl animate__animated animate__fadeInUp"
          style={{
            width: '380px',
            maxWidth: 'calc(100vw - 32px)',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              padding: '16px 18px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark fw-bold px-2 py-1" style={{ fontSize: '10px' }}>
                  1-CLICK DEMO ACCESS
                </span>
              </div>
              <h6 className="mb-0 mt-1 fw-bold" style={{ fontSize: '15px' }}>
                AITM Portals Demo Access
              </h6>
              <small style={{ color: '#94a3b8', fontSize: '11.5px' }}>
                Click any portal below to log in & open instantly
              </small>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-sm text-white-50 p-1"
              style={{ background: 'transparent', border: 'none', fontSize: '16px' }}
              title="Close"
            >
              <i className="fas fa-times" />
            </button>
          </div>

          {/* Body: Portal List */}
          <div style={{ padding: '14px', maxHeight: '420px', overflowY: 'auto' }}>
            <div className="d-flex flex-column gap-2">
              {DEMO_CREDENTIALS.map((demo) => {
                const isLoading = loadingRole === demo.role;
                return (
                  <div
                    key={demo.id}
                    style={{
                      border: `1.5px solid ${demo.borderColor}`,
                      borderRadius: '12px',
                      padding: '12px',
                      backgroundColor: demo.bgColor,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div className="d-flex align-items-start justify-content-between mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '8px',
                            backgroundColor: demo.color,
                            color: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px'
                          }}
                        >
                          <i className={demo.icon} />
                        </div>
                        <div>
                          <span
                            className="fw-bold text-dark d-block"
                            style={{ fontSize: '13.5px', lineHeight: '1.2' }}
                          >
                            {demo.roleLabel}
                          </span>
                          <span className="text-muted" style={{ fontSize: '11px' }}>
                            {demo.dept}
                          </span>
                        </div>
                      </div>
                      <span
                        className="badge"
                        style={{
                          backgroundColor: `${demo.color}20`,
                          color: demo.color,
                          fontSize: '10px',
                          fontWeight: 700
                        }}
                      >
                        {demo.badge}
                      </span>
                    </div>

                    {/* Credential summary bar */}
                    <div
                      className="d-flex align-items-center justify-content-between my-2 px-2 py-1 rounded"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        fontSize: '11px'
                      }}
                    >
                      <div className="text-truncate me-1">
                        <span className="text-muted">User: </span>
                        <strong className="text-dark">{demo.email}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(demo.email, 'Email')}
                        className="btn btn-sm p-0 text-muted"
                        title="Copy Email"
                        style={{ border: 'none', background: 'none' }}
                      >
                        <i className="far fa-copy" />
                      </button>
                    </div>

                    {/* Instant Login Button */}
                    <button
                      onClick={() => handleQuickLogin(demo)}
                      disabled={isLoading || loadingRole !== null}
                      className="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                      style={{
                        backgroundColor: demo.color,
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '7px 12px',
                        fontSize: '12.5px',
                        transition: 'opacity 0.2s ease'
                      }}
                    >
                      {isLoading ? (
                        <>
                          <ClipLoader color="#ffffff" size={14} />
                          <span>Logging in & opening...</span>
                        </>
                      ) : (
                        <>
                          <span>⚡ Open {demo.shortTitle} Portal</span>
                          <i className="fas fa-arrow-right" style={{ fontSize: '11px' }} />
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              padding: '8px 14px',
              background: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              fontSize: '11px',
              color: '#64748b',
              textAlign: 'center'
            }}
          >
            Password for all accounts: <strong className="text-dark">alumni@123</strong>
            <br />
            Admin Secret Key: <strong className="text-dark">AITM_ADMIN_2026</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoPortalsWidget;
