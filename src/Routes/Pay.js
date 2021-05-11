import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements as StripeComp } from "@stripe/react-stripe-js";
import PayForm from "../Components/PayForm";

const stripePromise = loadStripe(
  "pk_test_51IptukBgheFVjaYJmkKp901blf1rAIXxOrjLdu5KDWnVSVSq6OeHpcvwammJ8YPMohDk1JNQH3KKNBzDFypw8A5200LbWmPhQi"
);

const Pay = ({ token }) => {
  const location = useLocation();
  if (!location.state) {
    return <Redirect to="/" />;
  }

  const { id, name, price } = location.state;
  const data = {
    id: id,
    name: name,
    token: token,
  };

  const getPrice = (price, addPrice) => {
    price = Number(price);
    if (typeof addPrice === "number") {
      price += addPrice;
    }
    return price.toFixed(2);
  };

  return (
    <section className="container pay">
      <div className="resume">Résumé de la commande</div>

      <div className="line">
        <div className="order">Commande</div>
        <div className="price">{getPrice(price)} €</div>
      </div>
      <div className="line">
        <div className="order">Frais de protection acheteurs</div>
        <div className="price">{getPrice(0.4)} €</div>
      </div>
      <div className="line">
        <div className="order">Frais de port</div>
        <div className="price">{getPrice(0.8)} €</div>
      </div>

      <div className="line total">
        <div className="order">Total</div>
        <div className="price">{getPrice(price, 0.4 + 0.8)} €</div>
      </div>

      <div className="subline">
        Il ne vous reste plus qu'une étape pour vous offrir{" "}
        <span className="bold">{name}</span>. Vous allez payer{" "}
        {getPrice(price, 0.4 + 0.8)} € (frais de protection et frais de port
        inclus).
      </div>

      <StripeComp stripe={stripePromise}>
        <PayForm data={data} token={token} />
      </StripeComp>
    </section>
  );
};

export default Pay;
