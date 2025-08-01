import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const ShortcutTiles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media (max-width: 768px) {
        .tile {
          aspect-ratio: 1 / 1;
        }
      }

      @media (min-width: 769px) {
        .tile {
          aspect-ratio: auto;
          height: 80px;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const tileStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '14px',
    textAlign: 'center',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    width: '100%',
    minWidth: '60px',
  };

  const textStyle = {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '6px',
    lineHeight: '1.2',
    color: '#fff',
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const tiles = [
    {
      link: '/register',
      text: 'Register',
      bg: 'linear-gradient(180deg, #0f172a, #1e3a8a)',
      src: 'https://lottie.host/a230423f-17cc-4193-b3e6-5b212fa703e0/DepqE7PM3u.lottie',
    },
    {
      link: '/members',
      text: 'Members',
      bg: 'linear-gradient(180deg, #b45309, #f97316)',
      src: 'https://lottie.host/d3a8279a-e912-4f05-acec-d74f213f8340/Dky52Q7N8B.lottie',
    },
    {
      link: '/earnings',
      text: 'Earnings',
      bg: 'linear-gradient(180deg, #065f46, #059669)',
      src: 'https://lottie.host/7141fd90-6691-4cbf-83b8-601781545453/Y1F6Kna5lq.lottie',
    },
    {
      link: '/notifications',
      text: 'Notification',
      bg: 'linear-gradient(360deg, #b7791f, #f6e05e)',
      src: 'https://lottie.host/92bb8248-2e15-4888-b8bd-65d226dffbde/7S2f2lWKSQ.lottie',
    },
  ];

  return (
    <div style={containerStyle}>
      {tiles.map((tile, i) => (
        <Link to={tile.link} key={i} style={{ textDecoration: 'none' }}>
          <div className="tile" style={{ ...tileStyle, background: tile.bg }}>
            <DotLottieReact
              src={tile.src}
              loop
              autoplay
              style={{ width: '28px', height: '28px' }}
            />
            <span style={textStyle}><strong>{tile.text}</strong></span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShortcutTiles;
