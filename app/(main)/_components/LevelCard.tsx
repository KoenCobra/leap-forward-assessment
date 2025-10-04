import Image from "next/image";

interface LevelCardProps {
  title: string;
  description: string;
  image: string;
  borderColor: string;
}

const LevelCard = ({
  title,
  description,
  image,
  borderColor,
}: LevelCardProps) => {
  return (
    <div
      className={`bg-primary-white rounded-lg p-3 text-center border-b-12 ${borderColor} relative`}
    >
      <h3 className="text-2xl font-bold text-primary-blue-darkest mt-12 border-b-2 border-b-blue-medium mb-4 w-min mx-auto">
        {title}
      </h3>
      <p className="text-balance text-lg text-primary-blue-dark pb-6">
        {description}
      </p>
      <Image
        src={image}
        alt="profile"
        width={125}
        height={125}
        className="absolute top-[-30%] right-[50%] transform translate-x-[50%] rounded-full bg-primary-white p-3 shadow-xl"
      />
    </div>
  );
};

export default LevelCard;
