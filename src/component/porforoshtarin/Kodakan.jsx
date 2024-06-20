import React, { useRef, useEffect, useState } from "react";
import "../header/header.css";
import { Link } from "react-router-dom";
import './porforosh.css';
import { motion } from "framer-motion";

const Kodakan = () => {
    const [books, setBooks] = useState([]);
    const [width, setWidth] = useState(0);
    const [error, setError] = useState(null);
    const carouselRef = useRef();

    // Function to fetch books data by category
    const fetchBooksByCategory = async (category) => {
      try {
          const response = await fetch(`http://127.0.0.1:80/book/get_books_by_category/${encodeURIComponent(category)}`);
          if (!response.ok) {
              throw new Error('Not Found');
          }
          const booksData = await response.json();
          if (Array.isArray(booksData)) {
              setBooks(booksData);
              setError(null);
          } else {
              setBooks([]);
              throw new Error('Fetched data is not an array');
          }
      } catch (error) {
          console.error(`Error fetching books: ${error.message}`);
          setBooks([]);
          setError(`Error fetching books: ${error.message}`);
      }
  };

    // Fetch books data when the component mounts
    useEffect(() => {
        fetchBooksByCategory('کودکانه');
    }, []);

    useEffect(() => {
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, [books]);

    return (
      <div>
          <section className="Newbooks">
              <div className="container" id="novels">
                  <div className="row">
                      <div className="col-md-12 mx-auto">
                          <h2>
                              کتاب های<b> کودکانه </b>
                          </h2>
                          {error ? (
                              <div className="error-message">{error}</div>
                          ) : (
                              <motion.div ref={carouselRef} whileTap={{ cursor: "grabbing" }} className="carousel">
                                  <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
                                      {books.map((book) => (
                                          <motion.div className="item" key={book.book_number}>
                                              <div className="imgBox">
                                                  <img src={book.image_url} alt="bookimg" />
                                                  <div className="content">
                                                      <div className="name-price">
                                                          <Link to={`/bookdetails/${book.book_number}`} style={{ textDecoration: 'none' }}>
                                                              <h4>{book.name}</h4>
                                                          </Link>
                                                          <hr />
                                                          <div className="price-icon">
                                                              <p className="item-price">
                                                                  <span>{book.price} هزارتومان</span>
                                                              </p>
                                                              <i className="fa fa-fw fa-cart-arrow-down text-dark" />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </motion.div>
                                      ))}
                                  </motion.div>
                              </motion.div>
                          )}
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
}
export default Kodakan;
