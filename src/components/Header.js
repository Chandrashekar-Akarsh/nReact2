import { LOGO_URL } from "../utils/constants";
import React, { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Log In");
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.cartItems);

  useEffect(() => {}, [btnNameReact]);

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg mb-2 align-middle">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4 space-x-4">
          <li>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
          </li>
          <li>
            <Link to="/cart">Cart - ({cartItems.length}) </Link>
          </li>
          <button
            className="log-btn"
            onClick={() => {
              btnNameReact === "Log In"
                ? setBtnNameReact("Log Out")
                : setBtnNameReact("Log In");
            }}
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
