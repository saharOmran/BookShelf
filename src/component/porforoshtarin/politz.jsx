import React, { useRef, useEffect, useState } from "react";
import "../header/header.css";
import images from '../../images';
import { Link } from "react-router-dom";
import './porforosh.css'
import { motion } from "framer-motion"
import { color } from "@chakra-ui/react";


const Politz = ({ books }) => {

 
  
  const [currentSetIndex, setCurrentSetIndex] = useState(0);

  const handleNextClick = () => {
      if (currentSetIndex < books.length - 9) {
          setCurrentSetIndex(currentSetIndex + 1);
      }
  };

  const handlePrevClick = () => {
      if (currentSetIndex > 0) {
          setCurrentSetIndex(currentSetIndex - 1);
      }
  };

  return (
      <div>
          <section className="Newbooks">
              <div className="container" id="novels">
                  <div className="row">
                      <div className="col-md-12 mx-auto">
                          <h2>
                              جدید ترین <b>کتاب ها</b>
                          </h2>
                          
                          <motion.div className="carousel-container" style={{ width: '100%' }}>
                              <motion.div className="carousel">
                                  <motion.div className="inner-carousel">
                                      {books.slice(currentSetIndex, currentSetIndex + 9).map((book, index) => (
                                          <motion.div className="item" key={book.id}>
                                              <div className="imgBox">
                                                  <img src={images[book.id - 1]} alt="bookimg" />
                                                  <div className="content">
                                                      <div className="name-price">
                                                          <Link to={`/bookdetails/${book.id}`} style={{ textDecoration: 'none' }}>
                                                              <h4>{book.name}</h4>
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
                                  <div className="button-container">
                                    <button className="prev-button" onClick={handlePrevClick}>{"<"}</button>
                                    <button className="next-button" onClick={handleNextClick}>{">"}</button>
                                  </div>
                              </motion.div>
                          </motion.div>
                      </div>
                  </div>
              </div>
          </section>
      </div>
  );
};
 
  




export default Politz;