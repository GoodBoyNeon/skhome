import { Categories, FeaturedProducts, PromoSlides } from "@/components/Hero";
import LogoTicker from "@/components/LogoTicker";
import ServicingBanner from "@/components/Servicing/ServicingBanner";

export const revalidate = 600;

export default async function Home() {
  return (
    <>
      <Categories />

      <PromoSlides />

      <FeaturedProducts />

      <ServicingBanner />

      <div className="bg-background py-12">
        <h3 className="text-muted-foreground text-center text-2xl font-bold">
          The Brands We Offer
        </h3>

        <LogoTicker />
      </div>
    </>
  );
}
