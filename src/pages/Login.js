import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const [form, setForm] = useState({ mobile: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);

      // ✅ Save token + businessOwner info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('businessOwner', JSON.stringify(res.data.businessOwner));

      // ✅ Navigate to home
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>🔐 Business Login</h2>
          <input
            type="text"
            name="mobile"
            placeholder="📱 Mobile Number"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            placeholder="🔑 Password"
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: '10px',
              marginTop: '20px',
            }}
          >
            <span style={{ color: '#fff', fontSize: '14px' }}>
              Not registered yet?
            </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                padding: '6px 12px',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              <strong>Sign Up</strong>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #083ca0, black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    paddingTop: '160px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  form: {
    backgroundColor: '#ffffff10',
    backdropFilter: 'blur(90px)',
    padding: '40px 30px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '30px',
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    letterSpacing: '1px',
  },
  input: {
    padding: '12px 15px',
    marginBottom: '20px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '16px',
    backgroundColor: 'white',
    color: '#333',
  },
  button: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    background: '#083ca0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default Login;
