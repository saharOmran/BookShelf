import React from "react";
import "./aboutus.css";


const AboutUs = () => {
  return (
    <div>
      <div className="text-secondary p-2 ">
        
          <div className="titleabout fw-bold text-center">
            <h2>
              درباره <b>ما</b>
            </h2>
          </div>
          </div>
            <div className="about mx-auto">
              <div className="about-item">
                <h4 className="mx-3">BookShelf</h4>
                <p className="mx-auto pt-5"> برنامه ای برای خرید کتاب های موردعلاقه تان </p>
              </div>
              <div className="about-item">
                <h4 className="mx-3">تکنولوژی های استفاده شده</h4>
                <ul className="mx-4">
                  <li>React JS</li>
                  <li>Framer Motion Library</li>
                  <li>CSS</li>
                  <li>Bootstrap 5</li>
                </ul>
              </div>
               
            </div>
        </div>


  
  );
}


export default AboutUs;
