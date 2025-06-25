import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const apiUrl: string = process.env.PUBLIC_PORT || "";
export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // NOTE - อัปเดตคำสั่งซื้อใน DB โดยใช้ paymentIntent.id
    try {
      await axios
        .patch(
          `${apiUrl}/user/order`,
          {
            orderId: Number(paymentIntent.metadata.orderId),
            status: "paid",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.STRIPE_WEBHOOK_SECRET}`,
            },
          }
        )
        .then((response) =>
          console.log("Order updated successfully:", response.data)
        );
    } catch (error: any) {
      console.error("Unknown error:", error);
      return new NextResponse("Failed to update order", { status: 500 });
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.log("❌ Payment failed:", paymentIntent.id);
    return new NextResponse("Payment failed", { status: 500 });
  }
  return new NextResponse("Received", { status: 200 });
}
