import React, { useState } from 'react';
import './authorsCarousel.css';

const authors = [
    { id: 1, name: 'محمود طلوعی', image: './toloee.png' },
    { id: 2, name: 'پژمان طهرانیان', image: './tehranian.png' },
    { id: 3, name: 'ژاک لاکان', image: './zhak-lakan.png' },
    { id: 4, name: 'فرهنگ رجایی', image: './rajaei.png' },
    { id: 5, name: 'مارتین راین', image: './martin.png' },
    { id: 6, name: 'فرانسوا ساگان', image: './francoise-sagan.png' },
    { id: 7, name: 'مث هیگ'  , image: './math.png' },
    { id: 8, name: 'شکوه قاسم نیا' , image: './shokoh.g' },
    { id: 9, name: ' زویا پیرزاد ', image: './zoya.png' },
    { id: 10, name: ' ویلیم مک ریون ', image: './viliam.png' },
    { id: 11, name: 'کریم زمانی', image: './zamani.png' },
    { id: 12, name: ' ویلیام شکسپیر', image: './shekspier.png' },
    // Add more authors here...
];

const AuthorsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 5;

    const next = () => {
        if (currentIndex < authors.length - itemsToShow) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="all-authors">
            <div className="carousel-container">
                <div className="carousel-header">
                    <h2>نویسنده و مترجم</h2>
                    <button className="show-all-btn">مشاهده همه</button>
                </div>
                <div className="carousel-content">
                    <button className="prev-btn" onClick={prev} disabled={currentIndex === 0}>
                        &lt;
                    </button>
                    <div className="carousel-items">
                        {authors.slice(currentIndex, currentIndex + itemsToShow).map(author => (
                            <div key={author.id} className="carousel-itemm">
                                <img src={author.image} alt={author.name} className="author-image" />
                                <div className="author-name">{author.name}</div>
                            </div>
                        ))}
                    </div>
                    <button className="next-btn" onClick={next} disabled={currentIndex >= authors.length - itemsToShow}>
                        &gt;
                    </button>
                </div>
            </div>
    </div>
    );
};

export default AuthorsCarousel;
