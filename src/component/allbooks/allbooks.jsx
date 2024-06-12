// import React from 'react'
// import { useState , useEffect } from 'react';
// import './allbooks.css'
// import { Link } from 'react-router-dom'
// import images from './../../images';
// import axios from 'axios';

// const AllBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedBooks, setSelectedBooks] = useState([]);

//     let selected = [];
//     // const BooksCategoryOptions = [
//     //     {

//     //         value: "کودکانه",
//     //         text: "کودکانه" 
//     //     },
//     //     {

//     //         value: "هنری",
//     //         text: "هنری"
//     //     },
//     //     {

//     //         value: "اجتماعی",
//     //         text: "اجتماعی"
//     //     },
//     //     {
//     //         value: "روانشناسی",
//     //         text: "روانشناسی"
//     //     },
//     //     {

//     //         value: "تاریخی",
//     //         text: "تاریخی"
//     //     }
//     // ]
 
     

//     const handleSelectCategory = (e) => {
//         if (e.target.value === "All Books") {
//             setSelectedBooks(books)
//         } else {
//             selected = books.filter((book) => book.category === e.target.value)
//             setSelectedBooks(selected)
//         }
//     }
 
     
//     const handleSelectBook = (e) => {

        
//             const selectedwithname = selectedBooks.length > 0 ?
//                 selectedBooks.filter((book) => book.name === e.target.value)
//                 : books.filter((book) => book.name === e.target.value)
//             setSelectedBooks(selectedwithname)
        
//     }

//     const handleSelectWriter = (e) => {
//             const selectedwithwriter = selectedBooks.length > 0 ?
//                 selectedBooks.filter((book) => book.writer === e.target.value)
//                 : books.filter((book) => book.writer === e.target.value)
//             setSelectedBooks(selectedwithwriter)
//     }

// // useEffect(() => {
// //         // Fetch data from the backend API when the component mounts
// //     axios.get(`http://127.0.0.1:8000/book/get_all_books`)
// //         .then(response => {
// //             setBooks(response.data);
// //             setSelectedBooks(response.data);
// //         })
// //         .catch(error => {
// //             console.error('Error fetching data:', error);
// //         });
// // }, []);     

// // const handleSelectCategory = (e) => {
// //     if (e.target.value === "کتاب ها") {
// //         axios.get(`http://127.0.0.1:5000/book/get_all_books/`)
// //         setSelectedBooks(books)
// //     } else {
// //         axios.get(`http://127.0.0.2:8000/book/get_books_by_category/${e.target.value}`)
// //             selected = books.filter((book) => book.category === e.target.value)
// //             setSelectedBooks(selected)
              
// //     }
// // }

// // const handleSelectBook = (e) => {
// //     const title = e.target.value;
// //     axios.get(`http://127.0.0.1:8000/book/get_books_by_title/`, { params: { title } })
// //         .then(response => {
// //             setSelectedBooks(response.data.detail === 'book not found.' ? [] : [response.data]);
// //         })
// //         .catch(error => {
// //             console.error('Error fetching book by title:', error);
// //             setSelectedBooks([]);
// //         });
// // };

// // const handleSelectWriter = (e) => {
// //     const writerName = e.target.value;
// //     axios.get(`http://127.0.0.1:8000/book/get_book_by_author/${writerName}`)
// //     const selectedwithwriter = selectedBooks.length > 0 ?
// //     selectedBooks.filter((book) => book.writer === e.target.value)
// //         : books.filter((book) => book.writer === e.target.value)
// //         setSelectedBooks(selectedwithwriter)
// // }
 

//      const handleReset = () => {
//         setSelectedBooks(books);
//     }

 

//     return (
//         <>
//             <section className="module-small mt-5">
//                 <div className="container">
//                     <form className="row  mx-auto">
//                         <div className="col-sm-4 mb-3">
//                             <div className="search" onChange={handleSelectBook}>
//                                 <input className="form-control"
//                                     type="text"
//                                     placeholder="Enter book name"  
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-sm-4 mb-3">    
//                             <select className="form-control" onChange={handleSelectCategory}>
//                                 <option>All Books</option>
//                                 <option value="کودکانه">کودکانه</option>
//                                 <option value="هنری">هنری</option>
//                                 <option value="اجتماعی">اجتماعی</option>
//                                 <option value="روانشناسی">روانشناسی</option>
//                                 <option value="تاریخی">تاریخی</option>
//                             </select>
//                         </div>
//                         <div className="col-sm-4 mb-3">
//                             <button className="btn btn-danger btn-round btn-g" type="button" onClick={handleReset}>Reset</button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//             <section className="module-large mx-auto">
//                 <div className="container">
//                     <div className="row mx-auto">
//                         <div className="allItems">
//                             {selectedBooks.map(book => (
//                                 <div className="shop-items" key={book.id}>
//                                     <div className="shop-item-image">
//                                         <Link to={`./bookdetails/${book.id}`}>
//                                             <img src={book.image_url} alt="book" loading="lazy" />
//                                             <i className="fas fa-cart-shopping"></i>
//                                         </Link>
//                                     </div>
//                                     <div className="shop-item-detail">
//                                         <div className="d-flex justify-content-between mx-2 mt-1">
//                                             <h5 className="shop-item-title">{book.title}</h5>
//                                             <h5 className="shop-item-price">{book.price}</h5>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default AllBooks;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './allbooks.css';

