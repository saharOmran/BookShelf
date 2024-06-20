import React, { useState, useEffect } from 'react';
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';
import './bookdetails.css';

const BookDetails = () => {
    const { book_id } = useParams();
    const [book, setBook] = useState(null);
    const [relatedBooks, setRelatedBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:80/book/get_book/${book_id}`);
                setBook(response.data);
                setLoading(false);

                // Fetch related books by category
                const categoryResponse = await axios.get(`http://127.0.0.1:80/book/get_books_by_category/${response.data.category}`);
                setRelatedBooks(categoryResponse.data);
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
      
      const addToFavorite = async () => {
        const token = localStorage.getItem('token');
        console.log('Token retrieved:', token); // Verify token is retrieved
        if (!token) {
            alert('User is not authenticated. Please log in.');
            return;
        }
        try {
            const response = await axios.post(
                `http://127.0.0.1:80/favorites/add?book_id=${book_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            alert(response.data.message || 'Book added to favorites!');
        } catch (error) {
            console.error('Error adding book to favorites:', error);
            alert('Failed to add book to favorites.');
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
                <div className="book-image">
                    <img src={book.image_url} alt={book.name} />
                </div>
                <div className="book-details-body">
                    <div className="book-details-header">
                        <h1 className="book-title">{book.name}</h1>
                    </div>
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
                    <div className="book-actions">
                        <button className="btn btn-primary" onClick={addToCart}>افزودن به سبد خرید</button>
                        <button className="btn btn-secondary" onClick={addToFavorite}>افزودن به علاقه‌مندی‌ها</button>
                    </div>
                </div>
            </div>
            <div className="book-description">
                <h2>معرفی کتاب</h2>
                <p>{book.explanation}</p>
            </div>
            <div className="related-books">
                <h2>کتاب‌های مرتبط</h2>
                <div className="related-books-list">
                    {relatedBooks.map((relatedBook) => (
                        <div key={relatedBook.id}    className="related-book-item">
                            <img src={relatedBook.image_url} alt={relatedBook.name} />
                            <h3>{relatedBook.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
