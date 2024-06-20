import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import NavTop from "./navtop";
import './navbar.css'
import Books from "../db";
import useSticky from "./useSticky";

const Navbar = ({ user, setUser }) => {

  const [cartnum, setCartNum] = useState([])
  const [wishcount, setWishCount] = useState()

  const { sticky, stickyRef } = useSticky();
  const [showMenu, setShowMenu] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);}

  useEffect(() => {
    const cartBooks = Books.filter((element) => element.isInCart === true);
    const wishlistBooks = Books.filter((element) => element.wishlist === true);
    setCartNum(cartBooks)
    setWishCount(wishlistBooks.length)

  }, [cartnum])



  return (<>

    <NavTop  ref={stickyRef} sticky={sticky}/>
    <nav ref={stickyRef} className={sticky ? "sticky navbar navbar-expand-lg  navbar-light shadow" :  "navbar navbar-expand-lg  navbar-light shadow"}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-danger logo h1 align-self-center" to={"/"}> 
          BOOK<span className="text-black">SHELF</span>
          
        </Link>

        <div className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <i className="fas fa-bars-staggered"></i>
        </div>

        <div className="collapse navbar-collapse" id="navbarNav">

        </div>

        <div className="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="navbarNav">
          <div className="flex-fill">
            <ul className="nav navbar-nav d-lg-inline-flex  mx-lg-5">
              {user === "admin" ?
                <li className="nav-item mx-lg-4">
                  <Link className="nav-link" to={"/admin"}>صفحه ادمین</Link>
                </li>
                :
                <>

                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" aria-current="page" to={"/"}>خانه</Link>
                  </li>

                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" aria-current="page" to={"/UserProfile"}>پروفایل</Link>
                  </li>

                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/allbooks"}>کتاب ها</Link>
                  </li>
                  
                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/login"}>ثبت نام</Link>
                  </li>

                  <li className="nav-item mx-lg-4">
                    <Link className={wishcount > 0 ? "nav-link" : "nav-link"} to={"/wishlist"}>علاقه مندی ها <i className={wishcount > 0 ? "fas fa-heart text-danger" : "far fa-heart"}   ></i></Link>
                  </li>
                  <li className="nav-item mx-lg-4">
                    <Link className="nav-link" to={"/aboutus"}>درباره ما</Link>
                  </li>
                </>
              }

            </ul>
          </div>

          <div className="nav-item  mt-2">
            <NavLink className="nav-icon position-relative text-decoration-none" to={'./shoppingcart'}>
              <i className="fa fa-fw fa-cart-arrow-down text-dark" />
              <span className="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">{cartnum.length}</span>
            </NavLink>
            <div className="d-inline-flex">
 
              {user ?
                <user user={data} setUser={setUser} />
                :
                <NavLink className="nav-icon position-relative text-decoration-none mx-5" to={'./signin'}>
 
                    {user ? (
                  <div className="dropdown">
                    <button onClick={() => setShowMenu(!showMenu)} className="btn btn-primary">
                      Welcome, {user}!
                    </button>
                    {showMenu && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => setShowMenu(false)}>Sign Up</button>
                        <button className="dropdown-item" onClick={handleLogout}>Log Out</button>
                      </div>
                    )}
                  </div>
                ) : (
                  
                  <NavLink className="nav-icon position-relative text-decoration-none mx-5" to={'./signin'}>
 
                  <i className="fa fa-fw fa-user text-dark mr-3" />
                </NavLink>
                )}
                
              
            </div>
          </div>
        </div>

      </div >
    </nav >

  </ >);
}





export default Navbar;
