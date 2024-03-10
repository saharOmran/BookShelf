import React, { useState } from 'react';
import "./addnewcategory.css";
import Category from '../db2';
import Alert from '../alert/alert';
import axios from 'axios';

const AddNewCategory= () => {
 

    const [newcategory, setNewCategory] = useState({
        name: "",
    });

    const [alert, setAlert] = useState(false);
     const x = async (componentDidMount)=>{
         let { data } = await axios.get("http://localhost:3004/Category/");
         //Clone
         const state = { ...this.state };
         //Edit
         state.productName = data.name;
         state.id = data.id;
         //Set state
         this.setState(state);
     }

    const handleChange = (e) => {
        //Edit
        setNewCategory({
            ...newcategory, [e.target.name]: e.target.value,
        });
    };

    const resetInputField = () => {
        setNewCategory({
            name: "",
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newcategory)
        // Category.push(newcategory);
        // setAlert(true);

        //Call Backend
        // const obj = {...this.state,count: 0};
        // await axios.post("https://my-json-server.typicode.com/PeterRizek009/PeterRizek009-BookDB/Books", obj);
        // console.log("Book added");

        axios({
            method: "post",
            url: "http://127.0.0.1/category/add_category",
            data: JSON.stringify(newcategory),
            auth: {
                username: "kimia",
                password: "1234"
            },
            headers:{'Content-Type':'application/json'}
        })

    };

    const handleReset = (e) => {
        console.log(e.target.value);
    }


    
    return (
        <React.Fragment>
            {alert ?
                <Alert message={"کتگوری با موفقیت اضافه شد!"} />
                : null}
            <div className="title my-3 text-center">
                <h2>افزودن<b>کتگوری جدید</b></h2>
            </div>
            <form className="editcategory" onSubmit={handleSubmit}>
                <div className="mb-3 itemdata">
                    <label htmlFor="productName" className="form-label">
                        اسم کتگوری
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={newcategory.name}
                        onChange={handleChange}

                        aria-describedby="emailHelp"
                    />
                </div>
{/*                  
                <div className="mb-3 itemdata">
                    <label htmlFor="productPrice" className="form-label">
                        شماره کتاب
                    </label>
                    <input
                        name="id"
                        value={newcategory.id}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                    /> */}
{/*     
                </div> */}
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

export default AddNewCategory;             