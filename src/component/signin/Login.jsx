 
import { useNavigate} from "react-router-dom"
import "./form.css";
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import React, { useState } from 'react';
 // Assuming this is correctly imported


// const Login = () => {
//   const navigate=useNavigate();
//   const [sending,setSending]=useState(false)
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const account={ email,username,password }
//   const changeHandler=(e)=> {
//     const input=e.target.value
//     const account2={ ...account }
//     account2[e.target.name] = input
//     if(e.target.name==='email'){
//       setEmail(input)
//     }
//     if(e.target.name==='username'){
//       setUsername(input)
//     }
//     if(e.target.name==='password'){
//       setPassword(input)
//     }
    
//   }

//   // Form Submit Handler
//   const formSubmitHandler = async(event) => {
//     event.preventDefault();
//     event.preventDefault()
//     // const result = await validate()
//     // console.log(result)
//     setSending(true)
//     const response = await axios.post('https://reqres.in/api/login',changeHandler.account2);
//     setSending( false)
//     console.log(response)

//     if (email.trim() === "") {
//       return toast.error("وارد کردن ایمیل ضروری است");
//     }

//     if (username.trim() === "") {
//       return toast.error("وارد کردن نام کاربری ضروری است");
//     }

//     if (password.trim() === "") {
//       return toast.error("وارد کردن رمز ضروری است");
//     }

//     console.log({ email, password, username });
//     setEmail("");
//     setPassword("");
//     setUsername("");
//   };
 
//   return (
//     <div className="form-wrapper">
//       <ToastContainer />
//       <h1 className="form-title">Create new account</h1>
//       <form onSubmit={formSubmitHandler} className="form">
//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           placeholder="Email"
//         />
//         <input
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           type="text"
//           placeholder="Username"
//         />
//         <input
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//           placeholder="Password"
//         />
//         <button className="form-btn" type="submit">
//           Register
//         </button>
//       </form>
//       {/* <div className="form-footer">
//         Already have an account ?{" "}
//         <Link to="/login" className="forms-link">
//           Login
//         </Link>
//       </div> */}
//     </div>
//   );
// };

// export default Login;
// Filename - Form.js
export default function Login() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState('');
   
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);
    let navigate = useNavigate();
	const handlePhoneNumberChange = (e) => {
	  setPhoneNumber(e.target.value);
	  setSubmitted(false);
	};
	
	const handleEmail = (e) => {
	  setEmail(e.target.value);
	  setSubmitted(false);
	};
  
	const handlePassword = (e) => {
	  setPassword(e.target.value);
	  setSubmitted(false);
	};
  
	const handleUsername = (e) => {
	  setUsername(e.target.value);
	  setSubmitted(false);
	};
  

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username === "" || email === "" || password === "" || phoneNumber === "") {
		  setError(true);
		} else {
		  try {
			const queryParams = new URLSearchParams({
			  mobile_number: phoneNumber,
			  email: email,
			  username: username,
			  password: password
			});
			const response = await fetch(`http://127.0.0.1:8000/register/?${queryParams}`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json'
			  }
			});
			if (response.ok) {
			  const data = await response.json();
			  setSubmitted(true);
			  successMessage();
			  
			  navigate("/VerificationCode", { state: { phoneNumber: phoneNumber, verificationCode: data.verification_code } });
			} else {
			  console.error('Failed to create user:', response.statusText);
			  console.log('کد وارد شده نادرست است')
			}
		  } catch (error) {
			console.error('Error creating user:', error);
			//setError(true);
		  }
		}
	  };
	  
  
	const successMessage = () => {
	  return (
		<div className="success" style={{ display: error ? "" : "none" }}>
		  <h1>حساب {username} با موفقیت ساخته شد</h1>
		</div>
	  );
	};
  
	const errorMessage = () => {
	  return (
		<div className="error" style={{ display: error ? "" : "none" }}>
		  <h1>لطفا همه ی اطلاعات را وارد کنید</h1>
		</div>
	  );
	};
  
	return (
	  <div className="form-wrapper">
		<div>
		  <h1>ساخت حساب کاربری</h1>
		</div>
		<div className="messages">
		  {errorMessage()}
		</div>
		<form className="form">
		  <input
			onChange={handleEmail}
			className="input"
			value={email}
			type="email"
			placeholder="ایمیل"
		  />
		  <input
			value={username}
			onChange={handleUsername}
			type="text"
			placeholder="نام کاربری"
		  />
		  <input
			onChange={handlePassword}
			className="input"
			value={password}
			type="password"
			placeholder=" رمز عبور"
		  />
		  <input
			className="input"
			type="tel"
			value={phoneNumber}
			onChange={handlePhoneNumberChange}
			placeholder=" شماره همراه"
		  />
		  <button onClick={handleSubmit} className="btn" type="submit">
			ارسال
		  </button>
		</form>
	  </div>
	);
  };





 

 
 

 