const categories = [
    { id: 1, name: 'ادبیات داستانی', image: './adabiat-dastani.webp' },
    { id: 2, name: 'خودپروری', image: './khodparvari.webp' },
    { id: 3, name: 'روانشناسی', image: './ravanshenasi.jpg' },
    { id: 4, name: 'فلسفی', image: './falsafi.jpg' },
    { id: 5, name: 'دینی و مذهبی', image: './dini.jpg' },
    { id: 6, name: 'آموزشی', image: './amozeshi.jpg' },
    { id: 7, name: 'تاریخی', image: './tarikhi.jpg' },
    { id: 8, name: 'سیاسی', image: './siasi.jpg' },
    { id: 9, name: 'علمی', image: './elmi.jpg' },
    { id: 10, name: 'زندگی نامه', image: './zendeginame.jpg' },
    { id: 11, name: 'هنری', image: './honari.jpg' },
    { id: 12, name: 'کودکانه', image: './kodakaneh.jpg' },
    { id: 13, name: 'موسیقی', image: './mosiqi.jpg' },
    { id: 14, name: 'علوم کامپیوتر', image: './computer.jpg' },
    { id: 15, name: 'اجتماعی', image: './people.jpg' },
    { id: 16, name: 'سینما و تئاتر', image: './sinama.jpg' },
    { id: 17, name: 'شعر', image: './sher.jpg' },
    { id: 18, name: 'حقوقی', image: './hoqoq.png' },
    { id: 19, name: 'ورزشی', image: './varzeshi.jpg' },
    { id: 20, name: 'پزشکی', image: './pezeshki.jpg' },
    { id: 21, name: 'سلامت', image: './salamat.jpg' },
    { id: 22, name: 'زبان اصلی', image: './english.jpg' },
];

const CategoryCard = ({ id, name, image }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/CategoryBooks/${id}`);
    };

    return (
        <div className="category-card" onClick={handleClick}>
            <img src={image} alt={name} className="category-image" />
            <div className="category-name">{name}</div>
        </div>
    );
};

const AllBooks = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchQuery.toLowerCase())||
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="search-box">
                <input 
                    type="text"
                    placeholder="جستجو بر اساس نام کتاب، نویسنده یا دسته‌بندی"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="category-container">
                {filteredCategories.map(category => (
                    <CategoryCard key={category.id} id={category.id} name={category.name} image={category.image} />
                ))}
            </div>
        </>
    );
};

export default AllBooks;


 

//     const [books, setBooks] = useState([]);
//     const [selectedBooks, setSelectedBooks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchBooks = async () => {
//             try {
//                 const response = await axios.get('http://127.0.0.1:8080/book/get_all_books');
//                 setBooks(response.data);
//                 setSelectedBooks(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setError(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchBooks();
//     }, []);

//     const handleSelectCategory = (e) => {
//         const category = e.target.value;
//         if (category === "All Books") {
//             setSelectedBooks(books);
//         } else {
//             const selected = books.filter((book) => book.category === category);
//             setSelectedBooks(selected);
//         }
//     };

//     const handleSelectBook = (e) => {
//         const title = e.target.value;
//         axios.get(`http://127.0.0.1:8000/book/get_book_by_title/${title}`)
//         const selectedwithtitle = selectedBooks.length > 0 ?
//         selectedBooks.filter((book) => book.title === e.target.value)
//         : books.filter((book) => book.title === e.target.value)
//                 setSelectedBooks(selectedwithtitle)
// };

//     const handleReset = () => {
//         setSelectedBooks(books);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }



 






   


 

{/* //             <section className="module-small mt-5">
//                 <div className="container">
//                     <form className="row mx-auto">
//                         <div className="col-sm-4 mb-3">
//                             <div className="search">
//                                 <input
//                                     className="form-control"
//                                     type="text"
//                                     placeholder="Enter book name"
//                                     onChange={handleSelectBook}
//                                 />
//                             </div>
//                         </div>
//                         <div className="col-sm-4 mb-3">
//                             <select className="form-control" onChange={handleSelectCategory}>
//                                 <option>همه ی کتاب ها</option>
//                                 <option value="کودکانه">کودکانه</option>
//                                 <option value="هنری">هنری</option>
//                                 <option value="اجتماعی">اجتماعی</option>
//                                 <option value="روانشناسی">روانشناسی</option>
//                                 <option value="تاریخی">تاریخی</option>
//                             </select>
//                         </div>
//                         <div className="col-sm-4 mb-3">
//                             <button className="btn btn-danger btn-round btn-g" type="button" onClick={handleReset}>Reset</button>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//             <section className="module-large mx-auto">
//                 <div className="container">
//                     <div className="row mx-auto">
//                         <div className="allItems">
//                             {selectedBooks.map(book => (
//                                 <div className="shop-items" key={book.id}>
//                                     <div className="shop-item-image">
//                                         <Link to={`./bookdetails/${book.id}`}>
//                                             <img src={book.image_url} alt="book" loading="lazy" />
//                                             <i className="fas fa-cart-shopping"></i>
//                                         </Link>
//                                     </div>
//                                     <div className="shop-item-detail">
//                                         <div className="d-flex justify-content-between mx-2 mt-1">
//                                             <h5 className="shop-item-title">{book.title}</h5>
//                                             <h5 className="shop-item-price">{book.price}</h5>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </section> */} 


 

