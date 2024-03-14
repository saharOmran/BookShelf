import React, { useState } from "react";
import "./signin.css"
import users from "../users.json"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from "react-toastify";
 
 
const SignIn = ({ setUser }) => {
  const [closed, setClosed] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    mobile_number: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (data.mobile_number === '' || data.password === '') {
    setError(1)
    return;
  }
  setError(null)

  const queryParams = new URLSearchParams({
    mobile_number: data.mobile_number,
    password: data.password
  });

  try {
    const res = await fetch(`http://127.0.0.1:8000/login2?${queryParams}`, {
      method: 'post',
      headers: {
        'accept': 'application/json'
      },
      
    });
    
    if (res.ok) {
      setUser(data.mobile_number);
      navigate("/", { replace: true });
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error.message);
    setError("Login failed");
  }
 
  };

  const handleChange = (e) => {
    //set new data after change 
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlecloseform = () => {
    setClosed(true);
    navigate("/", { replace: true });
  };

  return (
    <div className={closed ? "closed" : "sign"}>
      <section className="signIn">
        <div className="sign-box">
          <div>{error !== null && 'error'}</div>
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

              <button type="button" className="btn w-50 rounded-pill btn-danger mt-2" onClick={handlecloseform}>
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