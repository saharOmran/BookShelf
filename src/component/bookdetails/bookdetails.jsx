import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './bookdetails.css';

const BookDetails = ({ onSave, onWishlist }) => {
    const { book_id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:80/books/get_books_with_book_ids/${book_id}`);
                setBook(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [book_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading book details: {error}</div>;
    }

    const imageStyle = {
        width: "230px",
        height: "380px",
        padding: "4px",
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="bookdetails">
                    <div className="col-md-4">
                        <img className="card-img-top mb-5 mb-md-0" style={imageStyle} src={book.image_url} alt={book.name} />
                    </div>
                    <div className="col-md-8 p-2">
                        <h1 className="display-5 fw-bolder">{book.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text">{`قیمت : ${book.price} تومان`}</span>
                        </div>
                        <p className="lead mb-5 w-50" style={{ color: "black" }}>{`${book.explanation}`}</p>
                        <div className="d-flex ">
                            <button className="btn btn-danger flex-shrink-1" onClick={() => onSave(book)} type="button">
                                افزودن به سبد خرید
                            </button>
                            <button className="btn btn-outline-dark flex-shrink-1 mx-2" onClick={() => onWishlist(book)} type="button">
                                افزودن به علاقه مندی ها <i className="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookDetails;
