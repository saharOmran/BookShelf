import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './wishlist.css';

const Wishlist = ({ onDelete }) => {
  const [wishBooks, setWishBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://127.0.0.1:80/favorites', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const favorites = response.data.favorites;
        const bookDetailsPromises = favorites.map(bookId =>
          axios.get(`http://127.0.0.1:80/book/get_book/${bookId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        );

        const booksData = await Promise.all(bookDetailsPromises);
        const books = booksData.map(book => book.data);

        setWishBooks(books);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Failed to fetch wishlist. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://127.0.0.1:80/favorites/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWishBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error removing book from wishlist:', error);
      setError('Failed to remove book from wishlist. Please try again.');
    }
  };

  return (
    <div className="wishlist container mt-5 p-3 rounded cart">
      <div className="row no-gutters">
        <div className="col-md-8">
          <div className="product-details mb-3">
            <h2>کتاب های <b>ذخیره شده شما</b></h2>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : wishBooks.length === 0 ? (
              <div className="container text-center mt-5 mx-5">
                <h4>هنوز موردی را ذخیره نکرده‌اید!</h4>
                <p className="mt-5 mr-5 h6 text-muted">
                  چیزی که دوست داری پیدا کردی؟ روی نماد قلب در کنار آیتم ضربه بزنید تا آن را به لیست علاقه مندی های خود اضافه کنید! همه موارد ذخیره شده شما در اینجا ظاهر می شوند.
                </p>
                <Link to={'/'}>
                  <button className="btn btn-dark rounded-3 mt-5">ادامه ی خرید</button>
                </Link>
              </div>
            ) : (
              wishBooks.map(book => (
                <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded" key={book._id}>
                  <div className="d-flex flex-row">
                    <img className="rounded" src={book.image_url} width={60} alt={book.name} />
                    <div className="ml-2 p-3">
                      <span className="font-weight-bold d-block mb-3 bookname">
                        {book.name}
                      </span>
                      <span className="text-muted">{book.category}</span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="d-block ml-5">{`${book.price} هزار تومان`}</span>
                    <i
                      className="fas fa-trash mx-4 delete"
                      onClick={() => handleDelete(book._id)}
                    ></i>
                  </div>
                </div>
              ))
            )}
            {error && <div className="text-center text-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
