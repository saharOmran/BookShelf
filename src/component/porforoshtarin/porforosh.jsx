import React, { useRef, useEffect, useState } from "react";
import "../header/header.css";
import {useNavigate} from "react-router-dom";
import './porforosh.css';
import { motion } from "framer-motion";

const Porforosh = ({ books }) => {
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
 
  
    const [width, setWidth] = useState(0)
  
    const carouselRef = useRef()
  
  
    useEffect(() => {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }, [])
  
    
    const createStars = () => {
      let stars = [];
      let randomNumber = Math.floor(Math.random() * 4 + 1);
      for (let i = 0; i < randomNumber; i++) {
        stars.push(
          <li className="list-inline-item">
            <i className="fa fa-star"></i>
          </li>
        );
      }
      return stars;
    };

    const navigate = useNavigate();
    const handleBookClick = (book_id) => {
        console.log("hello"); // Add this line to inspect the clicked book object
        navigate(`/bookdetails/${book_id}`);
    };
  
  
  
  return (
    <div>
      <section className="Newbooks">
        <div className="container" id="novels">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h2>
                پرفروش ترین <b>کتاب ها</b>
              </h2>
              <motion.div ref={carouselRef} whileTap={{ cursor: "grabbing" }} className="carousel">
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
                  {books.slice(currentSetIndex, currentSetIndex + 9).map((book , index) =>(
                    <motion.div className="item" key={book.id}  onClick={() => handleBookClick(book.book_id)}>
                      <div className="imgBox" >
                        <img src={book.image_url} alt="bookimg" />
                        <div className="content">
                          <div className="name-price">
                               <h4>{book.title}</h4>
                          
                            <hr></hr>
                            <div className="price-icon">
                            <p className="item-price">
                              <span>{book.price}هزارتومان</span>
                               
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
  
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
 
  




export default Porforosh; 