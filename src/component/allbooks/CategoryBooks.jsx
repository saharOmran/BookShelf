import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './categorybooks.css';

const CategoryBooks = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const encodedCategory = encodeURIComponent(name);
                const response = await fetch(`http://127.0.0.1:80/book/get_books_by_category/${encodedCategory}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }

                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Failed to load books:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [name]);

    const handleBookClick = (id) => {
        console.log(books.title); // Add this line to inspect the clicked book object
        navigate(`/bookdetails/${id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading books: {error}</p>;

    return (
        <div className="books-container">
            {books.length === 0 ? (
                <p>No books found in this category.</p>
            ) : (
                books.map(book => (
                    <div key={book.book_id} className="book-card" onClick={() => handleBookClick(book.book_id)}>
                        <img src={book.image_url} alt={book.name} className="book-image" />
                        <div className="book-details">
                            <h3>{book.name}</h3>
                            <p>{`قیمت: ${book.price} تومان`}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CategoryBooks;
