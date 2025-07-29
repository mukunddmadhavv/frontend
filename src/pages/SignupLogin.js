import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './Firebase';





const SignupLogin = () => {
  const [businessName, setBusinessName] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const generateRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {}
      });
    }
  };

  const handleSendOTP = async () => {
    if (!mobile || !businessName) {
      alert("Please enter both business name and mobile number.");
      return;
    }

    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+91' + mobile;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent successfully!');
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      localStorage.setItem('businessOwner', mobile);
      localStorage.setItem('businessName', businessName);
      navigate('/home');
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '100px auto',
      padding: '30px',
      border: '1px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#083ca0' }}>
        Business Owner Login
      </h2>

      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '12px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />

      <div id="recaptcha-container"></div>

      {!confirmationResult ? (
        <button
          onClick={handleSendOTP}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#083ca0',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Send OTP
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleVerifyOTP}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              marginTop: '10px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
};

export default SignupLogin;
