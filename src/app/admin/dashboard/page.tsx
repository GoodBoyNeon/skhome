import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/database";

const Dashboard = async () => {
  const orderCount = await prisma.order.count();
  const bookingCount = await prisma.servicingBooking.count();
  const productCount = await prisma.product.count();
  const categoryCount = await prisma.category.count();
  const brandCount = await prisma.brand.count();

  return (
    <div className="mx-12 my-8">
      <h3 className="text-2xl font-bold">Overview</h3>
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="mx-auto mt-8 grid max-w-sm gap-4 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:rounded-lg *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="group">
            <CardTitle>Total Orders</CardTitle>
            <CardContent className="text-4xl font-bold">
              {orderCount}
            </CardContent>
          </Card>

          <Card className="group">
            <CardTitle>Total Servicing Bookings</CardTitle>
            <CardContent className="text-4xl font-bold">
              {bookingCount}
            </CardContent>
          </Card>

          <Card className="group">
            <CardTitle>Total Listed Products</CardTitle>
            <CardContent className="text-4xl font-bold">
              {productCount}
            </CardContent>
          </Card>

          <Card className="group">
            <CardTitle>Listed Categories</CardTitle>
            <CardContent className="text-4xl font-bold">
              {categoryCount}
            </CardContent>
          </Card>

          <Card className="group">
            <CardTitle>Listed Brands</CardTitle>
            <CardContent className="text-4xl font-bold">
              {brandCount}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
