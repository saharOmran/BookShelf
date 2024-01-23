import React from 'react';
import "./header.css";

const Header = () => {

    const generateCarouselItem = () => {
        let items = []
        for (let i = 1; i < 4; i++) {
            items.push(
                <div className={i === 1 ? 'carousel-item active' : 'carousel-item'} >
                    <img id={`img${i}`} alt="" />
                    <div className="img-text">
                        <h2>
                            BOOK <b> SHELF Store</b>
                        </h2>
                        {/* <p>
                            کتابهایی محبوب
                              
                            <b><p>برای کتابخانه تان</p></b>
                        </p> */}
                    </div>
                </div>
            )
        }
        return items;
    }
    return (
        <React.Fragment>
            <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    {generateCarouselItem()}
                </div>


            </div>
        </React.Fragment>);
}

export default Header;






