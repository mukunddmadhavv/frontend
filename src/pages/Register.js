import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    moneyPaid: '',
    dateJoined: '',
    planValidity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = ['fullName', 'mobile', 'moneyPaid', 'dateJoined', 'planValidity'];
  for (let field of requiredFields) {
    if (!formData[field]) {
      alert(`Please fill out the ${field} field.`);
      return;
    }
  }

  try {
    const stored = localStorage.getItem('businessOwner');
    const owner = stored ? JSON.parse(stored) : null;
    const token = owner?.token;

    console.log('📦 token:', token);
    if (!token) {
      alert('You are not logged in. Please login again.');
      return;
    }

    const dataToSend = {
      fullName: formData.fullName,
      mobile: formData.mobile,
      email: formData.email || '',
      moneyPaid: formData.moneyPaid,
      dateJoined: formData.dateJoined,
      planValidity: formData.planValidity,
    };

    console.log('📤 Sending data:', dataToSend);

    const response = await fetch('https://backend-3iv8.onrender.com/api/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (err) {
      console.error('❌ Failed to parse JSON from server:', err);
      alert('Server did not return valid JSON.');
      return;
    }

    console.log('✅ Server Response:', responseData);

    if (response.ok) {
      alert('Member registered successfully');
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        moneyPaid: '',
        dateJoined: '',
        planValidity: '',
      });
    } else {
      alert('Registration failed: ' + (responseData.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Client-side Error:', error);
    alert('An error occurred: ' + error.message);
  }
};


  const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text', required: true },
    { label: 'Mobile Number', name: 'mobile', type: 'tel', required: true },
    { label: 'Email Address (optional)', name: 'email', type: 'email', required: false },
    { label: 'Money Paid (₹)', name: 'moneyPaid', type: 'number', required: true },
    { label: 'Date Joined', name: 'dateJoined', type: 'date', required: true },
  ];

  return (
    <>
      <Navbar />
      <div
        style={{
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px 20px',
          background: '#fdfdfd',
          minHeight: '100vh',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '30px', color: '#083ca0' }}>
          Register Member
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '30px 25px',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: '16px' }}>
              <label
                htmlFor={field.name}
                style={{
                  display: 'block',
                  fontSize: '14px',
                  marginBottom: '6px',
                  fontWeight: '500',
                  color: '#444',
                }}
              >
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                id={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  outlineColor: '#083ca0',
                }}
              />
            </div>
          ))}

          {/* Plan Validity Dropdown */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="planValidity"
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '6px',
                fontWeight: '500',
                color: '#444',
              }}
            >
              Plan Validity
            </label>
            <select
              id="planValidity"
              name="planValidity"
              required
              value={formData.planValidity}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                fontSize: '14px',
                boxSizing: 'border-box',
                outlineColor: '#083ca0',
                backgroundColor: '#fff',
                color: '#333',
              }}
            >
              <option value="">-- Select Validity --</option>
              <option value="15 days">15 Days</option>
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
              <option value="6 months">6 Months</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#083ca0',
              color: '#fff',
              padding: '14px',
              fontSize: '15px',
              fontWeight: '600',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
