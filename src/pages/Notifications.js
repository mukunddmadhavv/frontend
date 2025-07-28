import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { parseISO, format, addDays, isBefore } from 'date-fns';
import Navbar from '../components/Navbar';


const registeredMembers = [
  {
    fullName: 'Rohan Singh',
    mobile: '9999988888',
    dateJoined: '2024-06-01',
    planValidity: 30,
  },
  {
    fullName: 'Priya Sharma',
    mobile: '9999988889',
    dateJoined: '2024-07-01',
    planValidity: 20,
  },
];

const NotificationPage = () => {
  const today = new Date();

  const expiredMembers = registeredMembers.filter((member) => {
    const expiryDate = addDays(parseISO(member.dateJoined), member.planValidity);
    return isBefore(expiryDate, today);
  });

  return (
    <>
    <Navbar/>
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
        expiredMembers.map((member, idx) => (
          <div
            key={idx}
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
              Subscription expired on{' '}
              <strong>
                {format(addDays(parseISO(member.dateJoined), member.planValidity), 'dd MMM yyyy')}
              </strong>
            </p>
          </div>
        ))
      )}
    </div>
        </>

  );
};

export default NotificationPage;
