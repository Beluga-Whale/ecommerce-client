"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToCurrency";
import { ParamValue } from "next/dist/server/request/params";
import { useAppSelector } from "@/lib/hooks";
import { usePaymentServices } from "@/services/paymentServices";
import { PaymentIntentDto } from "@/types";

const Checkout = ({
  amount,
  orderId,
}: {
  amount: number;
  orderId: ParamValue;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = useAppSelector((state) => state.user.userId);

  const { mutateAsync: paymentMutate } = usePaymentServices();

  useEffect(() => {
    const createIntent = async () => {
      const payload: PaymentIntentDto = {
        amount: convertToSubcurrency(amount),
        orderId: Number(orderId),
        userId: Number(userId),
      };

      try {
        const data = await paymentMutate(payload); // 👈 data คือ { clientSecret }
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("❌ Error creating payment intent", err);
      }
    };

    if (userId && orderId && amount > 0) {
      createIntent();
    }
  }, [amount, orderId, userId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/payment-success?amount=${amount}&orderId=${orderId}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default Checkout;
