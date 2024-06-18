import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './bookdetails.css';

const BookDetails = ({ onSave, onWishlist }) => {
    const { book_id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:80/book/get_book/${book_id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [book_id]);

    const addToCart = async () => {
        const token = localStorage.getItem('token');
        console.log('Token retrieved:', token); // Verify token is retrieved
        if (!token) {
          alert('User is not authenticated. Please log in.');
          return;
        }
        try {
          await axios.post(
            'http://127.0.0.1:80/cart/add',
            {
              book_id: book_id,
              quantity: 1
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          alert('Book added to cart!');
        } catch (error) {
          console.error('Error adding book to cart:', error);
          alert('Failed to add book to cart.');
        }
      };
      

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading book details: {error}</div>;
    }

    return (
        <div className="container book-details-container">
            <div className="first-row">
                <div className="book-details-header">
                    <h1 className="book-title">{book.name}</h1>
                </div>
                <div className="book-image">
                    <img src={book.image_url} alt={book.name} />
                </div>
                <div className="book-details-body">
                    <div className="book-info">
                        <div className="book-info-row">
                            <span>سال انتشار :</span> {book.year_of_publication}
                        </div>
                        <div className="book-info-row">
                            <span>نویسنده:</span> {book.writers_name}
                        </div>
                        <div className="book-info-row">
                            <span>انتشارات:</span> {book.publisher_name}
                        </div>
                        <div className="book-price">
                            <span className="discounted-price">{book.price} تومان</span>
                        </div>
                    </div>
                </div>
                <div className="book-actions">
                    <button className="btn btn-primary" onClick={addToCart}>افزودن به سبد خرید</button>
                    <button className="btn btn-secondary" onClick={() => onWishlist(book)}>افزودن به علاقه‌مندی‌ها</button>
                </div>
            </div>
            <div className="book-description">
                <h2>معرفی کتاب</h2>
                <p>{book.explanation}</p>
            </div>
        </div>
    );
};

export default BookDetails;
