import React, { useRef, useEffect, useState } from "react";
import "../header/header.css";
import { Link } from "react-router-dom";
import './newbooks.css';
import { motion } from "framer-motion";

const NewBooks = ({ books }) => {
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  const createStars = () => {
    let stars = [];
    let randomNumber = Math.floor(Math.random() * 4 + 1);
    for (let i = 0; i < randomNumber; i++) {
      stars.push(
        <li className="list-inline-item" key={i}>
          <i className="fa fa-star"></i>
        </li>
      );
    }
    return stars;
  };

  return (
    <div>
      <section className="Newbooks">
        <div className="container" id="novels">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h2>
                جدید ترین  <b>کتاب ها</b>
              </h2>
              <motion.div ref={carouselRef} whileTap={{ cursor: "grabbing" }} className="carousel">
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
                  {books.map((book) => (
                    <motion.div className="item" key={book.book_number}>
                      <div className="imgBox">
                        <img src={book.image_url} alt="bookimg" />
                        <div className="content">
                          <div className="name-price">
                            <Link to={`/bookdetails/${book.book_number}`} style={{ textDecoration: 'none' }}>
                              <h4>{book.title}</h4>
                            </Link>
                            <hr></hr>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewBooks;
