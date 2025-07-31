// pages/ExpiredMembers.js
import React, { useState, useEffect } from 'react';
import { parseISO, addDays, isBefore } from 'date-fns';

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
    const expired = members.filter(member => {
      const joinDate = parseISO(member.dateJoined);
      const expiryDate = addDays(joinDate, parseInt(member.planValidity));
      return isBefore(expiryDate, now);
    });

    setExpiredMembers(expired);
  }, [members]);

  const handleRenew = async (memberId) => {
    const member = expiredMembers.find(m => m._id === memberId);
    const payload = {
      fullName: member.fullName,
      mobile: member.mobile,
      email: member.email,
      ownerMobile: member.ownerMobile,
      dateJoined: new Date().toISOString(),
      moneyPaid: renewalData[memberId]?.moneyPaid || '',
      planValidity: renewalData[memberId]?.planValidity || ''
    };

    const res = await fetch('https://backend-3iv8.onrender.com/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setExpiredMembers(prev => prev.filter(m => m._id !== memberId));
      setExpandedId(null);
      alert('Renewed successfully!');
    } else {
      alert('Failed to renew. Please try again.');
    }
  };

  const handleDelete = (memberId) => {
    setExpiredMembers(prev => prev.filter(m => m._id !== memberId));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2>⏰ Expired Members</h2>
      {expiredMembers.length === 0 ? (
        <p>No expired members</p>
      ) : (
        expiredMembers.map(member => (
          <div
            key={member._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '10px',
              marginBottom: '15px',
              padding: '15px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{member.fullName}</strong>
              <button
                onClick={() => setExpandedId(prev => (prev === member._id ? null : member._id))}
                style={{
                  background: '#facc15',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
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
                      setRenewalData(prev => ({
                        ...prev,
                        [member._id]: {
                          ...prev[member._id],
                          moneyPaid: e.target.value
                        }
                      }))
                    }
                    style={{
                      marginLeft: '10px',
                      padding: '5px',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label>📅 New Validity (days):</label>
                  <input
                    type="number"
                    placeholder="Plan Validity"
                    value={renewalData[member._id]?.planValidity || ''}
                    onChange={(e) =>
                      setRenewalData(prev => ({
                        ...prev,
                        [member._id]: {
                          ...prev[member._id],
                          planValidity: e.target.value
                        }
                      }))
                    }
                    style={{
                      marginLeft: '10px',
                      padding: '5px',
                      borderRadius: '6px'
                    }}
                  />
                </div>
                <div style={{ marginTop: '15px' }}>
                  <button
                    onClick={() => handleRenew(member._id)}
                    style={{
                      background: '#22c55e',
                      border: 'none',
                      color: 'white',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      marginRight: '10px',
                      fontWeight: 600
                    }}
                  >
                    Renew Now
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    style={{
                      background: '#ef4444',
                      border: 'none',
                      color: 'white',
                      padding: '8px 14px',
                      borderRadius: '6px',
                      fontWeight: 600
                    }}
                  >
                    Delete
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
