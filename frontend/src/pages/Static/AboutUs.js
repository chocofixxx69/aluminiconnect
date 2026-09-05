// src/pages/Static/AboutUs.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-5 text-center">
      <div className="mb-4 d-flex justify-content-center">
        <img
          src="/aitm-logo.png"
          alt="Anjuman Institute of Technology and Management (AITM), Bhatkal"
          style={{ width: '110px', height: '110px', objectFit: 'contain' }}
        />
      </div>
      <h2 className="fw-bold mb-4" style={{ color: '#c84022' }}>About AITM Alumni Connect</h2>
      <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
        Our Alumni Connect Platform creates a digital bridge between the alumni, faculty, and students of Anjuman Institute of Technology and Management (AITM), Bhatkal. 
        It allows alumni to stay connected, share job opportunities, mentor current students, and explore ongoing college events.
      </p>
      <div className="row mt-5 g-4">
        <div className="col-md-4">
          <div className="card h-100 p-4 border-0 shadow-sm">
            <h5 className="fw-bold">Our Mission</h5>
            <p className="small text-muted">To foster a lifelong, inspiring connection between Anjuman Institute of Technology and Management and its graduates.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 p-4 border-0 shadow-sm">
            <h5 className="fw-bold">Networking</h5>
            <p className="small text-muted">A professional networking and mentorship community for our institution's students and alumni worldwide.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 p-4 border-0 shadow-sm">
            <h5 className="fw-bold">Legacy</h5>
            <p className="small text-muted">Celebrating decades of technical excellence, visionary leadership, and successful alumni across the globe.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;