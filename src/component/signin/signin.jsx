import React, { useState, useEffect } from "react";
import "./signin.css";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const SignIn = ({ setUser }) => {
  const [closed, setClosed] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    mobile_number: "",
    password: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
      if (savedUser === '0911117783268' || savedUser === '0911778326688') {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [navigate, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.mobile_number === '' || data.password === '') {
      setError('Please fill in all fields');
      return;
    }
    setError(null);
    const res = await fetch('http://127.0.0.1:80/token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `grant_type=&username=${data.mobile_number}&password=${data.password}&scope=&client_id=&client_secret=`
    });
  
    if (res.status === 200) {
      const resData = await res.json();
      const token = resData.access_token; // Assuming the token is returned in the access_token field
      console.log('Token received:', token); // Verify token is received
      localStorage.setItem('token', token); // Save token to localStorage
      setUser(data.mobile_number);
      localStorage.setItem("user", data.mobile_number); // Save user to localStorage
      if (data.mobile_number === '09114453123') {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      setError('Invalid credentials');
    }
  };
  

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseForm = () => {
    setClosed(true);
    navigate("/", { replace: true });
  };

  return (
    <div className={closed ? "closed" : "sign"}>
      <section className="signIn">
        <div className="sign-box">
          <div>{error && <span className="error">{error}</span>}</div>
          <div className="myform">
            <form onSubmit={handleSubmit} className="sign-form">
              <div className="mb-4">
                <label htmlFor="username" className="mb-1">شماره همراه</label>
                <input
                  name="mobile_number"
                  value={data.mobile_number}
                  onChange={handleChange}
                  type="tel"
                  className="form-control"
                  id="mobile_number"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Password" className="form-label mb-1">
                  رمز عبور
                </label>
                <input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  type="password"
                  className="form-control"
                  id="Password"
                />
              </div>
              <button type="submit" className="btn w-50 rounded-pill btn-danger">
                ورود
              </button>
              <button type="button" className="btn w-50 rounded-pill btn-danger mt-2" onClick={handleCloseForm}>
                بازگشت
              </button>
            </form>
          </div>
          <div className="side-form"></div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;