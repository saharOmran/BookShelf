import React from 'react';
import './booksdie.css'; // Assuming you will use a CSS file for styling

const BooksDie = () => {
  return (
    <div className='diesection'>
      <div className="book-section">
        <div className="image-container">
          <img src="./Shouts-Elson-Reading.webp" alt="Person reading" className="book-image" />
        </div>
        <div className="content">
          <h1>۱۰ رمانی که باید قبل از مرگ بخوانید</h1>
          <a href='#'>
            <button className="book-list-button">مشاهده‌ی لیست کتاب‌ها</button>
          </a>
          <div className="discount-badge">
            <span>تا ۲۵٪ تخفیف</span>
            <span>Free Delivery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksDie;
