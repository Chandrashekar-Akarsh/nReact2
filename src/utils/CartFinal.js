import React from "react";
import { useSelector } from "react-redux";
import ItemList from "../components/ItemList";
import { useDispatch } from "react-redux";
import { clearCart } from "./cartSlice";

const CartFinal = () => {
  const items = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();

  const clearCartFunc = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-4">
        <div className="flex items-center pb-4">
          <h1 className="text-2xl font-bold  mx-auto tracking-wide text-gray-800">
            Cart
          </h1>
          <button
            className="absolute right-8 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={clearCartFunc}
          >
            Clear Cart
          </button>
        </div>
      </div>
      <div className="w-[70%] mx-auto flex flex-col">
        <ItemList items={items} />
      </div>
    </>
  );
};

export default CartFinal;
