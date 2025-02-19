import { useEffect, useState } from "react";
import { RES_MENU_URL } from "../utils/constants";

const useRestaurantMenu = (res_id) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData(res_id);
  }, []);

  const filterMenuCards = (apiData) => {
    const filteredData =
      apiData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (obj) => {
          if (
            obj?.card?.card?.["@type"] ==
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
            obj?.card?.card?.["@type"] ===
              "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
          ) {
            return true;
          } else {
            return false;
          }
        }
      );

    return filteredData;
  };

  const filterAndSplitMenuCards = (apiData) => {
    const itemCategory = [];
    const nestedItemCategory = [];
    apiData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.forEach(
      (obj) => {
        if (
          obj?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) {
          itemCategory.push(obj?.card?.card);
        } else if (
          obj?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
        ) {
          nestedItemCategory.push(obj?.card?.card);
        }
      }
    );
    return {
      itemCategory: itemCategory,
      nestedItemCategory: nestedItemCategory,
    };
  };

  const fetchData = async (resId) => {
    console.log("resId", resId);
    const data = await fetch(RES_MENU_URL + resId);
    const json = await data.json();
    const apiData = json?.data;
    // const filteredMenuCardsObj = filterAndSplitMenuCards(apiData);
    const filteredMenuCardsObj = filterMenuCards(apiData);

    const info = apiData?.cards[2]?.card?.card?.info;
    const itemCards =
      apiData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
        ?.card;
    const obj = {
      info: info,
      itemCards: itemCards,
      filteredMenuCardsObj: filteredMenuCardsObj,
    };
    setResInfo(obj);
  };

  return resInfo;
};

export default useRestaurantMenu;
// responseobj?.data?.cards
