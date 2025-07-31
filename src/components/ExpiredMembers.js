// components/ExpiredMembers.js
import React, { useEffect, useState } from 'react';
import { parseISO, addDays, addMonths, isBefore, format } from 'date-fns';

const calculateExpiryDate = (joinedDate, validity) => {
  const date = parseISO(joinedDate);
  switch (validity) {
    case '15 days': return addDays(date, 15);
    case '1 month': return addMonths(date, 1);
    case '3 months': return addMonths(date, 3);
    case '6 months': return addMonths(date, 6);
    default: return date;
  }
};

const ExpiredMembers = () => {
  const [expired, setExpired] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchExpired = async () => {
      const owner = JSON.parse(localStorage.getItem('businessOwner'));
      if (!owner?.mobile) return;

      const res = await fetch(`https://backend-3iv8.onrender.com/api/members?ownerMobile=${owner.mobile}`);
      const data = await res.json();

      const now = new Date();
      const expiredList = data.filter((member) => {
        const expiryDate = calculateExpiryDate(member.dateJoined, member.planValidity);
        return isBefore(expiryDate, now);
      });

      setExpired(expiredList);
    };

    fetchExpired();
  }, []);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setExpired(expired.filter(m => m._id !== id));
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    setFormData({
      fullName: member.fullName,
      mobile: member.mobile,
      email: member.email || '',
      moneyPaid: member.moneyPaid,
      dateJoined: format(new Date(), 'yyyy-MM-dd'), // new date
      planValidity: member.planValidity,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://backend-3iv8.onrender.com/api/members/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert('Renewed successfully');
      setExpired(prev => prev.filter(m => m._id !== editingId));
      setEditingId(null);
      setExpandedId(null);
    } catch (error) {
      alert('Renewal failed');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>📛 Expired Members</h2>

      {expired.map((member) => (
        <div key={member._id} style={{ marginBottom: '16px' }}>
          {/* Collapsible Header */}
          <div
            onClick={() => handleToggle(member._id)}
            style={{
              background: '#fef3c7',
              padding: '12px 16px',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            {member.fullName}
          </div>

          {/* Expanded Content */}
          {expandedId === member._id && (
            <div
              style={{
                background: '#fffbea',
                padding: '16px',
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <p><strong>Mobile:</strong> {member.mobile}</p>
              <p><strong>Email:</strong> {member.email || 'N/A'}</p>
              <p><strong>Money Paid:</strong> ₹{member.moneyPaid}</p>
              <p><strong>Date Joined:</strong> {format(parseISO(member.dateJoined), 'yyyy-MM-dd')}</p>
              <p><strong>Plan Validity:</strong> {member.planValidity}</p>

              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => handleEdit(member)}
                  style={{
                    marginRight: '10px',
                    padding: '8px 14px',
                    background: '#0a8754',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Renew
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  style={{
                    padding: '8px 14px',
                    background: '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>

              {/* In-place Renewal Form */}
              {editingId === member._id && (
                <form onSubmit={handleRenewSubmit} style={{ marginTop: '20px' }}>
                  {['fullName', 'mobile', 'email', 'moneyPaid', 'dateJoined'].map((field) => (
                    <div key={field} style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '4px' }}>{field}</label>
                      <input
                        type={field === 'dateJoined' ? 'date' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                        }}
                      />
                    </div>
                  ))}

                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ display: 'block', marginBottom: '4px' }}>Plan Validity</label>
                    <select
                      name="planValidity"
                      value={formData.planValidity}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ccc',
                      }}
                    >
                      <option value="15 days">15 Days</option>
                      <option value="1 month">1 Month</option>
                      <option value="3 months">3 Months</option>
                      <option value="6 months">6 Months</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#083ca0',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    Submit Renewal
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    style={{
                      background: '#999',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpiredMembers;
