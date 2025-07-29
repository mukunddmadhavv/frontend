import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { parseISO, format } from 'date-fns';
import Navbar from '../components/Navbar';

const Earnings = () => {
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);

  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const ownerId = localStorage.getItem('ownerId');
      const response = await fetch(`https://backend-3iv8.onrender.com/api/members/${ownerId}`);
      const data = await response.json();
      setRegisteredMembers(data);
    } catch (err) {
      setError('Failed to fetch members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchMembers();
}, []);



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

  if (loading)
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <DotLottieReact
        src="https://lottie.host/fbc8bd46-75dc-4589-8516-96e479c3b81a/0ho87SHNau.lottie"
        loop
        autoplay
        style={{ width: '120px', height: '120px' }}
      />
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <>
      <Navbar />
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
