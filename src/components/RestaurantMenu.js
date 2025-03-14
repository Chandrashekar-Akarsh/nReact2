import { useParams } from "react-router-dom";
import ShimmerHome from "./ShimmerHome";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantMenuAccordian from "./RestaurantMenuAccordian";
import { useState } from "react";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const [showIndexCategory, setShowIndexCategory] = useState(null);

  const { res_id } = useParams();
  const resInfo = useRestaurantMenu(res_id);

  if (resInfo === null) return <ShimmerHome />;

  const { name, cuisines, costForTwoMessage, avgRating } = resInfo?.info;

  const { filteredMenuCardsObj } = resInfo;

  const { itemCards } = resInfo?.itemCards;

  //

  // return (
  //   itemCards && (
  //     <div>
  //       <h1>{name}</h1>
  //       <p>
  //         {cuisines.join(", ")} - {costForTwoMessage}
  //       </p>
  //       <h2> Menu</h2>
  //       <ul>
  //         {itemCards.map((item) => (
  //           <li key={item?.card?.info?.id}>
  //             {item?.card?.info?.name} -{" Rs."} {item?.card?.info?.price / 100}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   )
  // );

  return (
    <div className="w-[70%] mx-auto my-8">
      {/* Header div */}
      <div>
        <span className="text-3xl font-bold text-gray-900 tracking-wide drop-shadow-md">
          {name}
        </span>
        {/* Star Rating and Cost for two */}
        <div className="text-lg font-semibold text-gray-700 flex space-x-1 my-1">
          <span className="text-yellow-500">⭐</span>
          <span>{avgRating.toFixed(1)}</span>
          <span> • {costForTwoMessage} </span>
        </div>
        {/* Cusisnes */}
        <p className="text-lg text-gray-600 font-medium tracking-wide">
          {cuisines.join(", ")}
        </p>
      </div>

      {/* Menu */}
      <h2 className="text-lg  text-gray-500 text-center uppercase tracking-widest pb-2 my-6">
        -- MENU --
      </h2>
      <div>
        {filteredMenuCardsObj.map((obj, index) => {
          if (
            obj?.card?.card?.["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          ) {
            const title = obj?.card?.card?.title;
            const items = obj?.card?.card?.itemCards;
            return (
              <div key={obj?.card?.card?.title}>
                <RestaurantMenuAccordian
                  data={{
                    title: title,
                    items: items,
                    subMenu: false,
                    isOpen: showIndex === index ? true : false,
                  }}
                  setIndex={() => {
                    setShowIndex(index);
                    // setShowIndexCategory(null);
                  }}
                  clearIndex={() => {
                    setShowIndex(null);
                  }}
                />
                <div className="h-4 bg-gray-100 my-3"></div>
              </div>
            );
          } else {
            return (
              <div key={obj?.card?.card?.title}>
                <h2 className="text-lg font-extrabold">
                  {obj?.card?.card?.title}
                </h2>
                {obj?.card?.card?.categories?.map((obj1, index1) => {
                  return (
                    <RestaurantMenuAccordian
                      key={obj1?.categoryId}
                      // key={obj1?.card?.card?.title}
                      data={{
                        title: obj1?.title,
                        items: obj1?.itemCards,
                        subMenu: true,
                        isOpen:
                          showIndexCategory === index1 && showIndex === index
                            ? true
                            : false,
                      }}
                      setIndex={() => {
                        setShowIndex(index);
                        setShowIndexCategory(index1);
                        // setShowIndex(null);
                      }}
                      clearIndex={() => {
                        setShowIndex(null);
                        setShowIndexCategory(null);
                      }}
                    />
                  );
                })}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default RestaurantMenu;
