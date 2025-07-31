// components/ExpiredMembers.js
import React, { useEffect, useState } from 'react';
import { parseISO, addDays, addMonths, isBefore, format } from 'date-fns';

const calculateExpiryDate = (joinedDate, validity) => {
  const date = parseISO(joinedDate);
  switch (validity) {
    case '15 days':
      return addDays(date, 15);
    case '1 month':
      return addMonths(date, 1);
    case '3 months':
      return addMonths(date, 3);
    case '6 months':
      return addMonths(date, 6);
    default:
      return date;
  }
};

const ExpiredMembers = () => {
  const [expired, setExpired] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
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

  const handleDelete = (id) => {
    setExpired(expired.filter((m) => m._id !== id));
  };

  const handleEdit = (member) => {
    setEditingMember(member._id);
    setFormData({
      fullName: member.fullName,
      mobile: member.mobile,
      email: member.email || '',
      moneyPaid: member.moneyPaid,
      dateJoined: format(new Date(), 'yyyy-MM-dd'), // new join date
      planValidity: member.planValidity,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://backend-3iv8.onrender.com/api/members/${editingMember}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      alert('Renewed successfully');
      setExpired((prev) => prev.filter((m) => m._id !== editingMember));
      setEditingMember(null);
    } catch (error) {
      alert('Renewal failed');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2>📛 Expired Members</h2>

      {expired.map((member) => (
        <div
          key={member._id}
          style={{
            margin: '20px 0',
            padding: '20px',
            borderRadius: '12px',
            background: '#fff7e6',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <p><strong>Name:</strong> {member.fullName}</p>
          <p><strong>Mobile:</strong> {member.mobile}</p>
          <p><strong>Email:</strong> {member.email || 'N/A'}</p>
          <p><strong>Plan Validity:</strong> {member.planValidity}</p>
          <p><strong>Joined:</strong> {format(parseISO(member.dateJoined), 'yyyy-MM-dd')}</p>

          <button onClick={() => handleEdit(member)} style={{ marginRight: '10px' }}>
            Renew
          </button>
          <button onClick={() => handleDelete(member._id)} style={{ color: 'red' }}>
            Delete
          </button>
        </div>
      ))}

      {editingMember && formData && (
        <form
          onSubmit={handleRenewSubmit}
          style={{
            background: '#f3f4f6',
            padding: '20px',
            marginTop: '30px',
            borderRadius: '12px',
            maxWidth: '500px',
          }}
        >
          <h3>🔁 Renew Member</h3>
          {['fullName', 'mobile', 'email', 'moneyPaid', 'dateJoined'].map((field) => (
            <div key={field} style={{ marginBottom: '10px' }}>
              <label>{field}:</label>
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
            <label>Plan Validity:</label>
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
              background: '#0a8754',
              color: 'white',
              padding: '12px 18px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Submit Renewal
          </button>

          <button
            onClick={() => setEditingMember(null)}
            type="button"
            style={{
              background: '#999',
              color: 'white',
              padding: '12px 18px',
              border: 'none',
              borderRadius: '10px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ExpiredMembers;
