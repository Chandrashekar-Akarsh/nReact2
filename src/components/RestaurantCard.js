import { IMAGE_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { res_data } = props;
  const {
    name,
    cloudinaryImageId,
    costForTwo,
    cuisines,
    avgRatingString,
    sla,
  } = res_data.info;

  const deliveryTime = sla?.deliveryTime;

  return (
    <div className="m-4 p-4 w-52  bg-gray-100 flex flex-col justify-between rounded-lg hover:bg-gray-200 cursor-pointer">
      {/* Should contain Name of Restaurant , Starts , Cuisine , Delivery Time */}
      <img
        className="res-logo w-full h-32 object-cover rounded-lg"
        alt="res-logo"
        src={`${IMAGE_URL}${cloudinaryImageId}`}
      />
      <h3 className="font-bold py-4 tx-l">{name}</h3>
      {/* <h4>{cuisines.join(",")}</h4> */}
      {/* <h4 className="break-words whitespace-normal w-52"> */}
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRatingString} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

//HiGher Order Component
// input RestaurantCard  ==> Restaurant Card Promoted

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-black text-white rounded-lg p-1 m-1">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
