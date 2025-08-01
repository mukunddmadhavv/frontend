import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const hideHamburger = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingTop: '10px',
      paddingRight: '10px',
      paddingBottom: '10px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      position: 'relative',
      zIndex: 1000,
    },
    logo: {
      fontSize: '30px',
      fontWeight: 700,
      color: '#083ca0',
    },
    links: {
      listStyle: 'none',
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      position: isMobile ? 'absolute' : 'static',
      top: isMobile ? '60px' : 'auto',
      right: isMobile ? '20px' : 'auto',
      backgroundColor: '#ffffff',
      boxShadow: isMobile ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
      padding: isMobile ? '1rem' : 0,
      borderRadius: '8px',
      gap: isMobile ? '1rem' : '1.5rem',
    },
    link: {
      textDecoration: 'none',
      color: '#083ca0',
      fontWeight: 500,
      fontSize: '1rem',
    },
    hamburger: {
      display: hideHamburger ? 'none' : (isMobile ? 'block' : 'none'),
      fontSize: '40px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#083ca0',
      margin: 0,
      lineHeight: 1,
      alignSelf: 'center',
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>TRACK</div>

      <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul style={styles.links}>
        <li><a href="/" style={styles.link}>Home</a></li>
        <li><a href="/members" style={styles.link}>Members</a></li>
        <li><a href="/earnings" style={styles.link}>Earnings</a></li>
        <li>
  <button
    style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer' }}
    onClick={() => {
      localStorage.removeItem('businessOwner');
      window.location.href = '/login'; // forces full reload
    }}
  >
    Log Out
  </button>
</li>
      </ul>
    </nav>
  );
};

export default Navbar;
