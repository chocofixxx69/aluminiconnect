import React from 'react';

const AuthVideoBackground = () => {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'brightness(0.65)'
        }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.6) 100%)',
          backdropFilter: 'blur(3px)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default AuthVideoBackground;
