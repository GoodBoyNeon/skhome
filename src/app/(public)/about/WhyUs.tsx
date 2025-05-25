import { Card, CardContent } from "@/components/ui/card";

const WhyUs = () => {
  return (
    <section className="py-6 md:py-8">
      <Card className="border-red mt-8 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6 text-center">
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            Why Choose S.K. Home Traders?
          </h3>
          <p className="mx-auto max-w-3xl text-gray-600">
            With over a decade of experience in the home trading industry,
            we&apos;ve built our reputation on trust, quality products, and
            exceptional customer service. Every number tells a story of our
            dedication to making your home beautiful and functional.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default WhyUs;
