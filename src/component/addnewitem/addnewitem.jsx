import React, { useState } from 'react';
import "./addnewitem.css";
import Books from '../db';
import Alert from '../alert/alert';
import axios from 'axios';
import images from '../../images';

const AddNewItem = () => {



    const [newbook, setNewBook] = useState({
        name: "",
        category:"",
        writer:"",
        publisher:"",
        price: "",
        year:"",
        about:"",
        image:"",
        id: ""
    });
     
    const [selectedImage, setSelectedImage] = useState(null);
    const [alert, setAlert] = useState(false);
     const x = async (componentDidMount)=>{
         let { data } = await axios.get("http://localhost:3004/Books/");
         //Clone
         const state = { ...this.state };
         //Edit
         state.productName = data.name;
         state.productPrice = data.price;
         state.id = data.id;
         state.category = data.category;
         state.publisher = data.publisher;
         state.writer = data.writer;
         state.year = data.year;
         images[(Books.id)-1] = data.image;
         //Set state
         this.setState(state);
     }

    const handleChange = (e) => {
        //Edit
        setNewBook({
            ...newbook, [e.target.name]: e.target.value,
        });
    };

    const resetInputField = () => {
        setNewBook({
            name: "",
            category:"",
            writer:"",
            publisher:"",
            price: "",
            year:"",
            about:"",
            image:"",
            id: ""
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        Books.push(newbook);
        setAlert(true);

        //Call Backend
        // const obj = {...this.state,count: 0};
        // await axios.post("https://my-json-server.typicode.com/PeterRizek009/PeterRizek009-BookDB/Books", obj);
        // console.log("Book added");
    };

    const handleReset = (e) => {
        console.log(e.target.value);
    }

    
    const handleImageChange = (e) => {
       e.preventDefault();
       images[(newbook.id)].push(e.target.value);
    };


    
    return (
        <React.Fragment>
            {alert ?
                <Alert message={"کتاب با موفقیت اضافه شد!"} />
                : null}
            <div className="title my-3 text-center">
                 
            </div>
            <form className="editbooks" onSubmit={handleSubmit}>
                <div className="mb-3 itemdata">
                    <label htmlFor="productName" className="form-label">
                        اسم کتاب
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={newbook.name}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productCategory" className="form-label">
                        اسم کتگوری
                    </label>
                    <input
                        name="category"
                        type="text"
                        className="form-control"
                        value={newbook.category}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productWriter" className="form-label">
                        اسم نویسنده
                    </label>
                    <input
                        name="writer"
                        type="text"
                        className="form-control"
                        value={newbook.writer}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPublisher" className="form-label">
                        اسم ناشر
                    </label>
                    <input
                        name="publisher"
                        type="text"
                        className="form-control"
                        value={newbook.publisher}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPrice" className="form-label">
                        قیمت محصول
                    </label>
                    <input
                        name="price"
                        value={newbook.price}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productYear" className="form-label">
                          سال انتشار
                    </label>
                    <input
                        name="year"
                        value={newbook.year}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productDescription" className="form-label">
                          توضیحات  
                    </label>
                    <input
                        name="about"
                        type="text"
                        className="form-control"
                        value={newbook.about}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productImage" className="form-label-1">
                           تصویر کتاب
                    </label>
                    <input
                        name="image"
                        type="image"
                        value={newbook.image}
                        onChange={handleImageChange}
                        className="form-control small-input"
                        
                    />
                    <img src={images[(newbook.id)-1]} alt='book' loading='lazy' /> 
                     
                </div>
                <div className="mb-3 itemdata">
                    <label htmlFor="productPrice" className="form-label">
                        شماره کتاب
                    </label>
                    <input
                        name="id"
                        value={newbook.id}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                    />
    
                </div>
                <div className="itemdata d-inline-flex">
                    <button type="submit" className="btn btn-danger px-5 mx-2 rounded-pill " >
                        افزودن
                    </button>
                    {/* <button onClick={resetInputField} className="btn btn-danger px-5 rounded-pill" onSubmit={handleReset}>
                        Reset
                    </button> */}
                </div>
            </form>
        </React.Fragment>);

}

export default AddNewItem;