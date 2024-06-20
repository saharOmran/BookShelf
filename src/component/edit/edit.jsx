import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./edit.css";

const Edit = ({ onDelete }) => {
    const [editBooks, setEditBooks] = useState([]);

    // Function to fetch books data from the backend API
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:80/book/get_all_books');
            const books = await response.json();
            setEditBooks(books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // Fetch books data when the component mounts
    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            <table className="table mx-auto w-75">
                <thead className="thead-dark me-auto">
                    <tr>
                        <th scope="col">شماره کتاب</th>
                        <th scope="col">اسم کتاب</th>
                        <th scope="col">قیمت کتاب</th>
                        <th scope="col">تغییر</th>
                        <th scope="col">حذف</th>
                    </tr>
                </thead>
                <tbody>
                    {editBooks.map((book) => (
                        <tr key={book.book_number}>
                            <td>{book.book_number}</td>
                            <td>{book.name}</td>
                            <td>{book.price}</td>
                            <td>
                                <Link to={"./"}>
                                    <i className="fas fa-edit"></i>
                                </Link>
                            </td>
                            <td>
                                <button>
                                    <i
                                        className="fas fa-trash delete"
                                        aria-label="delete"
                                        onClick={() => onDelete(book)}
                                    ></i>{" "}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Edit;
