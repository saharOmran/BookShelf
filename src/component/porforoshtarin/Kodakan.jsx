import React, { useRef, useEffect, useState } from "react";
import "../header/header.css";
import images from '../../images';
import { Link } from "react-router-dom";
import './porforosh.css'
import { motion } from "framer-motion"
import { color } from "@chakra-ui/react";


const Porforosh = ({ books }) => {

 
  
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
  
  
  
  return (
    <div>
      <section className="Newbooks">
        <div className="container" id="novels">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <h2>
                برترین   <b>کتاب های کودکان</b>
              </h2>
              <motion.div ref={carouselRef} whileTap={{ cursor: "grabbing" }} className="carousel">
                <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="inner-carousel">
                  {books.map((book) => (
                    <motion.div className="item" key={book.id}>
                      <div className="imgBox" >
                        <img src={images[(book.id - 1)]} alt="bookimg" />
                        <div className="content">
                          <div className="name-price">
                            <Link to={`/bookdetails/${book.id}`} style={{ textDecoration: 'none' }}>
                              <h4>{book.name}</h4>
                            </Link>
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
              </motion.div>
  
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  }
 
  




export default Porforosh;