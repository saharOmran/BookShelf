import React from 'react'
import { useState } from 'react';
import './allbooks.css'
import { Link } from 'react-router-dom'
import images from './../../images';
import axios from 'axios';

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
 
     

    // const handleSelectCategory = (e) => {
    //     if (e.target.value === "All Books") {
    //         setSelectedBooks(books)
    //     } else {
    //         selected = books.filter((book) => book.category === e.target.value)
    //         setSelectedBooks(selected)
    //     }
    // }
 
     
    // const handleSelectBook = (e) => {

        
    //         const selectedwithname = selectedBooks.length > 0 ?
    //             selectedBooks.filter((book) => book.name === e.target.value)
    //             : books.filter((book) => book.name === e.target.value)
    //         setSelectedBooks(selectedwithname)
        
    // }

    // const handleSelectWriter = (e) => {
    //         const selectedwithwriter = selectedBooks.length > 0 ?
    //             selectedBooks.filter((book) => book.writer === e.target.value)
    //             : books.filter((book) => book.writer === e.target.value)
    //         setSelectedBooks(selectedwithwriter)
    // }

     

const handleSelectCategory = (e) => {
    if (e.target.value === "کتاب ها") {
        axios.get(`http://127.0.0.1:5000/book/get_all_books/`)
        setSelectedBooks(books)
    } else {
        axios.get(`http://127.0.0.2:8000/book/get_books_by_category/${e.target.value}`)
            selected = books.filter((book) => book.category === e.target.value)
            setSelectedBooks(selected)
              
    }
}

const handleSelectBook = (e) => {
    const bookName = e.target.value;
    axios.get(`http://127.0.0.1:8000/book/get_books_by_title/${bookName}`)
    const selectedwithname = selectedBooks.length > 0 ?
    selectedBooks.filter((book) => book.name === e.target.value)
        : books.filter((book) => book.name === e.target.value)
        setSelectedBooks(selectedwithname)
}

const handleSelectWriter = (e) => {
    const writerName = e.target.value;
    axios.get(`http://127.0.0.1:8000/book/get_book_by_author/${writerName}`)
    const selectedwithwriter = selectedBooks.length > 0 ?
    selectedBooks.filter((book) => book.writer === e.target.value)
        : books.filter((book) => book.writer === e.target.value)
        setSelectedBooks(selectedwithwriter)
}
 

     const handleReset = () => {
        setSelectedBooks(books);
    }

 

    return (<>
        <section className="module-small mt-5">
            <div className="container">
                <form className="row  mx-auto">
                    <div className="col-sm-4 mb-3">

                    <div className="search" onChange={handleSelectBook}>
                         <input className="form-control"
                         type="text"
                         placeholder= "نام محصول را وارد کنید"  
                        />
                    </div>
                    </div>
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
                    <div className="search" onChange={handleSelectWriter}>
                         <input className="form-control"
                         type="text"
                         placeholder= "نام  نویسنده "  
                        />
                    </div>
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
