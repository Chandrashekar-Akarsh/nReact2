import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RES_MENU_URL } from "../utils/constants";
import ShimmerHome from "./ShimmerHome";

const Restaurant = () => {
  const [restaurantMasterData, setRestaurantMasterData] = useState(null);
  const [restaurantMenuItems, setRestaurantMenuItems] = useState([]);
  const urlParamResId = useParams().res_id;
  const STATIC_RES_ID = "575160";

  useEffect(() => {
    fetchIndResDetail();
  }, []);

  const fetchIndResDetail = async () => {
    const data = await fetch(RES_MENU_URL + urlParamResId);
    const masterData = await data.json();
    // console.log("cf2",masterData?.data?.cards[2]?.card?.card?.info?.cusines)
    setRestaurantMasterData(masterData);
    let menuItemsMaster =
      masterData?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
        .card?.card?.itemCards;
    console.log("menuItemsMaster", menuItemsMaster);
    setRestaurantMenuItems(menuItemsMaster);
  };

  //   let resData = obj?.data?.cards[2]?.card?.card?.info
  //   let id = data?.id
  //   let name = data?.name
  //   let costForTwoMessage = data?.costForTwoMessage
  //   let cusines = data?.cuisines.join(",")
  //   let avgRating = data?.avgRating
  //   let itemname = obj?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.card?.info?.name
  //   let itemprice = obj?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards?.card?.info?.price
  //   same as isVeg,id

  if (restaurantMasterData === null || restaurantMenuItems.length === 0) {
    return <ShimmerHome />;
  } else {
    return (
      <div>
        <h1>{restaurantMasterData?.data?.cards[2]?.card?.card?.info?.name}</h1>
        <p>
          {restaurantMasterData?.data?.cards[2]?.card?.card?.info?.cuisines.join(
            ", "
          )}{" "}
          -{" "}
          {
            restaurantMasterData?.data?.cards[2]?.card?.card?.info
              ?.costForTwoMessage
          }
        </p>
        <h2> Menu</h2>
        <ul>
          {restaurantMenuItems.map((obj) => {
            console.log(obj);
            let items = obj?.card?.info;
            return (
              <li key={items?.id}>
                {items?.name} - Rs {items?.price / 100}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Restaurant;
