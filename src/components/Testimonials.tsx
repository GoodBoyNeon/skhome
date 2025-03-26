import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
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
  {
    name: "Nabin Khadka",
    quote:
      "Maile SK home bata CG 300 liter solar water heater prayog gareko kehi mahina bhaisakyo, ra ma ekdamai santusta chu. Pani chitto tatcha, lamo samaya sama tattaai rahanchha, ra bijuli kharcha pani ghatayeko cha. Quality pani ramro lagyo",
  },
  {
    name: "Partik Mahato",
    quote:
      "I have been using Kent Grand Plus water purifier from S.k. home traders for 2 years. Only needed servicing once and its functioning very good. Definitely worth it xa",
  },
  {
    name: "Prem Bahadur Magar",
    quote:
      "Hamro ghar ko sabai saman yehi bata lageko ho. Dai le sasto price ma ramro saman bechnu hudoraixa. Maile lageko chimney, gas chulo ra water filter ekdam price anusar ko quality to xa. 5 Stars rating for sure!",
  },
  {
    name: "Arjun Pandey",
    quote:
      "It is hard to find a trustworthy and reliable store like this. Decent prices, variety of products and very good customer service. Hats off!",
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
                        <span className="flex text-xs gap-0.5 text-yellow-400">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </span>

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
