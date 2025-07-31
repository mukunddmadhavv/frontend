import React from 'react';

const Banner = () => {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '10px',
        padding: '10px',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, #059669, #065F46)', // Dark & rich green
        color: '#E6FFFA',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
        textAlign: 'center',
      }}
    >
      <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0 }}>
        ✅ Trusted by over <span style={{ color: '#A7F3D0' }}>1000+</span> Business Owners
      </h3>
    </div>
  );
};

export default Banner;
