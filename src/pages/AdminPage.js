import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [owners, setOwners] = useState([]);
  const [expandedOwners, setExpandedOwners] = useState({});
  const [membersMap, setMembersMap] = useState({});
  const [expandedMembers, setExpandedMembers] = useState({}); // To toggle each member detail

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

  const toggleMemberDetail = (memberId) => {
    setExpandedMembers(prev => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      background: '#f8f9fc',
      minHeight: '100vh'
    }}>
      <h1 style={{
        fontSize: '30px',
        fontWeight: '800',
        color: '#083ca0',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Admin Dashboard
      </h1>

      {owners.map(owner => (
        <div
          key={owner._id}
          style={{
            marginBottom: '20px',
            borderRadius: '16px',
            background: '#fff',
            boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
            padding: '18px 20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {owner.businessName}
            </div>

            <button
              onClick={() => toggleMembers(owner.mobile)}
              style={{
                padding: '8px 16px',
                background: '#083ca0',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              {expandedOwners[owner.mobile] ? 'Hide Members' : 'View Members'}
            </button>
          </div>

          {expandedOwners[owner.mobile] && (
            <div style={{ marginTop: '16px', paddingLeft: '8px' }}>
              {membersMap[owner.mobile]?.length ? (
                membersMap[owner.mobile].map(member => (
                  <div
                    key={member._id}
                    style={{
                      padding: '12px 16px',
                      background: '#f7f9fc',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <div
                      onClick={() => toggleMemberDetail(member._id)}
                      style={{
                        fontWeight: '600',
                        fontSize: '15px',
                        color: '#2b2b2b',
                        cursor: 'pointer'
                      }}
                    >
                      {member.fullName}
                    </div>

                    {expandedMembers[member._id] && (
                      <div style={{ marginTop: '10px', fontSize: '14px', color: '#444' }}>
                        <div>📱 Mobile: {member.mobile}</div>
                        <div>📧 Email: {member.email || 'N/A'}</div>
                        <div>🗓️ Joined: {formatDate(member.dateJoined)}</div>
                        <div>📦 Plan: {member.planValidity}</div>
                        <div>💰 Paid: ₹{member.moneyPaid}</div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', color: '#888', marginTop: '10px' }}>
                  No members found for this business.
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
