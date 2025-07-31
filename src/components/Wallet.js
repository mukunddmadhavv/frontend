import React, { useEffect, useState } from 'react';
import { parseISO, isSameMonth } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Wallet = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animatedEarnings, setAnimatedEarnings] = useState(0);

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

  // Counter animation for earnings
  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * currentMonthEarnings);
      setAnimatedEarnings(value);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [currentMonthEarnings]);

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
      <h3
        style={{
          fontSize: '22px',
          margin: 'auto',
          fontWeight: 600,
        }}
      >
        💰 Monthly Overview
      </h3>
      <p
        style={{
          fontSize: '16px',
          margin: '8px 0',
          fontWeight: 600,
        }}
      >
        Earnings : <strong>₹ {animatedEarnings.toLocaleString()}</strong>
      </p>
      <p
        style={{
          fontSize: '16px',
          margin: '8px 0',
          fontWeight: 600,
        }}
      >
        Members : <strong>{currentMonthMembers.length}</strong>
      </p>
    </div>
  );
};

export default Wallet;
