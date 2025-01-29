import RestaurantCard from "./RestaurantCard";

import res_list from "../utils/mock-data";

import { useState } from "react";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(res_list);

  return (
    <div className="body">
      <div className="filter-btn">
        <button
          onClick={() => {
            let filteredRestautants = listOfRestaurants.filter(
              (obj) => obj.info.avgRating > 4.5
            );
            setListOfRestaurants(filteredRestautants);
          }}
        >
          Top Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((obj) => {
          console.log(obj);
          return <RestaurantCard key={obj?.info?.id} res_data={obj} />;
        })}
      </div>
    </div>
  );
};

export default Body;
