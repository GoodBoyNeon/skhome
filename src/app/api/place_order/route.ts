import { env } from "@/data/env/server";
import { Product } from "@prisma/client";
import { NextRequest } from "next/server";
import mailer from "nodemailer";

const transporter = mailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.APP_PASS,
  },
});

export async function POST(request: NextRequest) {
  const auth_token = request.headers.get("Authorization");

  if (auth_token !== `Bearer ${env.PLACE_ORDER_AUTH_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await request.json();

  const { message } = body;

  const { information, order } = JSON.parse(message);

  await transporter.sendMail({
    from: env.EMAIL,
    to: env.ORDER_PLACEMENT_EMAIL_ADDRESS,
    subject: "New Order",
    html: `<h1>New Order Received</h1><br><strong>Name:</strong> ${information.firstName} ${information.lastName}<br><strong>Contact No.:</strong> ${information.phone}<br><strong>Address:</strong> ${information.address} / ${information.city}${information.appartment ? ` / ${information.appartment}` : ""}${information.postalCode ? ` / ${information.postalCode}` : ""}<br><br><h3>Ordered Items:</h3>${order.map(({ product, quantity }: { product: Product; quantity: number }) => `<strong>Product ID:</strong> ${product.id}<br><strong>Product Name:</strong> ${product.name}<br><strong>Price:</strong> ${product.price}<br><strong>Quantity:</strong> ${quantity}`).join("<br>")}<br><br><h3>Summary</h3><strong>Shipping Method: </strong>${information.shippingMethod}<br><strong>Subtotal: </strong>${information.subtotal}<br><strong>Shipping Cost: </strong>${information.shipping}<br><strong>Discount: </strong>${information.discount}<br><strong>Grand Total: </strong>${information.total}<br><strong>Payment Method: </strong>${information.paymentMethod}<br>`,
  });

  return Response.json({ success: true });
}
