import React, { useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { parseISO, format, addDays, isBefore } from 'date-fns';
import Navbar from '../components/Navbar';

const NotificationPage = () => {
  const [expiredMembers, setExpiredMembers] = useState([]);

  useEffect(() => {
    const fetchExpiredMembers = async () => {
      const stored = localStorage.getItem('businessOwner');
      const owner = stored ? JSON.parse(stored) : null;
      const ownerMobile = owner?.mobile;

      if (!ownerMobile) return;

      try {
        const res = await fetch(
          `https://backend-3iv8.onrender.com/api/members?ownerMobile=${ownerMobile}`
        );
        const data = await res.json();

        const now = new Date();
        const grouped = {};

        data.forEach((member) => {
          const key = `${member.fullName}_${member.mobile}_${member.ownerMobile}_${member.email}`;
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(member);
        });

        const expired = [];

        Object.values(grouped).forEach((group) => {
          const latest = group.reduce((a, b) =>
            new Date(a.dateJoined) > new Date(b.dateJoined) ? a : b
          );
          const days = parseInt(latest.planValidity) || 0;
          const expiryDate = addDays(parseISO(latest.dateJoined), days);

          if (isBefore(expiryDate, now)) {
            expired.push({ ...latest, expiryDate });
          }
        });

        setExpiredMembers(expired);
      } catch (err) {
        console.error('Error fetching expired members:', err);
      }
    };

    fetchExpiredMembers();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 24, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, marginRight: 16 }}>
            <DotLottieReact
              src="https://lottie.host/92bb8248-2e15-4888-b8bd-65d226dffbde/7S2f2lWKSQ.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <h2 style={{ color: '#083ca0', margin: 0 }}>Notifications</h2>
        </div>

        {expiredMembers.length === 0 ? (
          <p>No expired subscriptions</p>
        ) : (
          expiredMembers.map((member) => (
            <div
              key={member._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                backgroundColor: '#fff',
              }}
            >
              <strong>{member.fullName}</strong>
              <p style={{ margin: '4px 0' }}>
                {member.fullName}'s membership expired. They joined on{' '}
                <strong>{format(parseISO(member.dateJoined), 'dd MMM yyyy')}</strong>, paid{' '}
                <strong>₹{member.moneyPaid}</strong>, chose a{' '}
                <strong>{member.planValidity}</strong> plan, and the plan ended on{' '}
                <strong>{format(member.expiryDate, 'dd MMM yyyy')}</strong>.
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default NotificationPage;
