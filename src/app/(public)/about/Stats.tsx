import SubHeading from "@/components/SubHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Wrench } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "5,000+",
    label: "Customers Served",
  },
  {
    icon: Calendar,
    number: "10+",
    label: "Years of Market Experience",
  },
  {
    icon: Wrench,
    number: "15+",
    label: "Years of Technical Experience",
  },
];

const Stats = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <SubHeading className="">Our journey in Numbers</SubHeading>
          <p className="text-muted-foreground">
            Wanna look at some statistics just to be sure about your purchase?
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-8 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3 dark:[--color-muted:var(--color-zinc-900)]">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className="group relative flex size-80 items-center justify-center overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-100 p-3 transition-colors duration-300 group-hover:bg-blue-200">
                      <IconComponent className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                      {stat.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {stat.label}
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 size-32 -translate-y-10 translate-x-10 rounded-full bg-gradient-to-br from-blue-500/10 to-transparent transition-transform duration-300 group-hover:scale-110" />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
