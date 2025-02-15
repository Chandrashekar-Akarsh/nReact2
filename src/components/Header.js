import { LOGO_URL } from "../utils/constants";
import React, { useState, useEffect, use } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Log In");
  const onlineStatus = useOnlineStatus();

  useEffect(() => {
    console.log("Use Effect btnNameReact dependency array in  Header called ");
  }, [btnNameReact]);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL} />
      </div>
      <div className="nav-items">
        <ul>
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
            <Link to="/">Cart</Link>
          </li>
        </ul>
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
      </div>
    </div>
  );
};

export default Header;
