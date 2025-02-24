// import type { NextApiRequest, NextApiResponse } from "next";
// import Razorpay from "razorpay"; // Importing Razorpay class
// import { env } from "~/env";

// const razorpay = new Razorpay({
//   key_id: env.RAZORPAY_KEY_ID,
//   key_secret: env.RAZORPAY_KEY_SECRET,
// });

// interface PaymentRequestBody {
//   amount: number;
//   currency?: string;
//   type: string;
//   forWhom: string;
//   byWhom: string;
// }

// interface RazorpayOrder {
//   id: string;
//   amount: number;
//   currency: string;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const {
//       amount,
//       currency = "INR",
//       type,
//       forWhom,
//       byWhom,
//     } = req.body as PaymentRequestBody;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     // Ensure correct type for options
//     const options: Razorpay.orders.RazorpayOrderCreateRequest = {
//       amount: amount * 100, // Convert to paise
//       currency,
//       payment_capture: 1, // Auto-capture
//       notes: { type, forWhom, byWhom },
//     };

//     // Call Razorpay's create method correctly
//     const order = (await razorpay.orders.create(options)) as RazorpayOrder;

//     res.status(200).json({ orderId: order.id });
//   } catch (error) {
//     console.error("Payment order creation failed:", error);
//     res.status(500).json({ error: (error as Error).message });
//   }
// }
