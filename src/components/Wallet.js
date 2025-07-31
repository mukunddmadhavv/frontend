// components/Wallet.js
import React, { useEffect, useState } from 'react';
import { parseISO, isSameMonth } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Wallet = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const now = new Date();

  const currentMonthMembers = members.filter((member) =>
    isSameMonth(parseISO(member.dateJoined), now)
  );

  const currentMonthEarnings = currentMonthMembers.reduce(
    (sum, m) => sum + Number(m.moneyPaid),
    0
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
        <DotLottieReact
          src="https://lottie.host/d8e97e0b-0dd7-4d00-a37f-828f989e9297/87ZlTWq9VV.lottie"
          loop
          autoplay
          style={{ width: '100px', height: '100px' }}
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
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ fontSize: '22px', margin: 'auto' }}>💰 Wallet Overview</h3>
      <p style={{ fontSize: '16px', margin: '8px 0' }}>
        <strong>Total Earnings (This Month):</strong> ₹ {currentMonthEarnings}
      </p>
      <p style={{ fontSize: '16px', margin: '8px 0' }}>
        <strong>New Members (This Month):</strong> {currentMonthMembers.length}
      </p>
    </div>
  );
};

export default Wallet;
