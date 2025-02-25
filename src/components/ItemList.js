import { useState, useEffect } from "react";
import { RES_MENU_IMAGE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    console.log("addItem", item);
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <div
            className="flex justify-between border-b-1 border-gray-400 pb-2"
            key={item?.card?.info?.id}
          >
            <div className="w-[60%]">
              <h3 className="font-bold text-md">{item?.card?.info?.name}</h3>
              <h3 className="font-bold text-md">
                $
                {item?.card?.info?.price
                  ? item?.card?.info?.price / 100
                  : item?.card?.info?.defaultPrice / 100}
              </h3>
              <p className="my-4">{item?.card?.info?.description}</p>
            </div>
            <div className="w-[40%] justify-items-end">
              <div className="relative w-[156px] h-[144px]">
                <img
                  className="mt-2 rounded-lg w-[156px] h-[144px] object-cover"
                  src={RES_MENU_IMAGE_URL + item?.card?.info?.imageId}
                ></img>
                <div
                  className="absolute bottom-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm font-medium px-4 py-1 rounded-2xl border-2 border-black cursor-pointer"
                  onClick={() => handleAddItem(item)}
                >
                  Add +
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
