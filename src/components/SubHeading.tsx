interface Props {
  children: React.ReactNode;
}

const SubHeading: React.FC<Props> = ({ children }) => {
  return (
    <h2 className="text-3xl font-bold mb-6 mt-10 text-center">{children}</h2>
  );
};

export default SubHeading;
