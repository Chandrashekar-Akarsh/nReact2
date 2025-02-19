import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
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
  const RestuarantCardPromoted = withPromotedLabel(RestaurantCard);

  useEffect(() => {
    if (resListAll?.length) {
      setALLRestaurants(resListAll);
      setListOfRestaurants(resListAll);
      console.log("resListAll", resListAll);
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
        <div className="flex items-center">
          <div className="search m-4 p-4 ">
            <input
              type="text"
              className="border border-solid border-black"
              value={seachText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className="px-4 py-2 bg-green-100 m-4 rounded-lg"
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
          <div className="filter-btn m-4">
            <button
              className="px-4 py-2 bg-gray-100 rounded-lg"
              onClick={() => {
                let filteredRestautants = allRestaurants.filter(
                  (obj) => obj.info.avgRating > 4.5
                );
                setListOfRestaurants(filteredRestautants);
                // fetchUpdatedResListHome();
              }}
            >
              Top Rated Restaurants
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {listOfRestaurants.map((obj) => {
            return (
              <Link
                style={{ all: "unset" }}
                key={obj?.info?.id}
                to={"/restaurant/" + obj?.info?.id}
              >
                {obj?.promoted ? (
                  <RestuarantCardPromoted res_data={obj} />
                ) : (
                  <RestaurantCard res_data={obj} />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    )
  );
};

export default Body;
