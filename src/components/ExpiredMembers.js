import React, { useState, useEffect } from 'react';
import { parseISO, addMonths, isBefore } from 'date-fns';

const ExpiredMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [renewingMember, setRenewingMember] = useState(null);

  const fetchMembers = async () => {
    try {
      const owner = JSON.parse(localStorage.getItem('businessOwner'));
      const res = await fetch(`https://backend-3iv8.onrender.com/api/members?ownerMobile=${owner.mobile}`);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error('Failed to fetch members', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const isExpired = (member) => {
    const joinDate = parseISO(member.dateJoined);
    const expiryDate = addMonths(joinDate, parseInt(member.planValidity));
    return isBefore(expiryDate, new Date());
  };

  const expiredMembers = members.filter(isExpired);

  const deleteMember = async (id) => {
    try {
      await fetch(`https://backend-3iv8.onrender.com/api/members/${id}`, { method: 'DELETE' });
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Error deleting:', err);
    }
  };

  const handleRenewClick = (member) => {
    setRenewingMember({
      ...member,
      moneyPaid: '',
      planValidity: '',
      dateJoined: new Date().toISOString().split('T')[0], // today
    });
  };

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://backend-3iv8.onrender.com/api/members/renew', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(renewingMember),
      });

      if (!res.ok) throw new Error('Renewal failed');
      setRenewingMember(null);
      fetchMembers(); // refresh
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '24px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2>⏳ Expired Members</h2>

      {expiredMembers.length === 0 ? (
        <p>No expired members 🎉</p>
      ) : (
        expiredMembers.map((member) => (
          <div
            key={member._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              background: '#fdfdfd',
            }}
          >
            <div
              onClick={() => setExpandedId(expandedId === member._id ? null : member._id)}
              style={{ cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}
            >
              {member.fullName}
            </div>

            {expandedId === member._id && (
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                <p><strong>Mobile:</strong> {member.mobile}</p>
                <p><strong>Email:</strong> {member.email || 'N/A'}</p>
                <p><strong>Money Paid:</strong> ₹{member.moneyPaid}</p>
                <p><strong>Date Joined:</strong> {member.dateJoined.split('T')[0]}</p>
                <p><strong>Plan Validity:</strong> {member.planValidity} months</p>

                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  <button onClick={() => deleteMember(member._id)} style={{ background: '#ff5b5b', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px' }}>
                    Delete
                  </button>
                  <button onClick={() => handleRenewClick(member)} style={{ background: '#0f9b57', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px' }}>
                    Renew
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}

      {renewingMember && (
        <div style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          padding: '24px',
          border: '2px solid #ccc',
          borderRadius: '16px',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
          zIndex: 999,
          width: '90%',
          maxWidth: '400px'
        }}>
          <h3>🔁 Renew Member</h3>
          <form onSubmit={handleRenewSubmit}>
            <div>
              <label>Full Name</label>
              <input
                type="text"
                value={renewingMember.fullName}
                onChange={(e) => setRenewingMember({ ...renewingMember, fullName: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Mobile</label>
              <input
                type="text"
                value={renewingMember.mobile}
                onChange={(e) => setRenewingMember({ ...renewingMember, mobile: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Money Paid</label>
              <input
                type="number"
                value={renewingMember.moneyPaid}
                onChange={(e) => setRenewingMember({ ...renewingMember, moneyPaid: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Plan Validity (months)</label>
              <input
                type="number"
                value={renewingMember.planValidity}
                onChange={(e) => setRenewingMember({ ...renewingMember, planValidity: e.target.value })}
                required
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <button type="submit" style={{ marginRight: '10px', background: '#0f9b57', color: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
                Submit
              </button>
              <button onClick={() => setRenewingMember(null)} style={{ background: '#999', color: '#fff', padding: '6px 12px', borderRadius: '6px' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExpiredMembers;
