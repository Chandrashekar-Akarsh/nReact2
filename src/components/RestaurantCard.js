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
    <div className="res-card">
      {/* Should contain Name of Restaurant , Starts , Cuisine , Delivery Time */}
      <img
        className="res-logo"
        alt="res-logo"
        src={`${IMAGE_URL}${cloudinaryImageId}`}
      ></img>
      <h3>{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRatingString} Stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export default RestaurantCard;
