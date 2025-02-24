/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import Script from "next/script";
import { env } from "~/env";

interface DonateButtonProps {
  type: string;
  amount: string;
  forWhom: string;
  byWhom: string;
}

export default function DonateButton({
  type,
  amount,
  forWhom,
  byWhom,
}: DonateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      // Call backend to create a Razorpay order
      const response = await fetch("/api/donate/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          amount: Number(amount),
          forWhom,
          byWhom,
        }),
      });

      const data: { orderId?: string; message?: string } =
        await response.json();
      if (!response.ok) {
        throw new Error(data.message ?? "Failed to create order");
      }

      const { orderId } = data;

      const paymentObject = new (window as any).Razorpay({
        key: env.RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: Number(amount) * 100,
        currency: "INR",
        name: "Belman Church",
        description: `Donation for ${forWhom}`,
        prefill: {
          name: byWhom,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#EAC696",
        },
        handler: async (response: any) => {
          try {
            if (response.razorpay_payment_id) {
              alert(
                "Payment Successful! Payment ID: " +
                  response.razorpay_payment_id,
              );
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
          }
        },
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button
        className="hover:bg-something w-full rounded-lg bg-accent p-3 text-white disabled:opacity-50"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Donate"}
      </button>
    </>
  );
}
