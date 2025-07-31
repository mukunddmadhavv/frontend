// components/BusinessName.js
import React, { useEffect, useState } from 'react';

const BusinessName = () => {
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    const owner = JSON.parse(localStorage.getItem('businessOwner'));
    if (owner?.businessName) {
      setBusinessName(owner.businessName);
    }
  }, []);

  return (
    <div style={{ marginLeft: '10px' }}>
      <div
        style={{
          display: 'inline-block',
          padding: '10px 18px',
          borderRadius: '20px',
          background: 'linear-gradient(180deg, #7f1d1d, #b91c1c)',
          color: '#FFE4E6',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          boxShadow: '0 6px 14px rgba(0,0,0,0.1)',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0 }}>
          <span style={{ color: '#fecaca' }}>Welcome, 
            { businessName || ' Business Name'}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default BusinessName;
