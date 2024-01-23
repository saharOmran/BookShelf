import React from "react";
import './footer.css'

const Footer = () => {
  return (
    <div>
      <footer className="text-center text-white shadow ">
        <div className="container-fluid pt-2" >
          <div className="row footer-area">
            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
              <h6>ارتباط باما</h6>
              <p>saharomraan@gmail.com  kimiakhani1382@gmail.com</p>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
              <h6>به روز رسانی</h6>
              <p>برای اگاهی از اخرین<br></br>به روزرسانی ها</p>
              <div className="d-inline-flex align-items-center">
                <input className="form-control" name="EMAIL" placeholder="ایمیل خود را وارد کنید.."   required="" type="email">
                </input>
                <button className="click-btn btn btn-default bg-warning">
                  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                </button>
             
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-5">
               <img src="../iconbook.jpg"></img>
              
            </div>
          </div>
        </div>
        
      </footer>
    </div>
  );
}



export default Footer;
