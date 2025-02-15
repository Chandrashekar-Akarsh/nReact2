import RestaurantCard from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerHome from "./ShimmerHome";
import { Link } from "react-router-dom";
import useFetchResListHome from "../utils/useFetchResListHome.js";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Body = () => {
  const [allRestaurants, setALLRestaurants] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [seachText, setSearchText] = useState("");
  const { resListAll, loading, error } = useFetchResListHome();
  const onLine = useOnlineStatus();

  useEffect(() => {
    if (resListAll?.length) {
      setALLRestaurants(resListAll);
      setListOfRestaurants(resListAll);
    }
  }, [resListAll]);

  if (onLine === false) {
    return (
      <h1>
        Looks Like you are Offline!! please check your internet connection
      </h1>
    );
  }

  if (loading) return <ShimmerHome />;

  if (error) return <p> NO RESTAURANTS RECEIVED from server</p>;

  return (
    allRestaurants && (
      <div className="body">
        <div className="search">
          <input
            type="text"
            value={seachText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              let filteredRestautants = allRestaurants.filter((obj) =>
                obj.info.name.toLowerCase().includes(seachText.toLowerCase())
              );
              setListOfRestaurants(filteredRestautants);
            }}
          >
            Search
          </button>
        </div>
        <div className="filter-btn">
          <button
            onClick={() => {
              let filteredRestautants = allRestaurants.filter(
                (obj) => obj.info.avgRating > 4.5
              );
              setListOfRestaurants(filteredRestautants);
              // fetchUpdatedResListHome();
            }}
          >
            Top Restaurants
          </button>
        </div>
        <div className="res-container">
          {listOfRestaurants.map((obj) => {
            return (
              <Link
                style={{ all: "unset" }}
                key={obj?.info?.id}
                to={"/restaurant/" + obj?.info?.id}
              >
                <RestaurantCard res_data={obj} />
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Body;
