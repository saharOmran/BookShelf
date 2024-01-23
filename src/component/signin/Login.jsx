import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom"
import "./form.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';


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
	// States for registration
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	// Handling the name change
 
	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};
  const handleUsername = (e) => {
		setUsername(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (username === "" || email === "" || password === "") {
			setError(true);
		} else {
			setSubmitted(true);
			setError(false);
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? "" : "none",
				}}
			>
				<h1>حساب {username} با موفقیت ساخته شد </h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
      <div className="from-wrapper">
			<div
				className="error"
				style={{
					display: error ? "" : "none",
				}}
			>
				<h1>لطفا همه ی اطلاعات را وارد کنید</h1>
			</div>
      </div>
		);
	};

	return (
		<div className="form-wrapper">
			<div>
				<h1>ساخت حساب کاربری</h1>
			</div>

			{/* Calling to the methods */}
			<div className="messages">
				{errorMessage()}
				{successMessage()}
			</div>

			<form className="form">
				{/* Labels and inputs for form data */}
			 
				{/* <label className="label">ایمیل</label> */}
				<input
					onChange={handleEmail}
					className="input"
					value={email}
					type="email"
          placeholder="ایمیل"
          
				/>
          {/* <label className="label">نام کاربری</label> */}
          <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

				<button onClick={handleSubmit} className="btn" type="submit">
					ثبت نام
				</button>
			</form>
		</div>
	);
}

