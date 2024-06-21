import React, { useState, useEffect } from "react";
import "./shoppingcart.css";
import { useNavigate } from "react-router-dom";

const ShoppingCart = ({ onDecrement }) => {
  const [cartBooks, setCartBooks] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCartItems(); // Fetch cart items on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    let subtotal = 0;
    for (let i = 0; i < cartBooks.length; i++) {
      subtotal += cartBooks[i].price * cartBooks[i].count;
    }
    setTotal(subtotal);
  }, [cartBooks]); // Update total whenever cartBooks changes

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://127.0.0.1:80/cart', {
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Fetched cart data:', data);

      if (data.cart_items) {
        const bookDetailsPromises = data.cart_items.map(async item => {
          const bookResponse = await fetch(`http://127.0.0.1:82/book/get_book/${item.book_id}`);
          if (!bookResponse.ok) {
            throw new Error(`Failed to fetch book details for book_id: ${item.book_id}`);
          }
          const bookData = await bookResponse.json();
          return { ...bookData, count: item.quantity, book_id: item.book_id };
        });

        const detailedCartItems = await Promise.all(bookDetailsPromises);
        setCartBooks(detailedCartItems);
      } else {
        console.error('cart_items not found in the response');
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const handleDelete = async (book) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch(`http://127.0.0.1:80/cart/remove/${book.book_id}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      const updatedCartBooks = cartBooks.filter(item => item.book_id !== book.book_id);
      setCartBooks(updatedCartBooks);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleIncrement = async (book) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      console.log(`Incrementing quantity for book_id: ${book.book_id}`);

      const response = await fetch(`http://127.0.0.1:80/cart/increase/${book.book_id}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      const updatedCartBooks = cartBooks.map(item => {
        if (item.book_id === book.book_id) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });

      setCartBooks(updatedCartBooks);
    } catch (error) {
      console.error('Error increasing item quantity:', error);
    }
  };

  const handleDecrement = async (book) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      console.log(`Decrementing quantity for book_id: ${book.book_id}`);

      if (book.count === 1) {
        return;
      }

      const response = await fetch(`http://127.0.0.1:80/cart/decrease/${book.book_id}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);

      const updatedCartBooks = cartBooks.map(item => {
        if (item.book_id === book.book_id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });

      setCartBooks(updatedCartBooks);
    } catch (error) {
      console.error('Error decreasing item quantity:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCartBooks([]); // Clear cart when logging out
  };

  const handleLogin = () => {
    fetchCartItems(); // Fetch cart items for the new user after login
  };

  const navigate = useNavigate();
    const handleBookClick = (book_id) => {
        console.log("hello"); // Add this line to inspect the clicked book object
        navigate(`/bookdetails/${book_id}`);
    };

  return (
    <>
      <div className="container mt-5 p-3 cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mb-3">
              <h2>سبد<b>خرید</b></h2>
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
                        {cartBooks.map((book) => (
                          <tr key={book.book_id}   >
                            <td className="align-middle d-flex bookImage">
                              <img className="rounded" src={book.image_url} onClick={() => handleBookClick(book.book_id)} width={40} alt="" />
                              <div className="p-2">
                                <span className="d-block bookname">
                                  {book.name}
                                </span>
                              </div>
                            </td>
                            <td className="align-middle">{book.price}</td>
                            <td className="align-middle ">
                              <div className="d-flex justify-content-center">
                                <button
                                  className="btn-sm bg-muted"
                                  onClick={() => handleDecrement(book)}
                                  type="button"
                                  disabled={book.count === 1}
                                >
                                  <i className="fas fa-minus"></i>
                                </button>
                                <div className="px-2 border-bg-muted input">
                                  {book.count}
                                </div>
                                <button
                                  className="btn-sm bg-muted"
                                  onClick={() => handleIncrement(book)}
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
                                onClick={() => handleDelete(book)}
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
          <div className="card col-md-3 mx-auto">
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
              <button className="btn btn-block btn-warning" onClick={handleLogout}>خروج</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
