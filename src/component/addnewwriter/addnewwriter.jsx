import React, { useState } from 'react';
import "./addnewwriter.css";
import Writer from "../db3"
import Alert from '../alert/alert';
import axios from 'axios';

const AddNewWriter= () => {
 

    const [newwriter, setNewWriter] = useState({
        name: "",
        id: ""
    });

    const [alert, setAlert] = useState(false);
     const x = async (componentDidMount)=>{
         let { data } = await axios.get("http://localhost:3004/Writer/");
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
        setNewWriter({
            ...newwriter, [e.target.name]: e.target.value,
        });
    };

    const resetInputField = () => {
        setNewWriter({
            name: "",
            id: ""
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        Writer.push(newwriter);
        setAlert(true);

        //Call Backend
        // const obj = {...this.state,count: 0};
        // await axios.post("https://my-json-server.typicode.com/PeterRizek009/PeterRizek009-BookDB/Books", obj);
        // console.log("Book added");
    };

    const handleReset = (e) => {
        console.log(e.target.value);
    }


    
    return (
        <React.Fragment>
            {alert ?
                <Alert message={"نویسنده با موفقیت اضافه شد!"} />
                : null}
            <div className="title my-3 text-center">
                <h2>افزودن<b>نویسنده جدید</b></h2>
            </div>
            <form className="editwriter" onSubmit={handleSubmit}>
                <div className="mb-3 itemdata">
                    <label htmlFor="productName" className="form-label">
                        اسم نویسنده
                    </label>
                    <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={newwriter.name}
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

export default AddNewWriter; 