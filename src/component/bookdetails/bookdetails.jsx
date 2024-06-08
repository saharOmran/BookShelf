import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './bookdetails.css';

const BookDetails = ({ onSave, onWishlist }) => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/book/get_book/${id}`);
                setBook(response.data);
                setLoading(false);
                const authorId = response.data.author_id;
                const authorResponse = await axios.get(`http://127.0.0.1:8000/book/get_books_by_author/${author}`);
                setAuthorBooks(authorResponse.data);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
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
                        <img className="card-img-top mb-5 mb-md-0" style={imageStyle} src={book.image_url} alt="img" />
                    </div>
                    <div className="col-md-8 p-2">
                        <h1 className="display-5 fw-bolder">{book.title}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text">{`قیمت : ${book.price}`}</span>
                            <br></br>
                            <span className="detail">{`نویسنده : ${book.author_id}`}</span><br></br>
                            <span className="detail">{`انتشارات : ${book.publisher}`}</span><br></br>
                            <span className="detail">{`سال انتشار : ${book.published}`}</span><br></br>
                            <span className="detail">{`کتگوری : ${book.category_id}`}</span><br></br>
                        </div>
                        <p className="lead mb-5 w-50" style={{ color: "black" }}>{`${book.description}`}</p>
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
                <div className="mt-5">
                    <h2>سایر کتاب های نویسنده</h2>
                    <ul>
                        {authorBooks.map((authorBook, index) => (
                            <li key={index}>{authorBook.title}</li>
                        ))}
                    </ul>
                    <button className="btn btn-primary">More</button>
                </div>
            </div>
        </section>
    );
};

export default BookDetails;
