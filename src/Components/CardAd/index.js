import "./CardAd.css";
import { Link } from "react-router-dom";

const CardAd = (props) => {
  return (
    <div className="card">
      <Link to={{ pathname: "offer/" + props._id, state: { ...props } }}>
        <div className="saler">{props.owner.account.username}</div>
        <div className="picture">
          <img src={props.product_image.url} alt={props.product_name} />
        </div>
        <div className="name">{props.product_name}</div>
        <div className="price">{props.product_price} €</div>
      </Link>
    </div>
  );
};

export default CardAd;
