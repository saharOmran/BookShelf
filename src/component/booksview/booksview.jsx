import React from 'react';
import './booksview.css';
 import { useParams, useNavigate } from 'react-router-dom';

 
const BooksView = ({ books }) => {

    const navigate = useNavigate();
    const handleBookClick = (book_id) => {
        console.log("hello"); // Add this line to inspect the clicked book object
        navigate(`/bookdetails/${book_id}`);
    };
  
    return (
        <section className="most-books">
            <div className="container" id="Scicence">
                <div className="row">
                    <div className="col-md-12">
                        <h2>پرفروش ترین های<b> این ماه</b></h2>
                    </div>
                    <div className="books">
                        {(books.slice(0,10)).map((books) => (
                            <div className="book" key={books.id} onClick={() => handleBookClick(books.book_id)}>
                                <img src={books.image_url} alt='book' loading="lazy" className='img-item'/>
                                <div className="thumb-content">
                                    <h5>{books.title}</h5>
                                    <p className="item-price">
                                        <span>{books.price}</span> 
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>);
}

export default BooksView;

