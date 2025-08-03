import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [owners, setOwners] = useState([]);
  const [expandedOwners, setExpandedOwners] = useState({}); // Track expanded dropdowns
  const [membersMap, setMembersMap] = useState({}); // ownerMobile -> members[]

  useEffect(() => {
    fetch('https://backend-3iv8.onrender.com/api/business-owners')
      .then(res => res.json())
      .then(data => setOwners(data))
      .catch(err => console.error('Failed to fetch owners:', err));
  }, []);

  const toggleMembers = async (ownerMobile) => {
    const isExpanded = expandedOwners[ownerMobile];

    if (!isExpanded && !membersMap[ownerMobile]) {
      try {
        const res = await fetch(`https://backend-3iv8.onrender.com/api/business-owners/${ownerMobile}/members`);
        const members = await res.json();
        setMembersMap(prev => ({ ...prev, [ownerMobile]: members }));
      } catch (err) {
        console.error('Failed to fetch members:', err);
      }
    }

    setExpandedOwners(prev => ({
      ...prev,
      [ownerMobile]: !prev[ownerMobile],
    }));
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>
        Admin Dashboard
      </h1>

      {owners.map(owner => (
        <div key={owner._id} style={{ marginBottom: '16px', border: '1px solid #ccc', borderRadius: '10px', padding: '16px', backgroundColor: '#fdfdfd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{owner.businessName}</strong> <br />
              <span style={{ fontSize: '13px', color: '#555' }}>
                Joined on {formatDate(owner.dateJoined)}
              </span>
            </div>
            <button
              onClick={() => toggleMembers(owner.mobile)}
              style={{
                padding: '8px 14px',
                background: '#083ca0',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {expandedOwners[owner.mobile] ? 'Hide Members' : 'View Members'}
            </button>
          </div>

          {expandedOwners[owner.mobile] && (
            <div style={{ marginTop: '16px', paddingLeft: '8px' }}>
              {membersMap[owner.mobile]?.length ? (
                membersMap[owner.mobile].map(member => (
                  <div key={member._id} style={{ borderTop: '1px solid #eee', padding: '10px 0' }}>
                    <strong>{member.fullName}</strong><br />
                    <span>📱 {member.mobile}</span><br />
                    <span>🗓️ Joined: {formatDate(member.dateJoined)}</span><br />
                    <span>📦 Plan: {member.planValidity}</span><br />
                    <span>💰 ₹{member.moneyPaid}</span>
                  </div>
                ))
              ) : (
                <p style={{ marginTop: '10px', fontStyle: 'italic', color: '#777' }}>
                  No members found.
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
