import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [owners, setOwners] = useState([]);
  const [expandedOwners, setExpandedOwners] = useState({});
  const [membersMap, setMembersMap] = useState({});
  const [expandedMembers, setExpandedMembers] = useState({});

  useEffect(() => {
    fetch('https://backend-3iv8.onrender.com/api/business-owners')
      .then(res => res.json())
      .then(data => setOwners(data))
      .catch(err => console.error('Failed to fetch owners:', err));
  }, []);

  const toggleMembers = async (ownerMobile) => {
    if (!expandedOwners[ownerMobile] && !membersMap[ownerMobile]) {
      try {
        const res = await fetch(`https://backend-3iv8.onrender.com/api/business-owners/${ownerMobile}/members`);
        const members = await res.json();
        const grouped = groupRenewals(members);
        setMembersMap(prev => ({ ...prev, [ownerMobile]: grouped }));
      } catch (err) {
        console.error('Failed to fetch members:', err);
      }
    }

    setExpandedOwners(prev => ({
      ...prev,
      [ownerMobile]: !prev[ownerMobile],
    }));
  };

  const toggleMemberDetail = (key) => {
    setExpandedMembers(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`;
  };

  const groupRenewals = (members) => {
    const grouped = {};
    members.forEach(member => {
      const key = `${member.fullName}_${member.mobile}_${member.email}_${member.ownerMobile}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(member);
    });

    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(a.dateJoined) - new Date(b.dateJoined));
    });

    return grouped;
  };

  const getOrdinal = (n) => {
    if (n === 1) return '1st';
    if (n === 2) return '2nd';
    if (n === 3) return '3rd';
    return `${n}th`;
  };

  return (
    <div style={{
      padding: '40px 20px',
      fontFamily: 'Plus Jakarta Sans, sans-serif',
      background: '#f5f7fb',
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

      {owners.map((owner, ownerIndex) => (
        <div
          key={owner._id}
          style={{
            marginBottom: '24px',
            borderRadius: '16px',
            background: '#fff',
            boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
            padding: '18px 20px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '600' }}>
              {ownerIndex + 1}. {owner.businessName}
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
              {Object.keys(membersMap[owner.mobile] || {}).map((key, memberIndex) => {
                const renewals = membersMap[owner.mobile][key];
                const member = renewals[0];
                return (
                  <div
                    key={key}
                    style={{
                      padding: '12px 16px',
                      background: '#f7f9fc',
                      borderRadius: '12px',
                      marginBottom: '12px',
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <div
                      onClick={() => toggleMemberDetail(key)}
                      style={{
                        fontWeight: '600',
                        fontSize: '15px',
                        color: '#2b2b2b',
                        cursor: 'pointer'
                      }}
                    >
                      {memberIndex + 1}. {member.fullName}
                    </div>

                    {expandedMembers[key] && (
                      <div style={{ marginTop: '10px', fontSize: '14px', color: '#444' }}>
                        {renewals.map((r, i) => (
                          <div key={r._id} style={{
                            borderTop: i !== 0 ? '1px solid #ccc' : '',
                            paddingTop: i !== 0 ? '8px' : '0',
                            marginTop: i !== 0 ? '8px' : '0'
                          }}>
                            <strong>{getOrdinal(i + 1)} Renewal</strong><br />
                            📅 Date Joined: {formatDate(r.dateJoined)}<br />
                            📦 Plan Validity: {r.planValidity}<br />
                            💰 Money Paid: ₹{r.moneyPaid}
                          </div>
                        ))}
                        <div style={{ marginTop: '10px', color: '#666' }}>
                          📱 Mobile: {member.mobile} <br />
                          📧 Email: {member.email || 'N/A'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
