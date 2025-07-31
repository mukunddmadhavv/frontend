// pages/ExpiredMembers.js
import React, { useState, useEffect } from 'react';
import { parseISO, addDays, isBefore } from 'date-fns';

const planOptions = [
  { label: '15 Days', value: '15 days' },
  { label: '1 Month', value: '1 month' },
  { label: '3 Months', value: '3 months' },
  { label: '6 Months', value: '6 months' },
];

const ExpiredMembers = () => {
  const [members, setMembers] = useState([]);
  const [expiredMembers, setExpiredMembers] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [renewalData, setRenewalData] = useState({});

  useEffect(() => {
    const fetchMembers = async () => {
      const owner = JSON.parse(localStorage.getItem('businessOwner'));
      const res = await fetch(`https://backend-3iv8.onrender.com/api/members?ownerMobile=${owner.mobile}`);
      const data = await res.json();
      setMembers(data);
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    const now = new Date();
    const grouped = {};

    members.forEach((member) => {
      const key = `${member.fullName}_${member.mobile}_${member.ownerMobile}_${member.email}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(member);
    });

    const expiredList = [];

    Object.values(grouped).forEach((group) => {
      const latest = group.reduce((a, b) =>
        new Date(a.dateJoined) > new Date(b.dateJoined) ? a : b
      );
      const joinDate = parseISO(latest.dateJoined);
      const days = parseInt(latest.planValidity) || 0;
      const expiryDate = addDays(joinDate, days);

      if (isBefore(expiryDate, now)) {
        expiredList.push(latest);
      }
    });

    setExpiredMembers(expiredList);
  }, [members]);

  const handleRenew = async (memberId) => {
    const member = expiredMembers.find((m) => m._id === memberId);
    const payload = {
      fullName: member.fullName,
      mobile: member.mobile,
      email: member.email,
      ownerMobile: member.ownerMobile,
      dateJoined: new Date().toISOString(),
      moneyPaid: renewalData[memberId]?.moneyPaid || '',
      planValidity: renewalData[memberId]?.planValidity || '',
    };

    const res = await fetch('https://backend-3iv8.onrender.com/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setExpiredMembers((prev) => prev.filter((m) => m._id !== memberId));
      setExpandedId(null);
      alert('Renewed successfully!');
    } else {
      alert('Failed to renew. Please try again.');
    }
  };

  

  return (
    <div style={{ padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2>⏰ Expired Members</h2>
      {expiredMembers.length === 0 ? (
        <p>No expired members</p>
      ) : (
        expiredMembers.map((member) => (
          <div
            key={member._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              marginBottom: '15px',
              padding: '15px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{member.fullName}</strong>
              <button
                onClick={() =>
                  setExpandedId((prev) => (prev === member._id ? null : member._id))
                }
                style={{
                  background: '#facc15',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                {expandedId === member._id ? 'Hide' : 'Renew'}
              </button>
            </div>

            {expandedId === member._id && (
              <div style={{ marginTop: '15px' }}>
                <p><strong>Mobile:</strong> {member.mobile}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Last Paid:</strong> ₹ {member.moneyPaid}</p>

                <div style={{ marginTop: '10px' }}>
                  <label>💸 New Payment:</label>
                  <input
                    type="number"
                    placeholder="Money Paid"
                    value={renewalData[member._id]?.moneyPaid || ''}
                    onChange={(e) =>
                      setRenewalData((prev) => ({
                        ...prev,
                        [member._id]: {
                          ...prev[member._id],
                          moneyPaid: e.target.value,
                        },
                      }))
                    }
                    style={{
                      marginLeft: '10px',
                      padding: '5px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                    }}
                  />
                </div>

                <div style={{ marginTop: '10px' }}>
                  <label>📅 New Validity:</label>
                  <select
                    value={renewalData[member._id]?.planValidity || ''}
                    onChange={(e) =>
                      setRenewalData((prev) => ({
                        ...prev,
                        [member._id]: {
                          ...prev[member._id],
                          planValidity: e.target.value,
                        },
                      }))
                    }
                    style={{
                      marginLeft: '10px',
                      padding: '6px',
                      borderRadius: '6px',
                      border: '1px solid #ccc',
                    }}
                  >
                    <option value="">-- Select Validity --</option>
                    {planOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginTop: '15px' }}>
                  <button
  onClick={() => handleRenew(member._id)}
  style={{
    background: 'linear-gradient(180deg, #065f46, #059669)', // Premium dark green gradient
    border: 'none',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '6px',
    marginRight: '10px',
    fontWeight: 600,
    cursor: 'pointer',
  }}
>
  Renew Now
</button>

                  
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExpiredMembers;
