import React, { useState } from 'react';
import "./verification.css";
 

const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification code submission (e.g., send it to a server for validation)
    console.log('Verification code submitted:', verificationCode);
  };

  return (
    <div className="verification-container">
      <form className="verification-form" onSubmit={handleSubmit}>
        <label htmlFor="verificationCode">Verification Code:</label>
        <input 
          type="text" 
          id="verificationCode" 
          name="verificationCode"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="Enter verification code"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VerificationCode;