import { Shield, Truck, Wrench, Phone, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "1-Year Warranty",
    description:
      "Comprehensive warranty coverage on eligible products with hassle-free claims.",
  },
  {
    icon: Truck,
    title: "Free Installation",
    description:
      "Professional installation service at no extra cost for orders above 10,000.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description:
      "Certified technicians for installation, maintenance, and repair services.",
  },
  {
    icon: Phone,
    title: "Customer Support",
    description:
      "Round-the-clock customer support for all your queries and concerns.",
  },
  {
    icon: Award,
    title: "Certified Products",
    description:
      "All products are ISI certified and meet the highest quality standards.",
  },
  {
    icon: Users,
    title: "5,000+ Happy Customers",
    description:
      "Trusted by thousands of families across the country for quality appliances.",
  },
];

export default function ProductWhyUs() {
  return (
    <section id="about" className="bg-white px-4 py-16 md:px-12 lg:px-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
            Why Choose S.K Home Traders?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We&apos;re committed to providing you with the best home appliances
            and exceptional service that exceeds your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group text-center">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 transition-colors duration-300 group-hover:bg-sky-600">
                <feature.icon className="h-8 w-8 text-sky-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
