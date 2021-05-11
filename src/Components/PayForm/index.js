import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const PayForm = ({ data }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, data);

    if (stripeResponse.error) {
      return setError(stripeResponse.error.message);
    }
    const stripeToken = stripeResponse.token.id;

    try {
      const response = await axios.post("http://localhost:3100/pay", {
        stripeToken,
        data,
      });

      if (response.data.status === "succeeded") {
        setCompleted(true);
      } else {
        return setError(
          "Une erreur inconnue a été détectée lors du paiement, merci de vérifier vos données."
        );
      }
    } catch (error) {
      return setError(
        "Une erreur a été détectée lors du paiement, merci de vérifier vos données."
      );
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit} className="payment">
          <div
            className="error"
            style={{ display: error ? "inherit" : "none" }}
          >
            {error}
          </div>
          <CardElement className="card-pay" />
          <button type="submit" className="btn">
            Payer
          </button>
        </form>
      ) : (
        <div className="loading">
          <div>Paiement effectué.</div>
          <div>Merci pour votre achat !</div>
        </div>
      )}
    </>
  );
};

export default PayForm;
