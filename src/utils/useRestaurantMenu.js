import { useEffect, useState } from "react";
import { RES_MENU_URL } from "../utils/constants";

const useRestaurantMenu = (res_id) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData(res_id);
  }, []);

  const fetchData = async (resId) => {
    console.log("resId", resId);
    const data = await fetch(RES_MENU_URL + resId);
    const json = await data.json();
    const apiData = json?.data;
    const info = apiData?.cards[2]?.card?.card?.info;
    const itemCards =
      apiData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
        ?.card;
    const obj = { info: info, itemCards: itemCards };
    setResInfo(obj);
  };

  return resInfo;
};

export default useRestaurantMenu;
