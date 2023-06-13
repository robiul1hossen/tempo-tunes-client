import React, { useContext, useEffect, useState } from "react";
import { CardElement, CartElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../../../providers/AuthProviders";
import axios from "axios";

const CheckoutForm = ({ amount }) => {
  const { price } = amount;
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const accessToken = localStorage.getItem("access-token");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(price),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
      console.log("error", error);
    } else {
      setCardError("");
      console.log("payment  method", paymentMethod);
    }
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || "anonymous",
          email: user?.email || "unknown",
        },
      },
    });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn btn-primary btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600"> {cardError}</p>}
    </>
  );
};

export default CheckoutForm;
