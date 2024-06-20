import React, { useState } from 'react';
import "./addnewitem.css";
import Alert from '../alert/alert';
import axios from 'axios';

const AddNewItem = () => {
    const [newBook, setNewBook] = useState({
        name: "",
        category: "",
        writer: "",
        publisher: "",
        price: 0,
        year: 0,
        about: "",
        image: null,
        id: 0
    });

    const [alert, setAlert] = useState(false);
    const [responseBody, setResponseBody] = useState("");

    const handleChange = (e) => {
        setNewBook({
            ...newBook,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (event) => {
        setNewBook({
            ...newBook,
            image: event.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newBook.name);
        formData.append('category', newBook.category);
        formData.append('writers_name', newBook.writer);
        formData.append('publisher_name', newBook.publisher);
        formData.append('price', newBook.price);
        formData.append('year_of_publication', newBook.year);
        formData.append('explanation', newBook.about);
        formData.append('image', newBook.image);
        formData.append('book_number', newBook.id);

        try {
            const response = await axios.post("http://127.0.0.1:80/books", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setResponseBody(response.data);
            setAlert(true);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <React.Fragment>
            {alert && <Alert message={responseBody} />}
            <div className="title my-3 text-center">
                <h2>Add New Book</h2>
            </div>
            <form className="editbooks" onSubmit={handleSubmit}>
                <div className="mb-3 itemdata">
                    <label htmlFor="productName" className="form-label">اسم کتاب</label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={newBook.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productCategory" className="form-label">اسم کتگوری</label>
                    <input
                        name="category"
                        type="text"
                        className="form-control"
                        value={newBook.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productWriter" className="form-label">اسم نویسنده</label>
                    <input
                        name="writer"
                        type="text"
                        className="form-control"
                        value={newBook.writer}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPublisher" className="form-label">اسم ناشر</label>
                    <input
                        name="publisher"
                        type="text"
                        className="form-control"
                        value={newBook.publisher}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPrice" className="form-label">قیمت محصول</label>
                    <input
                        name="price"
                        type="number"
                        className="form-control"
                        value={newBook.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productYear" className="form-label">سال انتشار</label>
                    <input
                        name="year"
                        type="number"
                        className="form-control"
                        value={newBook.year}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productDescription" className="form-label">توضیحات</label>
                    <input
                        name="about"
                        type="text"
                        className="form-control"
                        value={newBook.about}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productImage" className="form-label-1">تصویر کتاب</label>
                    <input
                        name="image"
                        type="file"
                        onChange={handleFileChange}
                        className="form-control small-input"
                        required
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPrice" className="form-label">شماره کتاب</label>
                    <input
                        name="id"
                        type="number"
                        className="form-control"
                        value={newBook.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="itemdata d-inline-flex">
                    <button type="submit" className="btn btn-danger px-5 mx-2 rounded-pill">افزودن</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default AddNewItem;
