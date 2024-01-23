import React from 'react';
import { useParams } from 'react-router-dom';
import images from './../../images';
import './bookdetails.css'

const BookDetails = ({ onSave , books , onWishlist}) => {

    const { id } = useParams();
     

    const book = books.filter(element => (element.id === id))[0];

    const imageStyle = {
        width: "230px",
        height: "380px",
        padding: "4px",
    }
    return (
        
            <section className="py-5">
                <div className="container">
                    <div className="bookdetails">
                        <div className="col-md-4">
                            <img className="card-img-top mb-5 mb-md-0" style={imageStyle} src={images[id-1]} alt="img" />
                        </div>
                        <div className="col-md-8 p-2">
                            <h1 className="display-5 fw-bolder">{book.name}</h1>
                            <div className="fs-5 mb-5">
                                <span className="text">{`قیمت : ${book.price}`}</span>
                                <span className='m-5' style={{ color: "green" }}> 15%</span>
                            </div>
                            <p className="lead mb-5 w-50" style={{ color: "black" }}> {`${book.about}`} </p>
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
}



export default BookDetails;