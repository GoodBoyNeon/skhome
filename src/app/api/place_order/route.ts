import { Information } from "@/components/CheckoutForm";
import { env } from "@/data/env/server";
import { prisma } from "@/lib/database";
import { generateOrderId } from "@/lib/orderIdHelper";
import { NextRequest, NextResponse } from "next/server";
import mailer from "nodemailer";
import { CheckoutItem } from "../checkout/route";

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

  const {
    information,
    items,
  }: {
    information: Information;
    items: CheckoutItem[];
  } = JSON.parse(message);

  const { firstName, lastName, ...reqInfo } = information;

  const name = `${firstName} ${lastName}`;
  const orderId = generateOrderId();

  await prisma.order
    .create({
      data: {
        name,
        orderId,
        ...reqInfo,
        items: {
          createMany: {
            data: items.map((item) => ({
              productId: item.product.id,
              absPrice: item.product.price,
              quantity: item.quantity,
            })),
          },
        },
      },
    })
    .catch((err) => console.log(err));

  await transporter.sendMail({
    from: env.EMAIL,
    to: env.ORDER_PLACEMENT_EMAIL_ADDRESS,
    subject: "New Order",
    html: `<h1>New Order Received</h1><br><strong>Name:</strong> ${information.firstName} ${information.lastName}<br><strong>Contact No.:</strong> ${information.phone}<br><strong>Address:</strong> ${information.address} / ${information.city}${information.appartment ? ` / ${information.appartment}` : ""}${information.postalCode ? ` / ${information.postalCode}` : ""}<br><br><h3>Ordered Items:</h3>${items.map(({ product, quantity }: { product: any; quantity: number }) => `<strong>Product ID:</strong> ${product.id}<br><strong>Product Name:</strong> ${product.name}<br><strong>Price:</strong> ${product.price}<br><strong>Quantity:</strong> ${quantity}`).join("<br>")}<br><br><h3>Summary</h3><strong>Shipping Method: </strong>${information.shippingMethod}<br><strong>Subtotal: </strong>${information.subtotal}<br><strong>Shipping Cost: </strong>${information.shipping}<br><strong>Discount: </strong>${information.discount}<br><strong>Grand Total: </strong>${information.total}<br><strong>Payment Method: </strong>${information.paymentMethod}<br>`,
  });

  return NextResponse.json({ orderId }, { status: 200 });
}
