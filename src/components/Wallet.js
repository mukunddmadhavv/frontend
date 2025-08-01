import React, { useEffect, useState } from 'react';
import { parseISO, isSameMonth } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Wallet = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatedEarnings, setAnimatedEarnings] = useState(0);
  const [animatedMembers, setAnimatedMembers] = useState(0);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const owner = JSON.parse(localStorage.getItem('businessOwner'));
        if (!owner?.mobile) return;

        const res = await fetch(
          `https://backend-3iv8.onrender.com/api/members?ownerMobile=${owner.mobile}`
        );
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error('Failed to fetch members', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes colorShiftGlow {
        0% { box-shadow: 0 0 12px #fbbf24; }
        33% { box-shadow: 0 0 12px #f59e0b; }
        66% { box-shadow: 0 0 12px #fcd34d; }
        100% { box-shadow: 0 0 12px #fbbf24; }
      }

      @keyframes sparkle {
        0% {
          opacity: 0;
          transform: scale(0.7) translateY(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) translateY(-8px) rotate(180deg);
        }
        100% {
          opacity: 0;
          transform: scale(0.7) translateY(0) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const now = new Date();
  const currentMonthMembers = members.filter((member) =>
    isSameMonth(parseISO(member.dateJoined), now)
  );
  const currentMonthEarnings = currentMonthMembers.reduce(
    (sum, m) => sum + Number(m.moneyPaid),
    0
  );

  // Animate earnings
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedEarnings(Math.floor(progress * currentMonthEarnings));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [currentMonthEarnings]);

  // Animate members
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedMembers(Math.floor(progress * currentMonthMembers.length));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [currentMonthMembers.length]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
        <DotLottieReact
          src="https://lottie.host/d8e97e0b-0dd7-4d00-a37f-828f989e9297/87ZlTWq9VV.lottie"
          loop
          autoplay
          style={{ width: '120px', height: '120px' }}
        />
      </div>
    );
  }

  const renderSparkles = () => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 5 + 5; // 5px–10px
      const duration = Math.random() * 10 + 5; // 5s–15s
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const delay = Math.random() * 10;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: '#ffffffcc',
            left: `${left}%`,
            top: `${top}%`,
            animation: `sparkle ${duration}s ease-in-out ${delay}s infinite`,
            pointerEvents: 'none',
          }}
        />
      );
    });
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '10px',
        padding: '24px',
        borderRadius: '20px',
        background: 'linear-gradient(180deg, #FDE68A, #F59E0B)',
        color: '#4B3209',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        animation: 'colorShiftGlow 5s ease-in-out infinite',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Sparkles */}
      {renderSparkles()}

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontSize: '22px', margin: 'auto', fontWeight: 600 }}>
          💰 Monthly Overview
        </h3>
        <p style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600 }}>
          Earnings : <strong>₹ {animatedEarnings.toLocaleString()}</strong>
        </p>
        <p style={{ fontSize: '16px', margin: '8px 0', fontWeight: 600 }}>
          Members : <strong>{animatedMembers}</strong>
        </p>
      </div>
    </div>
  );
};

export default Wallet;
