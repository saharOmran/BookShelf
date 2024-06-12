import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './categorybooks.css';

const CategoryBooks = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch books data based on category id
        axios.get(`/api/books?category=${id}`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the books data!', error);
            });
    }, [id]);

    return (
        <div className="books-container">
            {books.map(book => (
                <div key={book.id} className="book-card">
                    <Link to={`./bookdetails/${books.id}`}><img src={images[(books.id)]} alt='book' loading="lazy" className='img-item'/></Link>
                    <img src={book.image} alt={book.title} className="book-image" />
                    <div className="book-title">{book.title}</div>
                </div>
            ))}
        </div>
    );
};

export default CategoryBooks;
