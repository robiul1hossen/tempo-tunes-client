import React from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

// todo
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_key);

const Payment = () => {
  const location = useLocation();
  const amount = location.state;

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={amount}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
