import React from 'react';
import { Link } from 'react-router-dom';
import AuthVideoBackground from '../../components/common/AuthVideoBackground';
import '../../styles/Auth.css';

/**
 * RoleSelection Component
 * Allows users to select their specific role before proceeding to the registration form.
 */
const RoleSelection = () => {
  return (
    <div className="auth-body d-flex align-items-center justify-content-center min-vh-100 position-relative py-5">
      {/* Background Video */}
      <AuthVideoBackground />

      <div className="auth-card text-center p-4 p-md-5 shadow-lg position-relative" style={{ zIndex: 2, borderRadius: '20px', maxWidth: '460px', width: '92%' }}>
        <div className="brand-logo-container mb-3 justify-content-center">
          <img
            src="/aitm-logo.png"
            alt="AITM Bhatkal Logo"
            className="auth-logo"
            style={{ width: '68px', height: '68px', objectFit: 'contain' }}
          />
        </div>
        <h3 className="fw-bold mb-1" style={{ letterSpacing: '-0.5px' }}>
          JOIN AITM CONNECT
        </h3>
        <p className="text-muted small mb-4">
          Select your registration role below
        </p>

        <div className="d-grid gap-3">
          <Link to="/signup/alumni" className="btn btn-role-select d-flex align-items-center rounded-3">
            <i className="fas fa-user-tie fa-lg me-3" style={{ color: '#c84022' }}></i>
            <div>
              <div className="fw-bold">ALUMNI REGISTRATION</div>
              <small className="text-muted" style={{ fontSize: '11px' }}>Graduates of AITM Bhatkal</small>
            </div>
          </Link>
          <Link to="/signup/student" className="btn btn-role-select d-flex align-items-center rounded-3">
            <i className="fas fa-user-graduate fa-lg me-3 text-primary"></i>
            <div>
              <div className="fw-bold">STUDENT REGISTRATION</div>
              <small className="text-muted" style={{ fontSize: '11px' }}>Current students of AITM</small>
            </div>
          </Link>
          <Link to="/signup/staff" className="btn btn-role-select d-flex align-items-center rounded-3">
            <i className="fas fa-chalkboard-teacher fa-lg me-3 text-success"></i>
            <div>
              <div className="fw-bold">STAFF / FACULTY</div>
              <small className="text-muted" style={{ fontSize: '11px' }}>Coordinators, HODs & Professors</small>
            </div>
          </Link>
        </div>

        <div className="mt-4 text-muted small">
          Already have an account?{' '}
          <Link to="/login" className="brand-name-red text-decoration-none fw-bold">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;