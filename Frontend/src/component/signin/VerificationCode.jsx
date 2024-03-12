import React, { useState } from 'react';
import "./verification.css";

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ verificationCode })
      });
      if (response.ok) {
        console.log('Verification code submitted successfully');
        
      } else {
        console.error('Failed to submit verification code');
      }
    } catch (error) {
      console.error('Error submitting verification code:', error);
    }
  };

  return (
    <div className="verification-container">
      <form className="verification-form" onSubmit={handleSubmit}>
        <label htmlFor="verificationCode">کد تایید:</label>
        <input 
          type="text" 
          id="verificationCode" 
          name="verificationCode"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="Enter verification code"
        />
        <button type="submit">ثبت نام</button>
      </form>
    </div>
  );
};

export default VerificationCode;