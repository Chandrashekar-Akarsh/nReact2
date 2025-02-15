import { useState, useEffect } from "react";
import { HOME_RES_LIST_API_URL } from "./constants";

const useFetchResListHome = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resListAll, setResListAll] = useState(null);

  useEffect(() => {
    FetchResListHome();
  }, []);

  const FetchResListHome = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetch(HOME_RES_LIST_API_URL);
      if (!data.ok) throw new Error("Failed to fetch Restaurant List");

      const json = await data.json();
      const apiData = json?.data;

      const listedRestaurants = extractListedRestaurants(apiData);
      const topRestaurantBrands = extractTopRestaurantBrands(apiData);

      const comninedListOFRestaurants = [
        ...listedRestaurants,
        ...topRestaurantBrands,
      ];

      if (comninedListOFRestaurants.length === 0)
        throw new Error("Restaurant List Empty");

      const allRestaurants = filterAllRestaurants(comninedListOFRestaurants);
      setResListAll(allRestaurants);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  //Helper functions

  const extractListedRestaurants = (apiData) => {
    return (
      apiData?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants ??
      []
    );
  };

  const extractTopRestaurantBrands = (apiData) => {
    return (
      apiData?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ??
      []
    );
  };

  const filterAllRestaurants = (resList) => {
    let seen = new Set();
    return resList.filter((obj) => {
      if (seen.has(obj?.info?.id)) {
        return false;
      } else {
        seen.add(obj?.info?.id);
        return true;
      }
    });
  };

  return { resListAll, loading, error };
};

export default useFetchResListHome;
