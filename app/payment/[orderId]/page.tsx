"use client";

import Checkout from "@/components/Checkout";
import convertToSubcurrency from "@/lib/convertToCurrency";
import { useAppSelector } from "@/lib/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const amount = parseFloat(cart.priceTotal.toFixed(2));
  const { orderId } = useParams();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 px-4">
      <div className="bg-white max-w-xl w-full p-10 rounded-xl shadow-md text-center border border-amber-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Beluga</h1>
        <h2 className="text-xl text-gray-700 mb-6">
          has requested
          <span className="font-bold text-amber-600"> ${amount}</span>
        </h2>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(amount),
            currency: "usd",
          }}
        >
          <Checkout amount={amount} orderId={orderId} />
        </Elements>
      </div>
    </main>
  );
};

export default PaymentPage;
