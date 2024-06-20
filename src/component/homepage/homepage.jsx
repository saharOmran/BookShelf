import React, { useState, useEffect } from 'react';
import NewBooks from '../newbooks/newbooks';
import BooksView from '../booksview/booksview';
import Header from './../header/header';
import Porforosh from '../porforoshtarin/porforosh';
import PanelMid from '../panelmid/panelmid';
import BooksDie from '../panelmid/booksdie';
import Gifs from '../header/gifs';
import Politz from '../porforoshtarin/politz';
import Lesson from '../porforoshtarin/Lesson';
import Kodakan from '../porforoshtarin/Kodakan';
import AuthorsCarousel from '../panelmid/AuthorsCarousel';
import axios from 'axios';

const HomePage = () => {
    const [books, setBooks] = useState([]);
    const [books2, setBooks2] = useState([]);
     const [priceBooks, setpriceBooks] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:80/books/get_books_with_book_ids');
                const allBooks = response.data;
                const last12Books = allBooks.slice(-12).reverse(); // Get last 12 books
                const filteredBooks = allBooks.filter(book => book.price >= 200000 && book.price <= 300000).slice(0, 12);
                const pricefilteredBooks = allBooks.filter(book => book.price >= 240000 && book.price <= 400000).slice(0, 12);
                setpriceBooks(pricefilteredBooks);
                setBooks2(filteredBooks);
                setBooks(last12Books);
                setpriceBooks(pricefilteredBooks);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
 
      

        fetchBooks();
        
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading books: {error}</div>;
    }

    return (
        <>
            <Header />
            <NewBooks books={books} />
            <Gifs />
            <Porforosh books={books2} />
            <BooksDie />
            <Lesson books={books} />
            <Politz />
            <PanelMid />
            <Kodakan books={books} />
            <AuthorsCarousel />
            <BooksView books={priceBooks} />
        </>
    );
}

export default HomePage;
