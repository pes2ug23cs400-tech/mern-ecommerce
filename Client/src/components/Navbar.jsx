import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useContext } from "react";

function Navbar() {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { setFilteredData, products, logout, isAuthenticated, cart } =
    useContext(AppContext);
  //console.log("user cart",cart);

  // const filterByCategory=(category)=>{
  //   const filteredData=products.filter((data)=>data?.category===category);
  //   setFilteredData(filteredData);
  // }

  const filterByCategory = (category) => {
    // Ensure category is a string; fallback to empty string if not
    const safeCategory =
      typeof category === "string" ? category.toLowerCase() : "";
    const filteredData = products.filter(
      (data) => data?.category?.toLowerCase() === safeCategory
    );
    setFilteredData(filteredData);
  };

  const filterByPrice = (price) => {
    const filteredData = products.filter((data) => data?.price >= price);
    setFilteredData(filteredData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar ">
          <Link
            to={"/"}
            className="left"
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E-Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setsearchTerm(e.target.value)}
              placeholder=" Search Products"
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="btn btn-info mx-2">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => logout(navigate("/login"))}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-2">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-2">
                  Signup/Register
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname === "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setFilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterByCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterByCategory("Laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterByCategory("Cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterByCategory("HeadPhones")}
            >
              HeadPhones
            </div>
            <div className="items" onClick={() => filterByPrice(15999)}>
              15999
            </div>
            <div className="items" onClick={() => filterByPrice(24999)}>
              24999
            </div>
            <div className="items" onClick={() => filterByPrice(59999)}>
              59999
            </div>
            <div className="items" onClick={() => filterByPrice(69999)}>
              69999
            </div>
            <div className="items" onClick={() => filterByPrice(99999)}>
              99999
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
