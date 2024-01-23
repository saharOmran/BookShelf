import React, { useState } from "react";
import "./signin.css"
import users from "../users.json"
import { useNavigate } from "react-router"
import axios from "axios"



const SignIn = ({ setUser }) => {

  const [closed, setClosed] = useState(false);

  const [data, setData] = useState({
    username: "",
    password: "",
    errors: {}
  });

  let navigate = useNavigate();

  function JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof element == "object") {
      for (var idx in element)
        JSON_to_URLEncoded(element[idx], key ? key + "[" + idx + "]" : idx, list);
    } else {
      list.push(key + "=" + encodeURIComponent(element));
    }
    return list.join("&");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  users.users.forEach((user) => {
    //   if (user.username === data.username && user.password === data.password) {
    //   setUser(data.username);
    //   if (user.role === "1") {
    //     navigate("/admin", { replace: true });
    //   } else {
    //     navigate("/", { replace: true });
    //   }
    // }
    //   }
    //   )
    const encoded = JSON_to_URLEncoded({
      "username": data.username,
      "password" : data.password
    });

    let userInfo;

    // const res = await axios.get(api-url, {
    //   headers: {
    //     Authorization: Bearer ${token},
    //   },
    // });

    const response = await axios.post("http://127.0.0.1:8000/token", encoded);
     console.log("response", response.status)

  //   axios({
  //     method: "post",
  //     url: "http://127.0.0.1/category/add_category",
  //     data: JSON.stringify({name: "action"}),
  //     auth: response.data.access_token,
  //     headers:{'Content-Type':'application/json'}
  // }).then(res => )
    

    if (response.status == 200) {
       userInfo = await axios.get(`http://127.0.0.1:8000/user/get_user/${data.username}`);

    }

    if (userInfo.data.is_admin == true) {
      navigate("/admin", { replace: true });
    }

  }

const handleChange = (e) => {
  //set new data after change 
  setData({
    ...data, [e.target.name]: e.target.value,
  });
};

const handlecloseform = () => {
  setClosed(true);
  navigate("/", { replace: true });
}


return (
  <div className={closed ? "closed" : "sign"}>
    
    <section className="signIn">
      <div className="sign-box">
        <div className="myform">
          <form onSubmit={handleSubmit} className="sign-form">
            <div className="mb-4">
              <label htmlFor="username" className="mb-1">نام کاربری</label>
              <input
                name="username"
                value={data.username}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="username"
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



            <button type="submit" className="btn  w-50 rounded-pill btn-danger">
              ورود
            </button>

            <button type="button" className="btn  w-50 rounded-pill btn-danger mt-2" onClick={handlecloseform}>
              بازگشت 
            </button>
            {/* <div className="form-footer">
               Don't have an account ?{" "}
               <a href="Login.jsx">Login</a>
            </div> */}


          </form>
        </div>
        <div className="side-form">
        </div>
      </div>
    </section>
  </div>
);
}
export default SignIn;






 