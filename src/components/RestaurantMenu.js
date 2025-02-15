import { useParams } from "react-router-dom";
import ShimmerHome from "./ShimmerHome";
import useRestaurantMenu from "../utils/useRestaurantMenu";

const RestaurantMenu = () => {
  const { res_id } = useParams();
  const resInfo = useRestaurantMenu(res_id);

  if (resInfo === null) return <ShimmerHome />;

  const { name, cuisines, costForTwoMessage } = resInfo?.info;

  const { itemCards } = resInfo?.itemCards;

  return (
    itemCards && (
      <div>
        <h1>{name}</h1>
        <p>
          {cuisines.join(", ")} - {costForTwoMessage}
        </p>
        <h2> Menu</h2>
        <ul>
          {itemCards.map((item) => (
            <li key={item?.card?.info?.id}>
              {item?.card?.info?.name} -{" Rs."} {item?.card?.info?.price / 100}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default RestaurantMenu;
