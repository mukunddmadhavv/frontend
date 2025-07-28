import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [menuOpen, setMenuOpen] = useState(false);

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
      paddingLeft:'20px',
      paddingTop:'10px',
      paddingRight:'10px',
      paddingBottom:'0px',  
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
  display: isMobile ? 'block' : 'none',
  fontSize: '50px', // reduced from 50px to better match logo height
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: '#083ca0',
  paddingBottom: '10px',
  margin: 0,
  lineHeight: 1,
  alignSelf: 'center', // vertically centers inside flex
}

  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Track</div>

      <button style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      <ul style={styles.links}>
        <li><a href="/" style={styles.link}>Dashboard</a></li>
        <li><a href="/members" style={styles.link}>Members</a></li>
        <li><a href="/plans" style={styles.link}>Plans</a></li>
        <li><a href="/reports" style={styles.link}>Reports</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
