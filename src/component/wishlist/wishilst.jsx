import React , {useEffect, useState,  getByTestId} from 'react';
import { Link } from 'react-router-dom';
import images from './../../images';
import './wishlist.css'

const Wishlist = ({ books, onDelete }) => {


    const [wishBooks , setWishBooks] =  useState([])

    useEffect(() => {
    const timeout = setTimeout(() => {
        setWishBooks(books.filter((book) => book.wishlist === true));
    }, 1200);
    return () => clearTimeout(timeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


    return (
        <div className="wishlist container  mt-5 p-3 rounded cart">
            <div className="row no-gutters">
                <div className="col-md-8">
                    <div className="product-details mb-3">
                        <h2>کتاب های  <b>ذخیره شده شما</b></h2>
                        {wishBooks.length === 0 ?
                            <div className="conatiner text-center mt-5 mx-5">
                                <h4>هنوز موردی را ذخیره نکرده‌اید!</h4>
                                <p className="mt-5 mr-5 h6 text-muted">چیزی که دوست داری پیدا کردی؟ روی نماد قلب در کنار آیتم ضربه بزنید تا آن را به لیست علاقه مندی های خود اضافه کنید! همه موارد ذخیره شده شما در اینجا ظاهر می شوند.</p>
                                <Link to={"/"}>
                                    <button className="btn btn-dark rounded-3 mt-5">
                                        ادامه ی خرید
                                    </button>
                                </Link>
                            </div>
                            :
                            (wishBooks).map((book) => (
                                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                                    <div className="d-flex flex-row" key={book.id}>
                                        <img className="rounded" src={images[book.id-1]} width={60} alt="" />
                                        <div className="ml-2  p-3">
                                            <span className="font-weight-bold d-block mb-3 bookname">
                                                {book.name}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <span className="d-block ml-5">{`${book.price}$`}</span>
                                        
                                        <i 
                                            className="fas fa-trash mx-4 delete"
                                            onClick={() => onDelete(book)} 
                                            data-testid="trash-icon"
                                        >
                                        </i>
         
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;