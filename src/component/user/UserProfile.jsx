import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./userprof.css"

const UserProfile =() => {
    const [userData] = useState({
        username: "JohnDoe",
        email: "johndoe@example.com",
        phoneNumber: "123-456-7890"
    });

    return (
        <div>
            <h1>پروفایل کاربر</h1>
            <div className="profile-container">
                <div className="avatar">
                     <img src='./images2.png'></img>
                </div>
                <div className="user-details">
                    <p><strong>نام کاربری:</strong> {userData.username}</p>
                    <p><strong>ایمیل:</strong> {userData.email}</p>
                    <p><strong>شماره تلفن:</strong> {userData.phoneNumber}</p>
                    <Link className='link' to="/">بازگشت به خانه</Link>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;