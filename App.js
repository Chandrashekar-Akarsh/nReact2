import React from "react";
import ReactDOM from "react-dom/client";
import BiteWiseLogo from "./BiteWise.png";
import { res_data } from "./data";

// const HeaderComponent = () => (
//   <div className="header">
//     <div className="logo-container">
//       <img src={BiteWiseLogo}></img>
//     </div>
//     <div className="navlinks">
//       <ul>
//         <li>Home</li>
//         <li>About Us</li>
//         <li>Contact Us</li>
//         <li>Cart</li>
//       </ul>
//     </div>
//   </div>
// );

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img
          className="logo"
          src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#eeeee",
};

const RestaurantCard = (props) => {
  const { res_data } = props;
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    avgRatingString,
    sla,
  } = res_data.info;
  const deliveryTime = sla?.deliveryTime;
  const imageUrl = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/`;
  return (
    <div className="res-card">
      {/* Should contain Name of Restaurant , Starts , Cuisine , Delivery Time */}
      <img
        className="res-logo"
        alt="res-logo"
        src={`${imageUrl}${cloudinaryImageId}`}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRatingString} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

const res_list =
  res_data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
    ?.restaurants;

const Body = () => (
  <div className="body">
    <div className="search">Search</div>
    <div className="res-container">
      {res_list.map((obj) => {
        return <RestaurantCard key={obj?.info?.id} res_data={obj} />;
      })}
    </div>
  </div>
);

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
