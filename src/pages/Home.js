import React from 'react';
import Navbar from '../components/Navbar';
import ShortcutTiles from '../components/ShortcutTiles';
import Wallet from '../components/Wallet';
import Banner from '../components/Banner';
import BusinessName from '../components/BusinessName';
import ExpiredMembersTile from '../components/ExpiredMembersTile';

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f4f6fb' }}>
      {/* Gradient Section */}
      <div
        style={{
          background: 'linear-gradient(180deg, #083ca0 0%, #4f7dcf 100%)',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          paddingBottom: '24px',
        }}
      >
        <Navbar />
        <Banner />
        <BusinessName />
        <ShortcutTiles />
      </div>

      {/* Light background content */}
      <div style={{ padding: '16px' }}>
        <Wallet />
        <ExpiredMembersTile />
      </div>
    </div>
  );
};

export default Home;