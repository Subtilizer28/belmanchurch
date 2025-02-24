// import type { NextApiRequest, NextApiResponse } from "next";
// import { db } from "~/server/db";
// import { env } from "~/env";
// import crypto from "crypto";
// import { z } from "zod";

// // ✅ Define Schema for Razorpay Webhook Payload
// const RazorpayWebhookSchema = z.object({
//   payload: z.object({
//     payment: z.object({
//       entity: z.object({
//         id: z.string(),
//         amount: z.number(),
//         status: z.string(),
//         notes: z.object({
//           type: z.string().optional(),
//           forWhom: z.string().optional(),
//           byWhom: z.string().optional(),
//         }).optional(),
//       }),
//     }),
//   }),
// });

// // ✅ Define TypeScript Interface (Infer from Schema)
// type RazorpayWebhookData = z.infer<typeof RazorpayWebhookSchema>;

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;
//     const razorpaySignature = req.headers["x-razorpay-signature"] as string;
//     const body = JSON.stringify(req.body);

//     // 🔹 Validate Razorpay Signature
//     const expectedSignature = crypto.createHmac("sha256", webhookSecret).update(body).digest("hex");
//     if (razorpaySignature !== expectedSignature) {
//       return res.status(401).json({ error: "Invalid signature" });
//     }

//     // ✅ Validate & Parse Request Body
//     const parsedData: RazorpayWebhookData = RazorpayWebhookSchema.parse(req.body);

//     // 🔹 Extract Payment Details
//     const payment = parsedData.payload.payment.entity;
//     if (payment.status === "captured") {
//       await db.donation.create({
//         data: {
//           type: payment.notes?.type,
//           paymentId: payment.id,
//           amount: payment.amount / 100, // Convert paise to rupees
//           forWhom: payment.notes?.forWhom ?? "Unknown",
//           byWhom: payment.notes?.byWhom ?? "Anonymous",
//         },
//       });

//       return res.status(200).json({ success: true, message: "Donation recorded." });
//     }

//     return res.status(400).json({ error: "Payment not captured." });
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     return res.status(500).json({ error: (error as Error).message });
//   }
// }
