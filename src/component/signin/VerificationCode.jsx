import React, { useState } from 'react';
import "./verification.css";
import { useLocation } from "react-router-dom";
import { useNavigate} from "react-router-dom"
const VerificationCode = () => {

  const [verificationCode, setVerificationCode] = useState('');
  const location = useLocation();
  const [error, setError] = useState(false);

  const phoneNumber = location.state ? location.state.phoneNumber : ""; // Retrieve phone number from state
  let navigate = useNavigate();

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const successMessage = () => {
	  return (
		<div className="success">
		  <h1>ثبت نام با موفقیت انجام شد</h1>
		</div>
	  );
	};
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams({
      mobile_number: phoneNumber,
      verification_code: verificationCode
    });
    try {
      const response = await fetch(`http://127.0.0.1:80/login/?${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mobile_number: phoneNumber,
          verification_code: verificationCode
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        successMessage();
        navigate("/localhost:3000")
        // Handle successful login response
      } else {
        const errorData = await response.json();
        setError(true);
        // Handle login failure
      }
    } catch (error) {
      errorMessage();
      console.error('Error:', error);
      // Handle network or other errors
    }
  };

  const errorMessage = () => {
	  return (
		<div className="error" style={{ display: error ? "" : "none" }}>
		  <h1>کد وارد شده نادرست است  </h1>
		</div>
	  );
	};

 
  return (
    <div className="verification-container">
      <div className="messages">
		  {errorMessage()}
		  </div>
      <form className="verification-form" onSubmit={handleSubmit}>
        <label htmlFor="verificationCode">کد تایید:</label>
        <input 
          type="text" 
          id="verificationCode" 
          name="verificationCode"
          value={verificationCode}
          onChange={handleVerificationCodeChange}
          placeholder="کد تایید را وارد کنید"
        />
        <button type="submit">ثبت نام</button>
      </form>
    </div>
  );
};

export default VerificationCode;