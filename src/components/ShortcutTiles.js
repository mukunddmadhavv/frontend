import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';


const ShortcutTiles = () => {
  const tileStyle = {
    flex: '1',
    minWidth: 0,
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.75rem',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  const textStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: '#333',
    marginTop: '8px',
    wordWrap: 'break-word',
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        padding: '1rem',
        boxSizing: 'border-box',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      {/* Register */}
      <Link to="/register" style={{ textDecoration: 'none' }}>
  <div style={tileStyle}>
    <DotLottieReact
      src="https://lottie.host/a230423f-17cc-4193-b3e6-5b212fa703e0/DepqE7PM3u.lottie"
      loop
      autoplay
      style={{ width: '40px', height: '40px' }}
    />
    <span style={textStyle}>Register</span>
  </div>
</Link>


      {/* Members */}
      <Link to="/members" style={{ textDecoration: 'none' }}>
      <div style={tileStyle}>
        <DotLottieReact
          src="https://lottie.host/d3a8279a-e912-4f05-acec-d74f213f8340/Dky52Q7N8B.lottie"
          loop
          autoplay
          style={{ width: '40px', height: '40px' }}
        />
        <span style={textStyle}>Members</span>
      </div>
      </Link>

      {/* Earnings */}
      <Link to="/earnings" style={{ textDecoration: 'none' }}>
      <div style={tileStyle}>
        <DotLottieReact
          src="https://lottie.host/7141fd90-6691-4cbf-83b8-601781545453/Y1F6Kna5lq.lottie"
          loop
          autoplay
          style={{ width: '40px', height: '40px' }}
        />
        <span style={textStyle}>Earnings</span>
      </div>
      </Link>

      {/* Notifications */}
            <Link to="/notifications" style={{ textDecoration: 'none' }}>
      <div style={tileStyle}>
        <DotLottieReact
          src="https://lottie.host/92bb8248-2e15-4888-b8bd-65d226dffbde/7S2f2lWKSQ.lottie"
          loop
          autoplay
          style={{ width: '70px', height: '40px' }}
        />
        <span style={textStyle}>Notification</span>
      </div>
      </Link>
    </div>
  );
};

export default ShortcutTiles;
