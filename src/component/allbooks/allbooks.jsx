import React from 'react'
import { useState } from 'react';
import './allbooks.css'
import { Link } from 'react-router-dom'
import images from './../../images';

const AllBooks = ({ books }) => {

    const [selectedBooks, setSelectedBooks] = useState(books)


    let selected = [];
    const BooksCategoryOptions = [
        {

            value: "کودکانه",
            text: "کودکانه" 
        },
        {

            value: "هنری",
            text: "هنری"
        },
        {

            value: "اجتماعی",
            text: "اجتماعی"
        },
        {
            value: "روانشناسی",
            text: "روانشناسی"
        },
        {

            value: "تاریخی",
            text: "تاریخی"
        }
    ]
 
    const priceOptions = [
        {

            value: 48000,
            text: "0-50000هزارتومان"
        },
        {

            value: 83000,
            text: "50000 - 100000"
        },
        {

            value: 135000,
            text: "100000 - 150000"
        },
        {

            value: 172000,
            text: "150000 - 200000"
        },
        {

            value: 190000,
            text: "200000 - 250000"
        }
    ]


    const handleSelectCategory = (e) => {
        if (e.target.value === "All Books") {
            setSelectedBooks(books)
        } else {
            selected = books.filter((book) => book.category === e.target.value)
            setSelectedBooks(selected)
        }
    }
 
    const handleSelectPrice = (e) => {
     
        if (e.target.value === "Price") {
            setSelectedBooks(selected)
        }
        else {
            const selectedwithPrice = selectedBooks.length > 0 ?
                selectedBooks.filter((book) => book.price <= e.target.value)
                : books.filter((book) => book.price <= e.target.value)
            setSelectedBooks(selectedwithPrice)
        }
    }

    const handleReset = () => {
        setSelectedBooks(books)
    }

    return (<>
        <section className="module-small mt-5">
            <div className="container">
                <form className="row  mx-auto">
                    <div className="col-sm-4 mb-3">
                        <select className="form-control" onChange={handleSelectCategory}>
                            <option>کتاب ها</option>
                            {BooksCategoryOptions.map((option) => {
                                return <option key={option.value} value={option.value}>
                                    {option.text}</option>
                            })}
                        </select>
                    </div>
                    <div className="col-sm-4 mb-3">
                        <select className="form-control" onChange={handleSelectPrice}>
                            <option>Price</option>
                            {priceOptions.map((option) => {
                                return <option key={option.value} value={option.value}>
                                    {option.text}</option>
                            })}
                        </select>
                    </div>
                    
                    <div className="col-sm-4 mb-3">
                        <button className="btn btn-danger btn-round btn-g" type="submit" onClick={handleReset}>ریست</button>
                    </div>
                </form>
            </div>
        </section>
        <section className="module-large mx-auto">
            <div className="container">
                <div className="row mx-auto">
                    <div className="allItems">
                        {selectedBooks.map((book) => (
                            <div className="shop-items">
                                <div className="shop-item-image" key={(book.id)}>
                                    <Link to={`./bookdetails/${(book.id)}`}>
                                        <img src={images[(book.id)-1]} alt='book' loading='lazy' />
                                        <i className="fas fa-cart-shopping"></i>
                                    </Link>
                                </div>
                                <div className="shop-item-detail">
                                    <div className='d-flex justify-content-between mx-2 mt-1'>
                                        <h5 className="shop-item-title">{book.name}</h5>
                                        <h5 className="shop-item-price">{book.price}</h5>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    </>
    );
}

export default AllBooks;
