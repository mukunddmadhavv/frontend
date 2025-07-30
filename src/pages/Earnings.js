import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { parseISO, format, subMonths, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';
import Navbar from '../components/Navbar';

const Earnings = () => {
  const [registeredMembers, setRegisteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMonth, setExpandedMonth] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const owner = JSON.parse(localStorage.getItem('businessOwner'));

        if (!owner || !owner.mobile) {
          setError('Business owner not logged in');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://backend-3iv8.onrender.com/api/members?ownerMobile=${owner.mobile}`
        );
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

  const earningsData = registeredMembers.reduce((acc, member) => {
    const date = parseISO(member.dateJoined);
    const monthYear = format(date, 'MMMM yyyy');
    acc[monthYear] = acc[monthYear] || { total: 0, members: [] };
    acc[monthYear].total += Number(member.moneyPaid);
    acc[monthYear].members.push(member);
    return acc;
  }, {});

  const sortedMonths = Object.keys(earningsData).sort((a, b) => {
    return new Date(`1 ${a}`) - new Date(`1 ${b}`);
  });

  const toggleMonth = (month) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  const getFilteredMembers = () => {
    const now = new Date();

    if (filterType === 'financial') {
      const year = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear();
      const from = new Date(year, 3, 1); // April 1
      const to = new Date(year + 1, 2, 31); // March 31
      return registeredMembers.filter(member =>
        isWithinInterval(parseISO(member.dateJoined), { start: from, end: to })
      );
    }

    if (filterType === 'last6') {
      const from = subMonths(now, 6);
      return registeredMembers.filter(member =>
        isWithinInterval(parseISO(member.dateJoined), { start: from, end: now })
      );
    }

    if (filterType === 'last3') {
      const from = subMonths(now, 3);
      return registeredMembers.filter(member =>
        isWithinInterval(parseISO(member.dateJoined), { start: from, end: now })
      );
    }

    if (filterType === 'last1') {
      const from = subMonths(now, 1);
      return registeredMembers.filter(member =>
        isWithinInterval(parseISO(member.dateJoined), { start: from, end: now })
      );
    }

    if (filterType === 'custom' && fromMonth && toMonth) {
      const from = startOfMonth(new Date(fromMonth));
      const to = endOfMonth(new Date(toMonth));
      return registeredMembers.filter(member =>
        isWithinInterval(parseISO(member.dateJoined), { start: from, end: to })
      );
    }

    if (filterType === 'thisYear') {
  const from = new Date(new Date().getFullYear(), 0, 1); // Jan 1 of current year
  const to = new Date(); // today
  return registeredMembers.filter(member =>
    isWithinInterval(parseISO(member.dateJoined), { start: from, end: to })
  );
}


    return registeredMembers;
  };

  const filteredMembers = getFilteredMembers();

  const totalEarnings = filteredMembers.reduce(
    (sum, member) => sum + Number(member.moneyPaid),
    0
  );

  const allMonthOptions = Array.from(
    new Set(
      registeredMembers.map((m) =>
        format(parseISO(m.dateJoined), 'yyyy-MM-01')
      )
    )
  ).sort();

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

  if (error) return <div style={{ padding: '20px' }}>{error}</div>;

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
              marginLeft: '10px',
            }}
          >
            Monthly Earnings
          </h2>
        </div>

        {/* ✅ Filter Options */}
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto 20px auto',
            backgroundColor: '#f7f7f7',
            padding: '16px',
            borderRadius: '12px',
          }}
        >
          <label style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>
            Filter by:
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                marginLeft: '10px',
                padding: '6px 10px',
                fontSize: '14px',
                borderRadius: '6px',
              }}
            >
              <option value="all">All Time</option>
              <option value="thisYear">This Year</option>
              <option value="last1">Last 1 Month</option>
              <option value="last3">Last 3 Months</option>
              <option value="last6">Last 6 Months</option>
              <option value="financial">This Financial Year</option>
              <option value="custom">Custom Month Range</option>
            </select>
          </label>

          {filterType === 'custom' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <div>
                <label style={{ fontSize: '13px' }}>From</label>
                <select
                  value={fromMonth}
                  onChange={(e) => setFromMonth(e.target.value)}
                  style={{ padding: '6px', borderRadius: '6px' }}
                >
                  <option value="">--</option>
                  {allMonthOptions.map((m) => (
                    <option key={m} value={m}>
                      {format(new Date(m), 'MMMM yyyy')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px' }}>To</label>
                <select
                  value={toMonth}
                  onChange={(e) => setToMonth(e.target.value)}
                  style={{ padding: '6px', borderRadius: '6px' }}
                >
                  <option value="">--</option>
                  {allMonthOptions.map((m) => (
                    <option key={m} value={m}>
                      {format(new Date(m), 'MMMM yyyy')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

<h3
  style={{
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
    fontWeight: 600,
  }}
>
  Total Earnings: ₹ {totalEarnings}
</h3>


        </div>

        <h3
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            color: '#333',
            fontWeight: 600,
          }}
        >
          Total Earnings: ₹ {totalEarnings}
        </h3>

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
