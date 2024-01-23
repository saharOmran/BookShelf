import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import "./edit.css"
import { useState } from 'react';
import images from '../../images';

const Edit = ({ books, onDelete }) => {
    
    const[editBooks , setEditBooks] = useState(books);

    useEffect(() =>{
        setEditBooks(books);
    }, [books] )

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
                        <tr key={book.id}>
                            <td>{book.id}</td>
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
    )

} 

export default Edit;