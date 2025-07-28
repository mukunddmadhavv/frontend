import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { parseISO, format } from 'date-fns';
import Navbar from '../components/Navbar';


// Dummy data
const registeredMembers = [
  { fullName: 'Rohan Singh', moneyPaid: 500, dateJoined: '2025-07-10' },
  { fullName: 'Priya Sharma', moneyPaid: 1000, dateJoined: '2025-07-15' },
  { fullName: 'John D’Souza', moneyPaid: 1500, dateJoined: '2025-08-01' },
  { fullName: 'Aman Verma', moneyPaid: 2000, dateJoined: '2025-08-10' },
];

const Earnings = () => {
  const [expandedMonth, setExpandedMonth] = useState(null);

  // Organize earnings and members by month
  const earningsData = registeredMembers.reduce((acc, member) => {
    const date = parseISO(member.dateJoined);
    const monthYear = format(date, 'MMMM yyyy');
    acc[monthYear] = acc[monthYear] || { total: 0, members: [] };
    acc[monthYear].total += Number(member.moneyPaid);
    acc[monthYear].members.push(member);
    return acc;
  }, {});

  const sortedMonths = Object.keys(earningsData).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const toggleMonth = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <>
    <Navbar/>
    <div
      style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        padding: '40px 20px',
        background: 'white',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '10px',
        }}
      >
        <div style={{ width: '90px', height: '90px' }}>
          <DotLottieReact
            src="https://lottie.host/fbc8bd46-75dc-4589-8516-96e479c3b81a/0ho87SHNau.lottie"
            loop
            autoplay
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#083ca0',
            margin: 0,
          }}
        >
          Monthly Earnings
        </h2>
      </div>

      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        {sortedMonths.map((month) => (
          <div key={month}>
            <div
              onClick={() => toggleMonth(month)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
                padding: '12px 0',
                fontSize: '16px',
                background: expandedMonth === month ? '#f9f9f9' : 'white',
              }}
            >
              <span>{month}</span>
              <strong style={{ color: '#083ca0' }}>
                ₹ {earningsData[month].total}
              </strong>
            </div>

            {expandedMonth === month && (
              <div style={{ padding: '10px 0 10px 20px' }}>
                {earningsData[month].members.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '6px 0',
                      borderBottom: '1px dashed #ddd',
                      fontSize: '14px',
                    }}
                  >
                    <span>{member.fullName}</span>
                    <span>₹ {member.moneyPaid}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
        </>

  );
};

export default Earnings;
