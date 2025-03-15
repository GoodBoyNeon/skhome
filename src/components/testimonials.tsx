import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import AvatarDefault from "@/../public/avatar-default.png";
import SubHeading from "./SubHeading";

type Testimonial = {
  name: string;
  image?: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Baburam Bhandari",
    quote:
      "Loved the customer service, and the prices were good as well! Thinking of buying more products from them in the future.",
  },
  {
    name: "Raman Karki",
    quote:
      "I have bought all my kitchen appliances from SK Home. It was really good and the servicing was in time too",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number,
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3),
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-12 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <SubHeading>Loved by our Customers</SubHeading>
            <p className="text-body mt-6">
              We have enjoyed serving these people to their satisfaction
            </p>
          </div>
          <div className="mt-8 grid gap-3 [--color-card:var(--color-muted)] sm:grid-cols-2 md:mt-12 lg:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div
                key={chunkIndex}
                className="space-y-3 *:border-none *:shadow-none"
              >
                {chunk.map(({ name, quote, image }, index) => (
                  <Card key={index}>
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>
                          <Image
                            src={AvatarDefault}
                            width={120}
                            height={120}
                            alt={name}
                          />
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <blockquote className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </blockquote>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
