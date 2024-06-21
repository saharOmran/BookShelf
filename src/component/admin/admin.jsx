import React from "react";
import { Link } from "react-router-dom";
import "./admin.css"

const Admin = () => {
  return (
    <React.Fragment>
      <div className="titleabout fw-bold text-center">
        <h2 className="text-black">صفحه ادمین</h2>
      </div>
      <div className="editTable">
        <div className="box">
            <h4>افزودن کتاب جدید</h4>
          <Link className="btn btn-danger rounded-pill mt-5 mr-5" to={"./addnewitem"}>
            اضافه   <i className="fas fa-plus"></i>
          </Link>
        </div>
        <div className="box">
        <h4>تغییر کتاب ها</h4>
          <Link className="btn btn-danger rounded-pill mt-5 mr-5" to={"./edit"}>
            تغییر 
          </Link>
        </div>
        
         
      
      </div>
     
    </React.Fragment>
  );
};

export default Admin;
