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
      className={`bg-white rounded-lg p-4 text center border-2 border-b border-${borderColor}`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
      <Image src={image} alt={title} width={100} height={100} />
    </div>
  );
};

export default LevelCard;
