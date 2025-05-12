"use server";

import { prisma } from "@/lib/database";
import { decrypt, sessionCookieHelper } from "@/lib/session";
import { OrderStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateOrderStatus(
  _: any,
  { orderId, newStatus }: { orderId: string; newStatus: OrderStatus },
): Promise<unknown> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(sessionCookieHelper.name)?.value;
  const token = await decrypt(sessionCookie);

  if (token?.role !== "admin") {
    return { error: "Unauthorized" };
  }

  try {
    await prisma.order.update({
      where: {
        orderId,
      },
      data: {
        status: newStatus,
      },
    });

    revalidatePath(`/admin/dashboard/order/${orderId}`);
    return { message: "Updated order status" };
  } catch (err) {
    return { error: "Something went wrong... " + err };
  }
}
