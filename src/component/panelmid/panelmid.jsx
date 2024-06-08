import React, { useState } from "react";
import './panelmid.css';

const PanelMid = () => {
    const articles = [
        {
            title: "کاوش «رنه دکارت» در ماهیت خودآگاهی و واقعیت",
            imageUrl: "./80x802.jpg",
            description: "دکارت، به هیچ وجه نخستین فیلسوفی نبود که استدلال می‌کرد انسان‌ها از بدن و ذهن شکل گرفته‌اند، اما تصور او از این ب..."
        },
        {
            title: "«هانیبال لکتر»: هیولای نامیرای ادبیات جنایی",
            imageUrl: "./80x80.jpg",
            description: "توماس هریس، در سال 1981 دومین رمان خود را با نام «اژدهای سرخ» به چاپ رساند. این داستان، شخصیت «هانیبال لکتر» را برای..."
        },
        {
            title: "حقایقی درباره «هانس کریستین آندرسن»، خالق داستان‌های پریان ماندگار",
            imageUrl: "./80x803.jpg",
            description: "آندرسن، کاراکترهایش را در وضعیت‌های سخت و نامطلوب قرار می‌داد تا شیوه‌ای برای ابراز نرمی‌های درونی خودش بیابد..."
        },
        {
            title: "کتاب «بلندی‌های بادگیر»: عشق فرای زندگی و مرگ ",
            imageUrl: "./80x804.jpg",
            description: " امیلی برونته، عناصر و کاراکترهای ماندگاری را به کار می‌گیرد تا بر شور و ژرفای عشق میان هیثکلیف، و کاترین تاکید کند"
        },
        {
            title: "نکاتی از کتاب «چهره مرد هنرمند در جوانی»: اثر «جیمز جویس ",
            imageUrl: "./80x805.jpg",
            description: " این رمان به اثری پیشگام در استفاده از تعداد زیادی از تکنیک های ادبی مدرنیستی تبدیل شد، از جمله «جریان سیال ذهن"
        },
        {
            title: "فن روایی «فلش بک»در ادبیات",
            imageUrl: "./80x808.jpg",
            description: " یک صحنه ی «فلش بک» ، چه خاطره ای واضح باشد و چه رویایی اشفته، دریچه ای رو به اتفاقاتی در گذشته است که اطلاعاتی مهم و ت..."
        },
        {
            title: "نگاهی به کتاب «رنج های ورتر جوان» اثر «گوته",
            imageUrl: "./80x809.jpg",
            description: " کتاب «رنج های ورتر جوان» اثر گوته ، نمونه ای اولیه و پرالتهاب از «ادبیات رمانتیک» است..."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevClick = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (currentIndex < articles.length - 2) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <>
            <div className="container-panel"> 
                <div className="section-container">
                    {articles.slice(currentIndex, currentIndex + 2).map((article, index) => (
                        <div key={index} className="article">
                            <div className="img-title">
                                <img src={article.imageUrl} alt={article.title} className="article-image" />
                                <h3 className="title">{article.title}</h3>
                            </div>
                            <p className="description">{article.description}</p>
                        </div>
                    ))}
                    <br />
                </div>
                <div className="buttons">
                    <button onClick={handlePrevClick} className="btn">{"<"}</button>
                    <button onClick={handleNextClick} className="btn">{">"}</button>
                </div>
            </div>
        </>
    );
};

export default PanelMid;
