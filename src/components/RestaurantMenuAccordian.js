import { useState, useEffect } from "react";
import { RES_MENU_IMAGE_URL } from "../utils/constants";
import ItemList from "./ItemList";

const RestaurantMenuAccordian = (props) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { title, items, subMenu, isOpen } = props?.data;
  const setIdx = props?.setIndex;
  const clrIdx = props?.clearIndex;

  const toggleAccordian = () => {
    if (isOpen) {
      clrIdx();
    } else {
      setIdx();
    }
  };

  return (
    <div>
      {/* Accordian Header Begin */}
      <div
        className="flex justify-between cursor-pointer my-4  hover:bg-pink-50 hover:drop-shadow-sm"
        onClick={toggleAccordian}
      >
        {!subMenu ? (
          <h2 className="font-bold text-lg">
            {title} ({items.length})
          </h2>
        ) : (
          <h3 className="font-medium text-lg">
            {title} ({items.length})
          </h3>
        )}
        <span className="ml-2"> {isOpen ? "⬆️" : "⬇️"} </span>
      </div>
      {/* Acordian Header End */}
      {isOpen && <ItemList items={items} />}
    </div>
  );
};

export default RestaurantMenuAccordian;
