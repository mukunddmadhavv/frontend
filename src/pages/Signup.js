import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [form, setForm] = useState({ businessName: '', mobile: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <>
      <Navbar />
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #083ca0, black)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      paddingTop: '160px',
      paddingLeft: '20px',
      paddingRight: '20px',

    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#ffffff10',
        backdropFilter: 'blur(90px)',
        padding: '40px 30px',
        borderRadius: '16px',
        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{
          color: '#fff',
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '30px',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          letterSpacing: '1px',
        }}>🏢 Business Sign Up</h2>
        <input
          type="text"
          name="businessName"
          placeholder="🏷️ Business Name"
          onChange={handleChange}
          required
          style={{
            padding: '12px 15px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#333',
          }}
        />
        <input
          type="text"
          name="mobile"
          placeholder="📱 Mobile"
          onChange={handleChange}
          required
          style={{
            padding: '12px 15px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#333',
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="🔑 Password"
          onChange={handleChange}
          required
          style={{
            padding: '12px 15px',
            marginBottom: '20px',
            borderRadius: '8px',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            backgroundColor: 'white',
            color: '#333',
          }}
        />
        <button
  type="submit"
  style={{
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: '#083ca0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
    marginBottom: '15px',
  }}
>
  Sign Up
</button>

<div style={{ textAlign: 'center' }}>
  <span style={{ color: '#fff', fontSize: '14px', marginRight: '8px' }}>
    Already a member?
  </span>
  <button
    type="button"
    onClick={() => navigate('/login')}
    style={{
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 16px',
      fontSize: '14px',
      cursor: 'pointer',
    }}
  >
<strong> Log In</strong>
  </button>
</div>

      </form>
    </div>
    </>
  );
};

export default Signup;
