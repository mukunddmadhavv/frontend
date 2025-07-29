import React, { useEffect, useState } from 'react';
import { parseISO, differenceInDays, addDays } from 'date-fns';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const calculatePlanEnd = (joined, validity) => {
  const daysMap = {
    '15 days': 15,
    '1 month': 30,
    '3 months': 90,
    '6 months': 180,
  };

  const daysToAdd = daysMap[validity] || 30; // default 30 days
  const start = parseISO(joined);
  return addDays(start, daysToAdd);
};



const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
  const fetchMembers = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user?._id) {
        alert("Please login again.");
        return;
      }

      const res = await axios.get(`https://backend-3iv8.onrender.com/api/members/${user._id}`);
      setMembers(res.data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    }
  };

  fetchMembers();
}, []);


  const today = new Date();

   const enriched = members
    .map((member) => {
      const planEndsOn = calculatePlanEnd(member.dateJoined, member.planValidity);
      const daysLeft = differenceInDays(planEndsOn, today);
      const daysAfterExpiry = differenceInDays(today, planEndsOn);
      return {
        ...member,
        planEndsOn: planEndsOn.toISOString().split('T')[0],
        daysLeft,
        hideAfter7Days: daysAfterExpiry > 7, // true if expired more than 7 days ago
      };
    })
    .filter((member) => !member.hideAfter7Days) // remove those expired more than 7 days ago
    .sort((a, b) => a.daysLeft - b.daysLeft);


  const getBadgeStyle = (daysLeft) => {
    if (daysLeft < 0) {
      return { backgroundColor: '#fee2e2', color: '#991b1b' }; // red
    } else if (daysLeft < 5) {
      return { backgroundColor: '#fef3c7', color: '#92400e' }; // yellow
    } else {
      return { backgroundColor: '#d1fae5', color: '#065f46' }; // green
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          margin: 0,
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          backgroundColor: 'white',
          paddingRight: '10px',
          paddingLeft: '10px',
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
          <div style={{ width: '80px', height: '80px' }}>
            <DotLottieReact
              src="https://lottie.host/9eeadc46-5db0-4eec-9ced-31a443de2d24/H6XTepFv1F.lottie"
              loop
              autoplay
            />
          </div>

          <h1
            style={{
              color: '#083ca0',
              fontSize: '32px',
              fontWeight: 'bold',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              margin: 0,
            }}
          >
            Members
          </h1>
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
            <thead style={{ backgroundColor: '#083ca0', color: 'white' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px' }}></th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Plan Ends</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Days Left</th>
              </tr>
            </thead>
            <tbody>
              {enriched.map((member, index) => {
                const badgeStyle = getBadgeStyle(member.daysLeft);
                const isExpired = member.daysLeft < 0;

                return (
                  <tr key={member._id || index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{index + 1}</td>
                    <td style={{ padding: '12px', color: '#183b56', fontWeight: 500 }}>
                      {member.fullName}
                    </td>
                    <td style={{ padding: '12px', color: '#555' }}>{member.planEndsOn}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          ...badgeStyle,
                          padding: '6px 12px',
                          borderRadius: '999px',
                          fontSize: '14px',
                          fontWeight: 500,
                        }}
                      >
                        {isExpired
                          ? 'Expired'
                          : `${member.daysLeft} day${member.daysLeft === 1 ? '' : 's'}`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Members;
