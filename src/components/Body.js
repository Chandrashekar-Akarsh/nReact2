import RestaurantCard from "./RestaurantCard";

// import res_list from "../utils/mock-data";

import { useState, useEffect } from "react";

import ShimmerHome from "./ShimmerHome";

import { HOME_RES_LIST_API_URL as API_URL } from "../utils/constants.js";

import { Link } from "react-router-dom";

const Body = () => {
  const [allRestaurants, setALLRestaurants] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [seachText, setSearchText] = useState("");
  const [nextOffset, setNextOffset] = useState("");

  useEffect(() => {
    fetchResListHome();
  }, []);

  const fetchResListHome = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const restaurantsInListing =
        data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      const restaurantTopBrands =
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      let allRestaurants = [...restaurantsInListing, ...restaurantTopBrands];
      let seen = new Set();
      allRestaurants = allRestaurants.filter((obj) => {
        if (seen.has(obj?.info?.id)) {
          return false;
        } else {
          seen.add(obj?.info?.id);
          return true;
        }
      });
      // allRestaurants = allRestaurants.filter(
      //   (obj) => obj?.info?.id !== "23681"
      // );
      setALLRestaurants(allRestaurants);
      setListOfRestaurants(allRestaurants);
      setNextOffset(data?.data?.pageOffset?.nextOffset);
    } catch (error) {
      console.log(error);
    }
  };

  return listOfRestaurants.length === 0 ? (
    <ShimmerHome />
  ) : (
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
            <Link key={obj?.info?.id} to={"/restaurant/" + obj?.info?.id}>
              <RestaurantCard res_data={obj} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;

// fetch(
//   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
//   {
//     headers: {
//       __fetch_req__: "true",
//       accept: "*/*",
//       "accept-language": "en-US,en;q=0.9",
//       "content-type": "application/json",
//       "if-none-match": 'W/"2069f-aPBazKQPL3mV+k3QFyvQL0mudjU"',
//       priority: "u=1, i",
//       "sec-ch-ua":
//         '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": '"macOS"',
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       cookie:
//         "__SW=HUYs95OfLfAlR8Wfo5JKFI2anxjFgxjf; _device_id=e80df235-fbf6-c641-973e-c9e63134e7ae; fontsLoaded=1; _gcl_au=1.1.1652292531.1738007990; userLocation={%22lat%22:12.9715987%2C%22lng%22:77.5945627%2C%22address%22:%22Bengaluru%2C%20Karnataka%2C%20India%22%2C%22area%22:%22%22%2C%22showUserDefaultAddressHint%22:false}; ab.storage.deviceId.f9c2b69f-2136-44e0-a55a-dff72d99aa19=g%3AUY6tVMz3dTQXg1XhH0cIWxW4v5T2%7Ce%3Aundefined%7Cc%3A1738398608574%7Cl%3A1738398608574; ab.storage.sessionId.f9c2b69f-2136-44e0-a55a-dff72d99aa19=g%3A0ca64985-931e-8651-350a-a955b031d42c%7Ce%3A1738400408580%7Cc%3A1738398608581%7Cl%3A1738398608581; _guest_tid=f422b820-7928-43c1-b89b-b010ac9d9258; _sid=iqu93bee-ea79-46c1-8844-3bb94ab9d453; _gid=GA1.2.2032852929.1738631583; _gat_0=1; _ga_34JYJ0BCRN=GS1.1.1738631582.6.1.1738632110.0.0.0; _ga=GA1.1.647405816.1738007990",
//       Referer: "https://www.swiggy.com/restaurants",
//       "Referrer-Policy": "strict-origin-when-cross-origin",
//     },
//     body: null,
//     method: "GET",
//   }
// );

// const requestBody = {
//   lat: 12.9716,
//   lng: 77.5946,
//   sortBy: "RELEVANCE",
//   filters: {
//     cuisines: ["North Indian", "Chinese"],
//     rating: 4.0,
//     deliveryTime: 30,
//     costForTwo: {
//       min: 200,
//       max: 500,
//     },
//     offer: true,
//   },
//   page: 1,
//   pageSize: 20,
//   collectionIds: [12345, 67890],
// };

// const fetchUpdatedResListHome = async () => {
//   try {
//     const response = await fetch(UPDATE_API, {
//       method: "POST",
//       headers: {
//         Accept: "*/*",
//         "Accept-Encoding": "gzip, deflate, br, zstd",
//         "Accept-Language": "en-US,en;q=0.9",
//         "Content-Type": "application/json",
//         Origin: "https://www.swiggy.com",
//         Referer: "https://www.swiggy.com/restaurants",
//         "User-Agent":
//           "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
//       },
//       body: JSON.stringify({
//         filters: {},
//         lat: 12.9715987,
//         lng: 77.5945627,
//         nextOffset: nextOffset,
//         page_type: "DESKTOP_WEB_LISTING",
//         seoParams: {
//           seoUrl: "https://www.swiggy.com/restaurants",
//           pageType: "FOOD_HOMEPAGE",
//           apiName: "FoodHomePage",
//         },
//         apiName: "FoodHomePage",
//         pageType: "FOOD_HOMEPAGE",
//         seoUrl: "https://www.swiggy.com/restaurants",
//         _csrf: "kFDMaZuMCnJe-57iXDG3EfoHh8djxiIXkiB8v30Q",
//       }),
//       body: JSON.stringify(requestBody),
//     });
//     const data = await response.json();
//     setNextOffset(data?.data?.pageOffset?.nextOffset);
//     let newCards =
//       data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle
//         ?.restaurants;
//     let updatedRestaurants = [...allRestaurants, ...newCards];
//     setALLRestaurants(updatedRestaurants);
//     setListOfRestaurants(updatedRestaurants);
//   } catch (error) {
//     console.log`error`;
//   }
// };
