import React, { useState, useEffect } from "react";
import "./shoppingcart.css";
import images from './../../images';
import Books from "../db";

const ShoppingCart = ({ onIncrement, onDecrement, onDelete }) => {

  const [cartBook, setCartBook] = useState([])
  const [total, setTotal] = useState()
  
  useEffect(() => {
    const cartBooks = Books.filter((element) => element.isInCart === true);
    setCartBook(cartBooks)
  }, [cartBook])


  useEffect(() => {
    let subtotal = 0;
    for (let i = 0; i < cartBook.length; i++) {
       subtotal += cartBook[i].price * cartBook[i].count;
    }
    setTotal(subtotal)
  }, [cartBook])


  return (
    <>
      <div className="container mt-5 p-3  cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mb-3">
              <h2>سبد<b>خرید</b></h2>
              {/* <h2>{`Cart(${cartBook.length})`}</h2> */}
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-sm-4">
                    <table className="table text-center tablecart">
                      <thead className="text-dark">
                        <tr>
                          <th>کتاب ها </th>
                          <th>قیمت</th>
                          <th>تعداد</th>
                          <th>قیمت کل</th>
                          <th>حذف</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartBook.map((book) => (
                          <tr>
                            <td class="align-middle d-flex bookImage">
                              <img className="rounded" src={images[book.id-1]} width={40} alt="" />
                              <div className="p-2">
                                <span className="d-block bookname">
                                  {book.name}
                                </span>
                              </div>
                            </td>
                            <td className="align-middle">{book.price}</td>
                            <td className="align-middle ">
                              <div className="d-flex d-flex justify-content-center">
                                <button
                                  className="btn-sm bg-muted"
                                  onClick={() => onDecrement(book)}
                                  type="button"
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <div className="px-2 border-bg-muted input">
                                  {book.count}
                                </div>
                                <button
                                  className="btn-sm bg-muted"
                                  onClick={() => onIncrement(book)}
                                  type="button"
                                >
                                  <i className="fas fa-plus"></i>
                                </button>
                              </div>
                            </td>
                            <td className="align-middle">
                              {(book.price * (book.count))}
                            </td>
                            <td className="align-middle">
                              <i
                                className="fas fa-trash mx-4 delete"
                                onClick={() => onDelete(book)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card  col-md-3  mx-auto">
            <div className="card-header">
              <h6 className="card-text">پیش فاکتور</h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between pt-1">
                <h6>قیمت محصولات</h6>
                <h6>{total}</h6>
              </div>
              <div className="d-flex justify-content-between">
                <h6>هزینه پست</h6>
                <h6>20000</h6>
              </div>
            </div>
            <div className="card-footer border-secondary bg-transparent">
              <div className="d-flex justify-content-between">
                <h6>قیمت کل</h6>
                <h6>{total + 20000}</h6>
              </div>
              <button className="btn btn-block btn-warning">پرداخت</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
