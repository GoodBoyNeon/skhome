export default function AboutCard({
  heading,
  subheading,
  index,
}: {
  heading: string;
  subheading: string;
  index: number;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center aspect-square rounded-lg max-w-80 bg-blue-500 gradient-${index}`}
    >
      <h2 className="text-7xl text-white font-black">{heading}</h2>
      <h2 className="text-white font-semibold text-lg">{subheading}</h2>
    </div>
  );
}
