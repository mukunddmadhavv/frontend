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
      localStorage.setItem('user', JSON.stringify(res.data.owner));
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
    <Navbar/>
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
      </form>
    </div>
    </>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #083ca0,black)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
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
