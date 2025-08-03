import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const container = document.querySelector('.star-container');
    if (!container) return;

    // Regular stars (diagonal, randomized)
    for (let i = 0; i < 25; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `-${Math.random() * 100}px`;
      star.style.animationDelay = `${Math.random() * 5}s`;
      star.style.animationDuration = `${3 + Math.random() * 2}s`;
      container.appendChild(star);
    }

    // One striking star
    const striking = document.createElement('div');
    striking.className = 'striking-star';
    striking.style.left = `${Math.random() * 90 + 5}%`;
    const size = `${4 + Math.random() * 4}px`;
    striking.style.width = size;
    striking.style.height = size;
    striking.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(striking);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        padding: '15px 20px 20px',
        marginTop: '180px',
        background: `linear-gradient(135deg, #450000, #7e0c0c, #b31312)`,
        filter: 'drop-shadow(0 0 20px rgba(179, 19, 18, 0.25))',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
      }}
    >
      {/* Curved Top Border */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '140px',
          backgroundColor: 'inherit',
          zIndex: 2,
          clipPath:
            'path("M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 L1000,0 L0,0 Z")',
        }}
      ></div>

      {/* Stars */}
      <div
        className="star-container"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      ></div>

      {/* Footer Content */}
      <div style={{ position: 'relative', zIndex: 3 }}>
        <h2
          className="shimmer"
          style={{
            fontSize: '28px',
            fontWeight: 700,
            marginBottom: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}
        >
          TRACK
        </h2>
        <p style={{ fontSize: '15px', opacity: 0.85 }}>
          Smart subscription management for growing businesses.
          <br/>
<strong>We manage subscriptions.<br/>You manage dreams — with ❤️ from India 🇮🇳</strong>
        </p>

        

        <p style={{ fontSize: '12px', marginTop: '24px', opacity: 0.6 }}>
          &copy; {new Date().getFullYear()} TRACK. All Rights Reserved.
        </p>
      </div>

      {/* CSS */}
      <style>{`
        @keyframes fall {
          0% {
            transform: translate(0, 0);
            opacity: 0.8;
          }
          100% {
            transform: translate(20vw, 100vh);
            opacity: 0;
          }
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          opacity: 0.7;
          animation: fall linear infinite;
        }

        @keyframes strikingFall {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          25% {
            transform: translate(10vw, 25vh) rotate(45deg);
          }
          50% {
            transform: translate(20vw, 50vh) rotate(90deg);
          }
          75% {
            transform: translate(30vw, 75vh) rotate(135deg);
          }
          100% {
            transform: translate(40vw, 100vh) rotate(180deg);
            opacity: 0;
          }
        }

        .striking-star {
          position: absolute;
          top: -20px;
          background: white;
          border-radius: 50%;
          box-shadow:
            0 0 6px rgba(255, 255, 255, 0.8),
            0 0 12px rgba(255, 255, 255, 0.4);
          opacity: 0.95;
          animation: strikingFall 4s ease-in-out infinite;
        }

        .shimmer {
          background: linear-gradient(90deg, #fff, #d1d1d1, #fff);
          background-size: 200% auto;
          color: white;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2.5s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
      `}</style>
    </div>
  );
};



export default Footer;
