import React from "react";
import ReactDOM from "react-dom/client";

const NavBar = () => (
  <div className="navBar">
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Profile</li>
    </ul>
  </div>
);

const Body = () => (
  <div className="Body">
    <NavBar />
    <h1> Welcome to Home Page</h1>
  </div>
);

root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Body />);
