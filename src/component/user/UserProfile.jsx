import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./userprof.css"

const UserProfile = ({ setUser }) => {
    const [userData] = useState({
        username: "JohnDoe",
        email: "johndoe@example.com",
        phoneNumber: "123-456-7890"
    });

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/", { replace: true });
    };

    return (
        <div>
            <h1>پروفایل کاربر</h1>
            <div className="profile-container">
                <div className="avatar">
                    <img src='./images2.png' alt="User Avatar"></img>
                </div>
                <div className="user-details">
                    <p><strong>نام کاربری:</strong> {userData.username}</p>
                    <p><strong>ایمیل:</strong> {userData.email}</p>
                    <p><strong>شماره تلفن:</strong> {userData.phoneNumber}</p>
                    <Link className='link' to="/">بازگشت به خانه</Link>
                    <button className="btn btn-danger" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
