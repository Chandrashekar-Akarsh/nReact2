import RestaurantCard from "./RestaurantCard";

import { res_data } from "../utils/mock-data";

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

export default Body;
